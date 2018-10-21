//
//  HPChatRoomHandler.m
//  hangpoint_ios
//
//  Created by mili on 23/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HPChatRoomHandler.h"

@implementation HPChatRoomHandler
  RCT_EXPORT_MODULE();

- (instancetype)init
{
  self = [super init];
  if (self) {
    _populated = [[NSMutableDictionary alloc]init];
  }
  return self;
}

  RCT_EXPORT_METHOD(LogOutConfirmation:(RCTResponseSenderBlock)callback){
    UIAlertController * alert = [UIAlertController
                                 alertControllerWithTitle:@"Sign Out"
                                 message:@"Do you want to proceed ?"
                                 preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *okayAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
      [_populated removeAllObjects];
      callback(@[@true]);
    }];
    
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Back" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
      callback(@[@false]);
    }];
    
    [alert addAction:okayAction];
    [alert addAction:cancelAction];
    
    
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    dispatch_async(dispatch_get_main_queue(), ^{
      [rootViewController presentViewController:alert animated: YES completion: nil];
    });
  }


RCT_EXPORT_METHOD(ConfirmDialog:(NSString *)title detail: (NSString*)detail  callback:(RCTResponseSenderBlock)callback){
  UIAlertController * alert = [UIAlertController
                               alertControllerWithTitle:title
                               message:detail
                               preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction *okayAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
    [_populated removeAllObjects];
    callback(@[@true]);
  }];
  
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Back" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
    callback(@[@false]);
  }];
  
  [alert addAction:okayAction];
  [alert addAction:cancelAction];
  
  
  UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
  dispatch_async(dispatch_get_main_queue(), ^{
    [rootViewController presentViewController:alert animated: YES completion: nil];
  });
}


- (NSArray*) sortChat:(NSDictionary*) chats{
  
  NSMutableArray* keys = [[chats allKeys]mutableCopy];
  
  for(int i=0;i<([keys count]-1);i++){
    int oldIndex = i;
    
    for(int j=i;j<[keys count];j++){
      
      NSString* oldestKey = keys[oldIndex];
      NSDictionary* oldest = [chats objectForKey:oldestKey];
      float comparatorOldest = [[oldest valueForKey:@"created_date"]floatValue];
      
      NSArray* oldestChats = [oldest objectForKey:@"chats"];
      if (oldestChats != nil && [oldestChats count] > 0){
        NSDictionary* lastChat = oldestChats[[oldestChats count]-1];
        comparatorOldest = [[lastChat valueForKey:@"date"]floatValue];
      }
      
      NSString* currKey = keys[j];
      NSDictionary* current = [chats objectForKey:currKey];
      float currentComparator = [[current valueForKey:@"created_date"]floatValue];
      
      NSArray* currentChats = [current objectForKey:@"chats"];
      if (currentChats && [currentChats count]>0){
        NSDictionary* lastChat = currentChats[[currentChats count]-1];
        currentComparator = [[lastChat valueForKey:@"date"]floatValue];
      }
      
      if(comparatorOldest<currentComparator){
        oldIndex = j;
      }
    }
    
    if(oldIndex!=i){
      NSString* temp = keys[i];
      NSString* replace = keys[oldIndex];
      [keys replaceObjectAtIndex:i withObject:replace];
      [keys replaceObjectAtIndex:oldIndex withObject:temp];
    }
  }
  
  return [keys copy];
}

RCT_EXPORT_METHOD(GetSearchChatData :(NSDictionary*) data searchKey:(NSString *)searchkey  callback:(RCTResponseSenderBlock)callback){
  NSArray* keys = [data allKeys];
  NSArray* currPopulateKeys = [_populated allKeys];
  NSMutableDictionary* listSearch = [[NSMutableDictionary alloc] init];
  
  for (int i=0; i< [keys count]; i++){
    NSMutableDictionary* details = [data[keys[i]] valueForKey:@"detail"];
    NSMutableString* chatName = [details valueForKey:@"chatName"];
    
    if ([_populated objectForKey:keys[i]] == nil && [chatName rangeOfString:searchkey options:NSCaseInsensitiveSearch].location != NSNotFound ){
      
      BOOL password = [[details valueForKey: @"isPassword"] boolValue];
      NSString* desc = @"Public Chat every one can join";
      if (password){
        desc = @"This is a Private Chat";
      }
      
      NSMutableString* displayText  = [details valueForKey:@"chatName"];
      int memberCount = [[details valueForKey:@"memberCount"] integerValue];
      displayText = [[NSString stringWithFormat:@"%@ (%i)", displayText, memberCount] mutableCopy];
      NSMutableString* image = [@"https://firebasestorage.googleapis.com/v0/b/hangpoint-4cdd3.appspot.com/o/-LIZpcyRUnVqdTn0zfBc?alt=media&token=1eb27dd1-e59a-4e85-9ffa-543947fb508c" mutableCopy];
      
      if ([details objectForKey:@"image"] !=nil){
        image = [details valueForKey:@"image"];
      }
      
      NSDate* formatted = [self dateFromTimeStamp:[[details valueForKey:@"created_date"] floatValue]];
      NSString* formatDateString = [self formatDate:formatted];
      
      NSDictionary* currData = @{
                                 @"image": image,
                                 @"date":  formatDateString,
                                 @"name": displayText,
                                 @"desc": desc,
                                 @"isPassword": [NSNumber numberWithBool:password ],
      };
      
      [listSearch setObject:currData forKey:keys[i]];
    }
    
  }
  
  callback(@[listSearch]);
  
  
}

