
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


#import "Provision.h"
#import <zlib.h>
#import <AudioToolbox/AudioToolbox.h>
#import "RCTLog.h"

// Change these to alter the provisioning file
#define SAMPLE_RATE         44100.          // Output file sample rate
#define LENGTH_ZERO         0.008           // Length of a '0' in seconds
#define LENGTH_ONE          2*LENGTH_ZERO   // Length of a '1' in seconds
#define CHIRP_START         (3150-1200)     // Frequency to start chirp sweep at in Hz
#define CHIRP_STOP          (3150+1200)     // Frequency to end chirp sweep at in Hz
#define CHIRP_LENGTH        0.008           // Length of chirp in seconds
#define PREAMBLE            0xC2492492      // Message preamble
#define CRYPTO_BUFSIZ 4096

@implementation Provision

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(generateChirp:(NSString *)SSID password:(NSString *)password objectID:(NSString *)objectID countryCode:(int)countryCode versionNum:(int)versionNum callback:(RCTResponseSenderBlock)callback)
{

  RCTLogInfo(@"network: %@, pass: %@, objId: %@, country: %d, version: %d", SSID, password, objectID, countryCode, versionNum);
  Provision *provision = [[Provision alloc] initWithSSID:SSID password:password objectID:objectID countryCode:countryCode versionNum:versionNum];
  NSURL *filePath = [provision generate];
  callback(@[[NSNull null], [filePath path]]);
}

- (instancetype)initWithSSID:(NSString *)SSID password:(NSString *)password objectID:(NSString *)objectID countryCode:(int)countryCode versionNum:(int)versionNum {
    self = [self init];
    if (self) {
        self.SSID = SSID;
        self.password = password;
        self.objectID = objectID;
        self.countryCode = countryCode;
        self.versionNum = versionNum;
    }
    return self;
}

- (NSURL *)generate {
    // Packetise data
    NSArray *payload = [self buildPayload];
    payload = [self addHeader:payload];
    payload = [self addCRC:payload];
    payload = [self addPreamble:payload];

    for (int i = 0; i < [payload count]; i++) {
        NSLog(@"Final payload: %@", payload[i]);
    }

    NSURL *fileName = [self modulate:payload];
    return fileName;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.verbose = YES;
    }
    return self;
}

- (NSData *)genBit:(int)bit {
    // Generates the appropriate signals for a specified bit

    NSMutableData *res = [[NSMutableData alloc] init];

    int sample_len;
    if (bit == 1) {
        sample_len = (int)(SAMPLE_RATE * LENGTH_ONE);
    }
    else {
        sample_len = (int)(SAMPLE_RATE * LENGTH_ZERO);
    }
    [res appendData:[self genChirp]];
    [res appendData:[self genSilence:sample_len]];
    return res;
}

- (NSData *)genChirp {
    // Generates a sweeping chirp

    NSMutableData *res = [[NSMutableData alloc] init];

    int sample_len = (int)(SAMPLE_RATE * CHIRP_LENGTH);
    double delta = (double)(CHIRP_STOP-CHIRP_START)/sample_len;     // How much to change chirp frequency by at each sample point.
    double freq = CHIRP_START;
    // print sample_len, delta
    for (int i = 0; i < sample_len; ++i) {
        double value = sin(2*M_PI*(i/SAMPLE_RATE)*(freq+((delta/2)*i))) * sin(2*M_PI*62.5*i/SAMPLE_RATE);
        value = value  * 32767.;
        short packed_value = (short)value;
        [res appendBytes:&packed_value length:sizeof(packed_value)];
        [res appendBytes:&packed_value length:sizeof(packed_value)];
    }

    return res;
}

- (NSData *)genSilence:(int)sampleLen {
    // Generate a period of silence for specified number of samples

    NSMutableData *res = [[NSMutableData alloc] init];

    for (int i = 0; i < sampleLen; ++i) {
        unsigned int packed_value = 0;
        [res appendBytes:&packed_value length:sizeof(packed_value)];
    }

    return res;
}

- (NSURL *)modulate:(NSArray *)data {
    // Takes a list of bytes and modulates it to the Roost provisioning sequence
    if (self.verbose) {
        NSLog(@"Modulating Data");
    }

    NSString *fileName = [[[NSUUID UUID] UUIDString] stringByAppendingPathExtension:@"wav"];
    NSString *cacheDirectory = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSURL *tvarFilename = [NSURL fileURLWithPath:[cacheDirectory stringByAppendingPathComponent:fileName]];

    AudioFileID mRecordFile;

    AudioStreamBasicDescription audioFormat;
    audioFormat.mSampleRate         = SAMPLE_RATE;
    audioFormat.mFormatID           = kAudioFormatLinearPCM;
    audioFormat.mFormatFlags        = kAudioFormatFlagIsPacked | kAudioFormatFlagIsSignedInteger;
    audioFormat.mBytesPerPacket     = 4;
    audioFormat.mFramesPerPacket    = 1;
    audioFormat.mBytesPerFrame      = 4;
    audioFormat.mChannelsPerFrame   = 2;
    audioFormat.mBitsPerChannel     = 16;

    OSStatus status = AudioFileCreateWithURL((__bridge CFURLRef)tvarFilename, kAudioFileWAVEType, &audioFormat, kAudioFileFlags_EraseFile | kAudioFileFlags_DontPageAlignAudioData, &mRecordFile);
    if (status != noErr) {
        if (self.verbose) {
            NSLog(@"failed to create file");
        }
        return nil;
    }

    NSMutableData *dataBits = [[NSMutableData alloc] init];

    for (int j = 0; j < data.count; ++j) {
        int byte = [data[j] intValue];

        for (int i = 0; i < 8; ++i) {
            [dataBits appendData:[self genBit:(byte>>i)&0x1]];
        }
    }
    [dataBits appendData:[self genSilence:44100]];

    NSDate *date = [NSDate date];

    void *sampleBuffer = [dataBits mutableBytes];
    UInt32 sizeOfBuffer = (unsigned int)(dataBits.length);

    if (self.verbose) {
        NSLog(@"generation time: %f", -[date timeIntervalSinceNow]);
    }

    status = AudioFileWriteBytes(mRecordFile, false, 0, &sizeOfBuffer, sampleBuffer);
    if (status != noErr) {
        if (self.verbose) {
            NSLog(@"failed to write to file");
        }
        return nil;
    }

    status = AudioFileClose(mRecordFile);
    if (status != noErr) {
        if (self.verbose) {
            NSLog(@"failed to close file");
        }
        return nil;
    }

    return tvarFilename;
}

