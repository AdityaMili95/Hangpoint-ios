//
//  HPChatRoomHandler.h
//  hangpoint_ios
//
//  Created by mili on 23/07/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <UIKit/UIKit.h>

@interface HPChatRoomHandler : UIViewController <RCTBridgeModule>

@property(atomic)NSMutableDictionary* populated;

@end
