package com.reactroost.settings;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Intent;
import android.provider.Settings;
import android.os.Bundle;
import android.app.Activity;

public class SettingsModule extends ReactContextBaseJavaModule {
    private static final String TAG = "SettingsModule";

    public SettingsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Settings";
    }

    @ReactMethod
    public void openWifiSettings() {
        Activity activity = getCurrentActivity();
        Intent intent = new Intent(Settings.ACTION_WIFI_SETTINGS);
        if (intent.resolveActivity(activity.getPackageManager()) != null) {
          activity.startActivity(intent);
        }
    }
}
