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

import okhttp3.Call;
import okhttp3.Response;


/**
 * Created by Administrator on 2017-06-21.
 */

public class pdf extends AppCompatActivity {
    //测试地址
    private String Sever = "http://123.56.97.229:6080/Server/task/detail.do";
    //上传地址
    private String uploadfile = "http://123.56.97.229:6080/Server/task/upload.do";
    //为了测试方便
    private String userid = "02774bc536964386a68bd2b64145c910";
    private String taskid = "f92a591a37fe4677b7a239158c14fbca";
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
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK){//是否选择，没选择就不会继续
            try {
                Uri uri = data.getData();//得到uri，后面就是将uri转化成file的过程。
                Log.d("文件路径--",uri+"");
                String url = FileUtils2.getPath(pdf.this,uri);
                String url2 = url.trim();
                Toast.makeText(pdf.this,"文件路径为："+url2,Toast.LENGTH_SHORT).show();
                UploadFile(url2);
                finish();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    //上传文件
    private void UploadFile(String url) {
        File file = new File(url);
        OkHttpUtils.post(uploadfile)
                .params("userid",userid)
                .params("taskid",taskid)
                .params("assid","")
                .params("file",file)
                .execute(new StringCallback() {
                    @Override
                    public void onSuccess(String s, Call call, Response response) {
                        Toast.makeText(pdf.this,"上传成功",Toast.LENGTH_SHORT).show();
                    }
                });
    }
}
