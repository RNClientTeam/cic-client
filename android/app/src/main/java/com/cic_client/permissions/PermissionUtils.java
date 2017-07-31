package com.cic_client.permissions;

import android.app.Activity;
import android.content.DialogInterface;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;

import com.cic_client.MyRN;
import com.facebook.react.bridge.ReadableMap;


import java.lang.ref.WeakReference;

/**
 * Created by rusfearuth on 03.03.17.
 */

public class PermissionUtils
{
    public static @Nullable AlertDialog explainingDialog(@NonNull final MyRN module,
                                                         @NonNull final ReadableMap options,
                                                         @NonNull final OnExplainingPermissionCallback callback)
    {
        if (module.getContext() == null)
        {
            return null;
        }
        final ReadableMap permissionDenied = options.getMap("permissionDenied");
        final String title = permissionDenied.getString("title");
        final String text = permissionDenied.getString("text");
        final String btnReTryTitle = permissionDenied.getString("reTryTitle");
        final String btnOkTitle = permissionDenied.getString("okTitle");
        final WeakReference<MyRN> reference = new WeakReference<>(module);

        final Activity activity = module.getActivity();

        if (activity == null)
        {
            return null;
        }

        AlertDialog.Builder builder = new AlertDialog.Builder(activity, module.getDialogThemeId());
        builder
                .setTitle(title)
                .setMessage(text)
                .setCancelable(false)
                .setNegativeButton(btnOkTitle, new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(final DialogInterface dialogInterface,
                                        int i)
                    {
                        callback.onCancel(reference, dialogInterface);
                    }
                })
                .setPositiveButton(btnReTryTitle, new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialogInterface,
                                        int i)
                    {
                        callback.onReTry(reference, dialogInterface);
                    }
                });

        return builder.create();
    }

    public interface OnExplainingPermissionCallback {
        void onCancel(WeakReference<MyRN> moduleInstance, DialogInterface dialogInterface);
        void onReTry(WeakReference<MyRN> moduleInstance, DialogInterface dialogInterface);
    }
}