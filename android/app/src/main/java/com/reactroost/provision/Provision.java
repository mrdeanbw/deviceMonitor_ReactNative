/*
 * ************************************************************************
 *  Copyright Â© 2015 Roost Inc.
 *  All rights reserved
 *
 *  This code is private, confidential and proprietary to Roost, Inc.â€‹ and its
 *  affiliates and licensors.  Redistribution, reproduction, copying or use of
 *  any portion of  this code, in source and/or binary forms and with or
 *  without modification is prohibited without the prior written consent
 *  and/or affirmative license from Roost, Inc. and/or its affiliates and licensors.
 * ***********************************************************************
 */

package com.reactroost.provision;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.CRC32;

public class Provision {

    public static final String LOG_TAG = Provision.class.getSimpleName();

    private static final int SAMPLE_RATE = 44100;                // Output file sample rate
    private static final double LENGTH_ZERO = 0.008;             // Length of a '0' in seconds
    private static final double LENGTH_ONE = 2 * LENGTH_ZERO;    // Length of a '1' in seconds
    private static final int CHIRP_START = (3150 - 1200);        // Frequency to start chirp sweep at in Hz
    private static final int CHIRP_STOP = (3150 + 1200);         // Frequency to end chirp sweep at in Hz
    private static final double CHIRP_LENGTH = 0.008;            // Length of chirp in seconds
    private static final int PREAMBLE = 0xC2492492;              // Message preamble
    private static final int COUNTRY_CODE = 16707;              // Canada WiFi Country Code
    private static final int VERSION_NUM = 1;

    private String ssid;
    private String password;
    private String objectId;

    public static final String SSID = "SSID";
    public static final String PASSWORD = "password";
    public static final String OBJECT_ID = "objectID";

    public Provision() {
    }
// Instantiate and generate provisioning chirp file this way:
//Get raw bytes
    // final Provision provision = new Provision(ssid, pass, objectId);
    // List<Short> rawByte = provision.generate();

//Get soundBytes
    // List<Short> buffer = provision.modulate(rawByte);

//Convert to byte Array
    // short[] shortArray = new short[buffer.size()];
    // for (int i = 0; i < shortArray.length; i++) {
    //     shortArray[i] = buffer.get(i);
    // }
    // sample = new AudioTrack(
    //         AudioManager.STREAM_MUSIC,
    //         44100,
    //         android.media.AudioFormat.CHANNEL_OUT_STEREO,
    //         android.media.AudioFormat.ENCODING_PCM_16BIT,
    //         4 * 1024 * 1024,
    //         AudioTrack.MODE_STATIC);
    //
    // sample.write(shortArray, 0, shortArray.length);
    // sample.play();

    public Provision(String ssid, String password, String objectId) {
        this.ssid = ssid;
        this.password = password;
        this.objectId = objectId;
        this.country = COUNTRY_CODE;
        this.versionNum = VERSION_NUM;
    }

    public void genBit(int bit, List<Short> buffer) {

        int sample_len;
        if (bit == 1) {
            sample_len = (int) (SAMPLE_RATE * LENGTH_ONE);
        } else {
            sample_len = (int) (SAMPLE_RATE * LENGTH_ZERO);
        }

        genChirp(buffer);
        genSilence(sample_len, buffer);
    }

    public void genChirp(List<Short> buffer) {

        int sample_len = (int) (SAMPLE_RATE * CHIRP_LENGTH);
        double delta = (double) (CHIRP_STOP - CHIRP_START) / sample_len;
        double freq = (double) CHIRP_START;

        for (int i = 0; i < sample_len; i++) {
            double value = Math.sin(2 * Math.PI * ((double) i / SAMPLE_RATE) * (freq + ((delta / 2) * i))) * Math.sin(2 * Math.PI * 62.5 * i / SAMPLE_RATE);
            value = value * Short.MAX_VALUE;
            short packed_value = (short) (value);

            buffer.add(packed_value);
            buffer.add(packed_value);
        }
    }

    public void genSilence(int sampleLen, List<Short> buffer) {

        for (int i = 0; i < sampleLen; i++) {
            buffer.add((short) 0);
            buffer.add((short) 0);
        }
    }

