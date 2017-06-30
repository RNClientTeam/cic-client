package com.cic_client;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
//import com.facebook.soloader.SoLoader;

//import com.cboy.rn.splashscreen.SplashScreen;
import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.yoloci.fileupload.FileUploadPackage;
import com.facebook.soloader.SoLoader;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        SoLoader.init(this, /* native exopackage */ false);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cic_client";
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK){
            try {
                if (resultCode == RESULT_OK ) {
                    Uri uri = data.getData();
                    String url = FileUtils2.getPath(this,uri);
                    String url2 = url.trim();
                    if (url2 != null && !url2.equals("") ) {
                        mQueue.add(url2);
                    } else {
                        mQueue.add("请选择合适的pdf格式文件");
                    }
                } else {
                    mQueue.add("请选择合适的pdf格式文件");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            mQueue.add("没有选择文件");
        }
    }
}
