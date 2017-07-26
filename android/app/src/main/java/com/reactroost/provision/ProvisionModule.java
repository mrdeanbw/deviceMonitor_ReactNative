package com.reactroost.provision;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.List;

public class ProvisionModule extends ReactContextBaseJavaModule {
    private static final String TAG = "ProvisionModule";

    public ProvisionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Provision";
    }

    @ReactMethod
    public void show() {
        Log.d(TAG, "show: hello");
    }

    @ReactMethod
    public void generateChirp(String ssid, String pass, String objectId, Integer countryCode, Integer versionNum, Callback callback) {
        final Provision provision = new Provision(ssid, pass, objectId, countryCode, versionNum);
        List<Short> rawByte = provision.generate();
        List<Short> buffer = provision.modulate(rawByte);
        String fileName = objectId.toString();
        try {
            File file = File.createTempFile(fileName, ".wav", getReactApplicationContext().getCacheDir());
            rawToWave(buffer, file);
            callback.invoke(null, file.getPath());

        } catch(IOException e) {
            callback.invoke("an error occurred", null);
        }
    }

    private void rawToWave(final List<Short> buffer, final File waveFile) throws IOException {

        short[] shortArray = new short[buffer.size()];
        for (int i = 0; i < shortArray.length; i++) {
            shortArray[i] = buffer.get(i);
        }

        DataOutputStream output = null;
        try {
            output = new DataOutputStream(new FileOutputStream(waveFile));
            // WAVE header
            // see http://ccrma.stanford.edu/courses/422/projects/WaveFormat/
            writeString(output, "RIFF"); // chunk id
            writeInt(output, 36 + shortArray.length * 2); // chunk size  // DIVIDE BY 2?
            writeString(output, "WAVE"); // format
            writeString(output, "fmt "); // subchunk 1 id
            writeInt(output, 16); // subchunk 1 size
            writeShort(output, (short) 1); // audio format (1 = PCM)
            writeShort(output, (short) 2); // number of channels
            writeInt(output, 44100); // sample rate
            writeInt(output, 44100 * 2); // byte rate
            writeShort(output, (short) 2); // block align
            writeShort(output, (short) 16); // bits per sample
            writeString(output, "data"); // subchunk 2 id
            writeInt(output, shortArray.length * 2); // subchunk 2 size
            ByteBuffer bytes = ByteBuffer.allocate(shortArray.length * 2);
            bytes.order(ByteOrder.LITTLE_ENDIAN);
            for (short s : shortArray) {
                bytes.putShort(s);
            }
            output.write(bytes.array());
        } finally {
            if (output != null) {
                output.close();
            }
        }
    }

    private void writeInt(final DataOutputStream output, final int value) throws IOException {
        output.write(value >> 0);
        output.write(value >> 8);
        output.write(value >> 16);
        output.write(value >> 24);
    }

    private void writeShort(final DataOutputStream output, final short value) throws IOException {
        output.write(value >> 0);
        output.write(value >> 8);
    }

    private void writeString(final DataOutputStream output, final String value) throws IOException {
        for (int i = 0; i < value.length(); i++) {
            output.write(value.charAt(i));
        }
    }
}