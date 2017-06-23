package com.cic_client;

import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017-04-27.
 */

public class MyRN extends ReactContextBaseJavaModule {
    private ReactApplicationContext context;
    public MyRN(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "MyRN";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("SHORT", Toast.LENGTH_SHORT);
        constants.put("LONG", Toast.LENGTH_LONG);
        return constants;
    }
    //获取文件
    @ReactMethod
    public void scan(){
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, pdf.class);
        currentActivity.startActivity(intent);
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    //下载文件
    @ReactMethod
    public void appdownload(String mDownloadUrl){
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(android.content.Intent.ACTION_VIEW);
        Uri content_url = Uri.parse(mDownloadUrl);
        intent.setData(content_url);
        context.startActivity(intent);
    }
}