RCT_EXPORT_METHOD(FetchChatList:(NSDictionary*) data callback:(RCTResponseSenderBlock)callback){
    NSArray* keys = [data allKeys];
    NSArray* currPopulateKeys = [_populated allKeys];
    NSMutableArray* detachKeyList = [[NSMutableArray alloc]init];
    
    for (int i=0; i<[currPopulateKeys count]; i++) {
      if([data objectForKey:currPopulateKeys[i]]==nil){
        [_populated removeObjectForKey:currPopulateKeys[i]];
        [detachKeyList addObject:currPopulateKeys[i]];
      }
      
    }
  
  NSMutableDictionary* resp = [[NSMutableDictionary alloc]init];
  [resp setObject:keys forKey:@"keys"];
  [resp setObject:detachKeyList forKey:@"detach"];
    callback(@[resp,_populated]);
  }

RCT_EXPORT_METHOD(FetchChatDetail:(NSDictionary*) data key:(NSString*)key callback:(RCTResponseSenderBlock)callback){
  
  BOOL exist = TRUE;
  
    if([_populated objectForKey:key]==nil){
      exist = FALSE;
      [_populated setObject:data forKey:key];
    }else{
      NSDictionary* currData = (NSDictionary*)[_populated valueForKey:key];
      NSMutableDictionary* newData = [currData mutableCopy];
      NSMutableString* displayText = [currData valueForKey:@"chatName"];
      NSDictionary* member = [currData valueForKey:@"member"];
      NSString* finaltext = [self GetChatDisplaytext:displayText member:member];
      [newData setObject:finaltext forKey:@"displayText"];
      [_populated setValue:newData forKey:key];
    }
  
  callback(@[_populated,key, [NSNumber numberWithBool:exist]]);
}

-(NSDate *)dateFromTimeStamp:(double)unixtimestampval {
  double timestampval = unixtimestampval/1000;
  NSTimeInterval timestamp = (NSTimeInterval)timestampval;
  NSDate *updatetimestamp = [NSDate dateWithTimeIntervalSince1970:timestamp];
  return updatetimestamp;
}

-(NSString*)formatDate:(NSDate*)date{
  NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear| NSCalendarUnitMinute | NSCalendarUnitHour fromDate:[NSDate date]];
  int year = [components year];
  int month = [components month];
  int day = [components day];
  
  NSDateComponents *lastChatComponents = [[NSCalendar currentCalendar] components:NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear| NSCalendarUnitMinute | NSCalendarUnitHour fromDate:date];
  int lastChatYear = [lastChatComponents year];
  int lastChatMonth = [lastChatComponents month];
  int lastChatDay = [lastChatComponents day];
  
  if (year == lastChatYear && day == lastChatDay && month == lastChatMonth){
    return [self formatAMPM:lastChatComponents];
  }
  
  return [self getDateString:lastChatComponents];
}

-(NSString *)getDateString:(NSDateComponents*) comp{
  int day = [comp day];
  int month = [comp month];
  int year = [comp year];
  
  NSArray* monthNames = @[@"Jan",@"Feb",@"Mar",@"Apr",@"May",@"Jun",@"Jul",@"Aug",@"Sep",@"Oct",@"Nov",@"Dec"];
  NSString* monthName = monthNames[month-1];
  
  return [NSString stringWithFormat:@"%i %@ %i",day,monthName,year];
}

- (NSString*) formatAMPM: (NSDateComponents*) comp{
  int hour = [comp hour];
  int minute = [comp minute];
  
  NSString* AMPM = (hour>=12)?@"PM":@"AM";
  hour = hour%12;
  hour = (hour>0)?hour:12;
  NSString* hourString = (hour<10)?[NSString stringWithFormat:@"0%i",hour]:[NSString stringWithFormat:@"%i",hour];
  NSString* minuteString = (minute<10)?[NSString stringWithFormat:@"0%i",minute]:[NSString stringWithFormat:@"%i",minute];
  
  return [NSString stringWithFormat:@"%@:%@ %@",hourString,minuteString,AMPM];
}

