package com.cic_client;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

import cn.jpush.android.api.JPushInterface;
import com.facebook.soloader.SoLoader;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        SoLoader.init(this, /* native exopackage */ false);
        if((getIntent().getFlags() & Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT) != 0){
            finish();
            return;
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cic_client";
    }
}
