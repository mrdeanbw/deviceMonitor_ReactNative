
// ************************************************************************
//  Copyright Â© 2015 Roost Inc.
//  All rights reserved
//
//  This code is private, confidential and proprietary to Roost, Inc.â€‹ and its
//  affiliates and licensors.  Redistribution, reproduction, copying or use of
//  any portion of  this code, in source and/or binary forms and with or
//  without modification is prohibited without the prior written consent
//  and/or affirmative license from Roost, Inc. and/or its affiliates and licensors.
// ***********************************************************************


#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "RCTBridgeModule.h"

@interface Provision : NSObject <RCTBridgeModule>

@property (nonatomic, copy) NSString *SSID;
@property (nonatomic, copy) NSString *password;
@property (nonatomic, copy) NSString *objectID;
@property (nonatomic) int countryCode;
@property (nonatomic) int versionNum;

@property (nonatomic) BOOL verbose;

@end