- (NSArray *)buildPayload {
    NSMutableArray *op = [[NSMutableArray alloc] init];

    NSArray *type = nil;
    NSArray *length = nil;
    NSArray *binData = nil;

    if (self.SSID) {
        // Process the SSID
        const char *ssidv = [self.SSID UTF8String];
        type = [self packBytes:1 numBytes:1];
        length = [self packBytes:(int)(strlen(ssidv) + 3) numBytes:2];
        [op addObjectsFromArray:length];
        [op addObjectsFromArray:type];
        for (int i = 0; i < strlen(ssidv); ++i) {
            Byte c = ssidv[i];
            [op addObject:@(c)];
        }
    }

    if (self.password) {
        // Process the password
        const char *pwdv = [self.password UTF8String];
        type = [self packBytes:2 numBytes:1];
        length = [self packBytes:(int)(strlen(pwdv) + 3) numBytes:2];
        [op addObjectsFromArray:length];
        [op addObjectsFromArray:type];
        for (int i = 0; i < strlen(pwdv); ++i) {
            Byte c = pwdv[i];
            [op addObject:@(c)];
        }
    }

    if (self.objectID) {
        // Process the Object ID
        type = [self packBytes:3 numBytes:1];
        length = [self packBytes:(int)(self.objectID.length + 3) numBytes:2];
        [op addObjectsFromArray:length];
        [op addObjectsFromArray:type];
        for (int i = 0; i < self.objectID.length; ++i) {
            unichar c = [self.objectID characterAtIndex:i];
            [op addObject:@(c)];
        }
    }

    if (self.countryCode) {
        type = [self packBytes:5 numBytes:1];
        length = [self packBytes:4+3 numBytes:2];
        binData = [self packBytes:self.countryCode numBytes:4];
        [op addObjectsFromArray:length];
        [op addObjectsFromArray:type];
        [op addObjectsFromArray:binData];
    }

    return op;
}

- (NSArray *)addHeader:(NSArray *)ip {
    // Creates and adds the header to a string of data
    if (self.verbose) {
        NSLog(@"Adding Header");
    }

    NSArray *version = [self packBytes:self.versionNum numBytes:4];
    NSArray *totalLen = [self packBytes:(int)ip.count numBytes:4];
    NSArray *payloadNum = [self packBytes:0 numBytes:1];
    NSArray *payloadLen = [self packBytes:(int)ip.count numBytes:3];
    NSArray *reserved = [self packBytes:0 numBytes:4];
    NSMutableArray *res = [[NSMutableArray alloc] init];
    [res addObjectsFromArray:version];
    [res addObjectsFromArray:totalLen];
    [res addObjectsFromArray:payloadNum];
    [res addObjectsFromArray:payloadLen];
    [res addObjectsFromArray:reserved];
    [res addObjectsFromArray:ip];

    return res;
}

- (NSArray *)addCRC:(NSArray *)ip {
    // Calculates and adds the CRC to a block of data
    if (self.verbose) {
        NSLog(@"Adding CRC");
    }

    NSMutableData *t = [[NSMutableData alloc] init];
    for (int i = 0; i < ip.count; ++i) {
        unichar c = [ip[i] unsignedIntValue];
        [t appendBytes:&c length:1];
    }

    unsigned long CRC32 = crc32(0, t.bytes, (unsigned int)t.length);
    NSArray *crc = [self packBytes:(int)CRC32 numBytes:4];

    NSArray *pad = [self packBytes:255 numBytes:1];

    NSMutableArray *res = [[NSMutableArray alloc] init];
    [res addObjectsFromArray:ip];
    [res addObjectsFromArray:crc];
    [res addObjectsFromArray:pad];

    return res;
}

- (NSArray *)addPreamble:(NSArray *)ip {
    // Adds the preamble to a message
    if (self.verbose) {
        NSLog(@"Adding Preamble");
    }

    NSArray *preamble = [self packBytes:PREAMBLE numBytes:4];

    NSMutableArray *res = [[NSMutableArray alloc] init];
    [res addObjectsFromArray:preamble];
    [res addObjectsFromArray:ip];

    return res;
}

- (NSArray *)packBytes:(int)value numBytes:(int)numBytes {
    // Packs bytes (LSB first) into a list
    NSMutableArray *op = [[NSMutableArray alloc] init];

    for (int i = 0; i < numBytes; ++i) {
        int t = value >> (8*i);
        [op addObject:@(t & 0xFF)];
    }

    return op;
}

@end
