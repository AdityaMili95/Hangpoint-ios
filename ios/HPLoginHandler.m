//
//  HPLoginHandler.m
//  hangpoint_ios
//
//  Created by mili on 04/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HPLoginHandler.h"
#import <UIKit/UIKit.h>

@implementation HPLoginHandler
RCT_EXPORT_MODULE();
- (NSDictionary *)constantsToExport{
  return @{@"title":@"HangPoint", @"wording":[NSArray arrayWithObjects:@"Discover the World",@"Real Time Chat Apps",nil],@"homePage":@"http://adityamili.com"};
}

RCT_EXPORT_METHOD(gotolink:(NSString *)link){
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:link]];
}
@end
