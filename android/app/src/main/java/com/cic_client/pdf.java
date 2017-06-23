package com.cic_client;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.Toast;
import com.lzy.okhttputils.OkHttpUtils;
import com.lzy.okhttputils.callback.StringCallback;

import java.io.File;
import java.util.concurrent.ArrayBlockingQueue;

import okhttp3.Call;
import okhttp3.Response;


/**
 * Created by Administrator on 2017-06-21.
 */

public class pdf extends AppCompatActivity {
    //构建一个阻塞的单一数据的队列
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toast.makeText(pdf.this,"添加附件",Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");//设置类型，我这里是任意类型，任意后缀的可以这样写。
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        startActivityForResult(intent,1);
    }
    public void scan (View v){
        Toast.makeText(pdf.this,"添加附件",Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");//设置类型，我这里是任意类型，任意后缀的可以这样写。
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        startActivityForResult(intent,1);
    }
    //文件路径
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK){//是否选择，没选择就不会继续
            try {
                if (resultCode == RESULT_OK ) {
                    Uri uri = data.getData();//得到uri，后面就是将uri转化成file的过程。
                    Log.d("文件路径--",uri+"");
                    String url = FileUtils2.getPath(this,uri);
                    String url2 = url.trim();
                    if (url2 != null && !url2.equals("")) {
                        mQueue.add(url2);
                    } else {
                        mQueue.add("无数据");
                    }
                } else {
                    mQueue.add("无数据...");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
            finish();
        }
    }
}