- (NSString*)GetChatDisplaytext:(NSString*) chatName member:(NSDictionary*) data{
  int memberCount = [[data allKeys] count];
  NSString* memberText = [NSString stringWithFormat:@"%i",memberCount];
  return [[[chatName stringByAppendingString:@" ("]stringByAppendingString:memberText]stringByAppendingString:@")"];
}

RCT_EXPORT_METHOD(FetchChatMember:(NSDictionary*) data key:(NSString*)key callback:(RCTResponseSenderBlock)callback){
  NSDictionary* currData = (NSDictionary*)[_populated valueForKey:key];
  
  if (currData == nil || data == nil){
    return;
  }
  
  NSMutableDictionary* newData = [currData mutableCopy];
  NSMutableString* displayText = [currData valueForKey:@"chatName"];
  NSString* finaltext = [self GetChatDisplaytext:displayText member:(NSDictionary *)data];
  
  BOOL exist = TRUE;
  if([currData objectForKey:@"member"]==nil){
    exist = FALSE;
    [_populated setObject:data forKey:key];
  }
  
  [newData setObject:data forKey:@"member"];
  [newData setObject:finaltext forKey:@"displayText"];
  [_populated setValue:newData forKey:key];
  callback(@[_populated,key, [NSNumber numberWithBool:exist]]);
}

- (NSString*)CountNotRead:(NSArray*) data forUser:(NSString*)user{
  int count = 0;
  
  for (int i=([data count]-1); i>=0; i--) {
    NSDictionary* reads = [[data objectAtIndex:i]valueForKey:@"read"];
    NSArray* allReads = [reads allKeys];
    NSMutableArray* mutaRead = [allReads mutableCopy];
    NSInteger* index = [mutaRead indexOfObject:user];
    
    if(index>=0){
      break;
    }
    count+=1;
  }
  
  if (count>100){
    return @"100+";
  }
  
  return [NSString stringWithFormat:@"%i",count];
}

RCT_EXPORT_METHOD(FetchChatData:(NSArray*) data key:(NSString*)key user:(NSString*)user callback:(RCTResponseSenderBlock)callback){
  NSDictionary* currData = (NSDictionary*)[_populated valueForKey:key];
  
  if (currData == nil){
    return;
  }
  
  NSMutableDictionary* newData = [currData mutableCopy];
  NSString* notRead = @"0";
  NSString* formatDateString = @"";
  
  if ([data count]>0){
    NSDictionary* lastChat = data[[data count]-1];
    NSMutableDictionary* mutaLastChat = [lastChat mutableCopy];
    
    NSMutableString* chatText = [mutaLastChat valueForKey:@"text"];
    
    if([chatText length]>30){
      chatText = [[chatText substringToIndex:30]mutableCopy];
      chatText = [[chatText stringByAppendingString:@"..."]mutableCopy];
      [mutaLastChat setValue:chatText forKey:@"text"];
    }
    
    NSDate* formatted = [self dateFromTimeStamp:[[lastChat valueForKey:@"date"] floatValue]];
    formatDateString = [self formatDate:formatted];
    notRead =[self CountNotRead:data forUser:user];
    [newData setObject:mutaLastChat forKey:@"lastChat"];
  }
  
  [newData setObject:data forKey:@"chats"];
  [newData setObject:formatDateString forKey:@"lastChatDate"];
  [newData setObject:notRead forKey:@"countNotRead"];
  
  [_populated setValue:newData forKey:key];
  
  NSArray* sortedKey = [self sortChat:_populated];
  callback(@[_populated, key, sortedKey]);
}

RCT_EXPORT_METHOD(GetRandomChatData:(NSDictionary*) data callback:(RCTResponseSenderBlock)callback){
  NSArray* newKeys = [data allKeys];
  NSMutableDictionary* selected = [[NSMutableDictionary alloc]init];
  
  for(int i=0;i<[newKeys count]; i++){
    NSDictionary* detail = [data objectForKey: newKeys[i]];
    if([[detail valueForKey:@"isPassword"]boolValue] || [_populated objectForKey:newKeys[i]]!=nil ){
      continue;
    }
    
    [selected setObject:detail forKey:newKeys[i]];
  }
  BOOL avail = true;
  NSArray* selectedKey = [selected allKeys];
  
  NSString* chatId = @"";
  
  if([selectedKey count] == 0){
    avail =false;
    UIAlertController * alert = [UIAlertController
                                 alertControllerWithTitle:@"No Chat Found"
                                 message:@"Try create a new chat"
                                 preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *okayAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {}];
    
    [alert addAction:okayAction];
    
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    dispatch_async(dispatch_get_main_queue(), ^{
      [rootViewController presentViewController:alert animated: YES completion: nil];
    });
  }else{
    int index = arc4random_uniform([selectedKey count]);
    chatId = selectedKey[index];
  }

  callback(@[chatId, [NSNumber numberWithBool:avail]]);
}