    public List<Short> buildPayload(String param, String value) {

        List<Short> list = new ArrayList<>();
        byte[] value2 = new byte[0];
        try{
            value2 = value.getBytes("UTF8");
        } catch (IOException ioe) {

        }
        int k = 0;
        if (SSID.equals(param)){
            k = 1;
        } else if (PASSWORD.equals(param)){
            k = 2;
        } else if (OBJECT_ID.equals(param)) {
            k = 3;
        }

        list.addAll(packBytes(value2.length + 3, 2));
        list.addAll(packBytes(k, 1));

        for (int i = 0; i < value2.length; i++) {
            list.add((short) value2[i]);

        }

        return list;
    }

    public List<Short> buildCountryCodePayload (int value) {
        List<Short> list = new ArrayList<>();

        list.addAll(packBytes(4+3, 2));
        list.addAll(packBytes(5, 1));
        list.addAll(packBytes(value, 4));

        return list;
    }

    public List<Short> addHeader(List<Short> ip) {

        List<Short> list = new ArrayList<Short>();
        list.addAll(packBytes(versionNum, 4));   //version
        list.addAll(packBytes(ip.size(), 4));    //total length
        list.addAll(packBytes(0, 1));            //payload num
        list.addAll(packBytes(ip.size(), 3));    //payload length
        list.addAll(packBytes(0, 4));            //reversed
        list.addAll(ip);

//        Log.i(LOG_TAG, "addHeader " + list.toString());
        return list;
    }

    public List<Short> addCRC(List<Short> ip) {

        List<Short> list = new ArrayList<Short>();
        for (int i = 0; i < ip.size(); i++) {
            char c = (char) ip.get(i).byteValue();
            list.add((short) c);
        }

        byte[] t = new byte[list.size()];
        for (int i = 0; i < list.size(); i++) {
            t[i] = list.get(i).byteValue();
        }

        CRC32 crc32 = new CRC32();
        crc32.update(t);
        long crc32Value = crc32.getValue();
//        Log.i(LOG_TAG, "crc long " + crc32Value);

        List<Short> crcArray = packBytes((int) crc32Value, 4);
        List<Short> pad = packBytes(255, 1);

        List<Short> result = new ArrayList<Short>();
        result.addAll(ip);
        result.addAll(crcArray);
        result.addAll(pad);

//        Log.i(LOG_TAG, "add CRC " + result.toString());
        return result;
    }

    public List<Short> addPreamble(List<Short> ip) {
        List<Short> preamble = packBytes(PREAMBLE, 4);
        List<Short> result = new ArrayList<Short>();
        result.addAll(preamble);
        result.addAll(ip);
//        Log.i(LOG_TAG, "addPreamble " + result.toString());
        return result;
    }

    public List<Short> packBytes(int value, int numBytes) {

        List<Short> list = new ArrayList<Short>(numBytes);

        for (int i = 0; i < numBytes; i++) {
            int t = value >> (8 * i);
            list.add((short) (t & 0xFF));
        }

//        Log.d(LOG_TAG, "packBytes " + list.toString());
        return list;
    }

    public List<Short> generate() {
        List<Short> payload = new ArrayList<Short>();

        List<Short> ssidPayload = buildPayload(SSID, ssid);
        List<Short> passPayload = buildPayload(PASSWORD, password);
        List<Short> objectIdPayload = buildPayload(OBJECT_ID, objectId);
        List<Short> countryCodePayload = buildCountryCodePayload(country);

        payload.addAll(ssidPayload);
        payload.addAll(passPayload);
        payload.addAll(objectIdPayload);
        payload.addAll(countryCodePayload);

        payload = addHeader(payload);
        payload = addCRC(payload);
        payload = addPreamble(payload);

//        Log.i(LOG_TAG, payload.toString());
        return payload;
    }

    public List<Short> modulate(List<Short> p) {

        List<Short> list = new ArrayList<>();

        for (int j = 0; j < p.size(); j++) {
            short b = p.get(j);

            for (int i = 0; i < 8; i++) {
                genBit((b >> i) & 0x1, list);
            }
        }
        genSilence(44100, list);
        return list;
    }
}
