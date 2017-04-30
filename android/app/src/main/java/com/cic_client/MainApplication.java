package com.cic_client;

import android.app.Application;

import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactApplication;
import com.keyee.pdfview.PDFView;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.keyee.pdfview.PDFView;
import com.react.rnspinkit.RNSpinkitPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.react.rnspinkit.RNSpinkitPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new PDFView(),
            new PickerPackage(),
              new RNFSPackage(),
              new PDFView(),
              new RNSpinkitPackage(),
              new RCTCameraPackage(),
              new BarcodeScannerPackage(),
              new SplashScreenReactPackage(),
              new RNSpinkitPackage(),
              new AnExampleReactPackage()
      );
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}