RCT_EXPORT_METHOD(ShowErrorJoin:(NSString*)title detail:(NSString*)detail callback:(RCTResponseSenderBlock)callback){
  UIAlertController * alert = [UIAlertController
                               alertControllerWithTitle:title
                               message:detail
                               preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction *okayAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {}];
  
  [alert addAction:okayAction];
  
  UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
  dispatch_async(dispatch_get_main_queue(), ^{
    [rootViewController presentViewController:alert animated: YES completion: nil];
  });
}

RCT_EXPORT_METHOD(JoinChat:(NSString*) chatId user:(NSString*)uid password:(NSString*)password callback:(RCTResponseSenderBlock)callback){
  
  NSDictionary* immutNewChatOpt = @{chatId:@{@"chat_id":chatId}};
  NSDictionary* immutNewMember = @{uid:@{@"uid":uid, @"memberType":@"insert"}};
  
  NSMutableDictionary* newChatOpt = [immutNewChatOpt mutableCopy];
  NSMutableDictionary* newMember = [immutNewMember mutableCopy];
  
  if ([password length] > 0){
    NSMutableDictionary* currNewChat = [[newChatOpt valueForKey:chatId]mutableCopy];
    NSMutableDictionary* currNewMember = [[newMember valueForKey:uid]mutableCopy];
    [currNewChat setObject:password forKey:@"password"];
    [currNewMember setObject:password forKey:@"password"];
    [newChatOpt setObject:currNewChat forKey:chatId];
    [newMember setObject:currNewMember forKey:uid];
  }
  
  NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitSecond fromDate:[NSDate date]];
  int time = [components second]*1000;
  NSDictionary* optNewUserInfo = @{@"text":@"joined chat group", @"date":[NSNumber numberWithInt:time],@"uid":uid,@"isInfo":@true,@"read":@{uid: uid}};
  
  callback(@[newChatOpt, newMember, optNewUserInfo]);
}


RCT_EXPORT_METHOD(ConstructChatData:(NSDictionary*) data callback:(RCTResponseSenderBlock)callback){
  BOOL isPassword = false;
  
  NSString* ChatName = [data valueForKey:@"name"];
  NSString* Uid = [data valueForKey:@"uid"];
  NSString* ChatPassword = [data valueForKey:@"password"];
  NSString* ChatImage = [data valueForKey:@"image"];
  
  NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitSecond fromDate:[NSDate date]];
  int time = [components second]*1000;
  NSNumber* created_date = [NSNumber numberWithInt:time];
  
  if ([ChatPassword length] != 0){
    isPassword = true;
  }
  
  NSDictionary* opt = @{
                        @"detail":@{
                            @"chatName":ChatName,
                            @"editType": @"insert",
                            @"created_date": created_date,
                            @"image": ChatImage
                        },
                        @"member":@{
                            Uid:@{
                                @"uid": Uid,
                                @"memberType": @"insert"
                            }
                        }
  };
  
  NSDictionary* idListOpt = @{
                              @"detail":@{
                                  @"chatName": ChatName,
                                  @"created_date":created_date,
                                  @"isPassword":[NSNumber numberWithBool:isPassword],
                                  @"memberCount": @1,
                                  @"image": ChatImage
                              }
  };
  
  callback(@[opt, idListOpt]);
}

RCT_EXPORT_METHOD(GetMemberCount:(NSString*) key callback:(RCTResponseSenderBlock)callback){
  NSDictionary* chat = [self.populated valueForKey:key];
  
  if (chat == NULL){
    callback(@[@NO]);
    return;
  }
  
  NSDictionary* members = [chat valueForKey:@"member"];
  NSNumber* memberCount = [NSNumber numberWithInt:[[members allKeys] count]];
  
  callback(@[memberCount]);
}

RCT_EXPORT_METHOD(RemoveChat:(NSString*) key callback:(RCTResponseSenderBlock)callback){
  [self.populated removeObjectForKey:key];
}

RCT_EXPORT_METHOD(ConstructLeftChat:(NSString*) uid callback:(RCTResponseSenderBlock)callback){
  NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitSecond fromDate:[NSDate date]];
  int time = [components second]*1000;
  NSNumber* created_date = [NSNumber numberWithInt:time];
  
  NSDictionary* data = @{
                         @"text": @"left chat group",
                         @"date": created_date,
                         @"uid": uid,
                         @"isInfo": @true,
                         @"read":@{
                             uid: uid
                             }
  };
  
  callback(@[data]);
}
@end
