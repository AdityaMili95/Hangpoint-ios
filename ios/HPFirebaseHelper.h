//
//  HPFirebaseHelper.h
//  hangpoint_ios
//
//  Created by mili on 05/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
@import Firebase;
@import FirebaseGoogleAuthUI;

@interface HPFirebaseHelper : NSObject <FUIAuthDelegate>

@property(nonatomic)FIRDatabaseReference* DBRef;
@property(nonatomic)FUIAuth* AuthUI;

+(HPFirebaseHelper *)sharedInstance;
-(BOOL)initClient;
@end
