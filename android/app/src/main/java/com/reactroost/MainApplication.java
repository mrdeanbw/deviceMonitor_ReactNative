package com.smartroost.app;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactroost.volume.VolumePackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.oblador.keychain.KeychainPackage;
import com.beefe.picker.PickerViewPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactroost.provision.*;
import com.reactroost.settings.*;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new ReactNativeI18n(),
            new RNDeviceInfo(),
            new RNSoundPackage(),
            new RNNetworkInfoPackage(),
            new KeychainPackage(),
            new PickerViewPackage(),
            new ReactNativeDialogsPackage(),
            new ReactNativeContacts(),
            new ProvisionPackage(),
            new SettingsPackage(),
            new VolumePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
