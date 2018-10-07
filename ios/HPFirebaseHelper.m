//
//  HPFirebaseHelper.m
//  hangpoint_ios
//
//  Created by mili on 05/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HPFirebaseHelper.h"

@implementation HPFirebaseHelper

+ (instancetype)sharedInstance
{
  static HPFirebaseHelper *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[HPFirebaseHelper alloc] init];
  });
  
  return sharedInstance;
}

- (BOOL)initClient {
  if(!_DBRef){
    [FIRApp configure];
    _DBRef=[[FIRDatabase database]reference];
    _AuthUI = [FUIAuth defaultAuthUI];
    _AuthUI.delegate = self;
    NSArray<id<FUIAuthProvider>> *providers = @[
                                                [[FUIGoogleAuth alloc] init],
                                              ];
    _AuthUI.providers = providers;
  }
  return YES;
}

-(HPFirebaseHelper *)init
{
  self = [super init];
  return self;
}

- (void)authUI:(nonnull FUIAuth *)authUI didSignInWithUser:(nullable FIRUser *)user error:(nullable NSError *)error {
  
}

@end
