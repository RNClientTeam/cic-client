package com.cic_client.utils;

import android.content.Context;
import android.content.DialogInterface;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.widget.ArrayAdapter;

import com.cic_client.MyRN;
import com.cic_client.R;
import com.facebook.react.bridge.ReadableMap;


import java.lang.ref.WeakReference;
import java.util.List;

/**
 * @author Alexander Ustinov
 */
public class UI
{
    public static @NonNull AlertDialog chooseDialog(@Nullable final MyRN module,
                                                    @NonNull final ReadableMap options,
                                                    @Nullable final OnAction callback)
    {
        final Context context = module.getActivity();
        if (context == null)
        {
            return null;
        }
        final WeakReference<MyRN> reference = new WeakReference<>(module);

        final ButtonsHelper buttons = ButtonsHelper.newInstance(options);
        final List<String> titles = buttons.getTitles();
        final List<String> actions = buttons.getActions();
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                context,
                R.layout.list_item,
                titles
        );
        AlertDialog.Builder builder = new AlertDialog.Builder(context, module.getDialogThemeId() /*android.R.style.Theme_Holo_Light_Dialog*/);
        if (ReadableMapUtils.hasAndNotEmptyString(options, "title"))
        {
            builder.setTitle(options.getString("title"));
        }

        builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int index) {
                final String action = actions.get(index);

                switch (action) {
                    case "photo":
                        callback.onTakePhoto(reference.get());
                        break;

                    case "library":
                        callback.onUseLibrary(reference.get());
                        break;

                    case "cancel":
                        callback.onCancel(reference.get());
                        break;

                    default:
                        callback.onCustomButton(reference.get(), action);
                }
            }
        });

        builder.setNegativeButton(buttons.btnCancel.title, new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialogInterface,
                                int i)
            {
                callback.onCancel(reference.get());
                dialogInterface.dismiss();
            }
        });

        final AlertDialog dialog = builder.create();

        dialog.setOnCancelListener(new DialogInterface.OnCancelListener()
        {
            @Override
            public void onCancel(@NonNull final DialogInterface dialog)
            {
                callback.onCancel(reference.get());
                dialog.dismiss();
            }
        });

        //dialog.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));
        return dialog;
    }

    public interface OnAction
    {
        void onTakePhoto(@Nullable MyRN module);
        void onUseLibrary(@Nullable MyRN module);
        void onCancel(@Nullable MyRN module);
        void onCustomButton(@Nullable MyRN module, String action);
    }
}
