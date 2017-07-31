package com.cic_client;
import android.support.annotation.StyleRes;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AnExampleReactPackage implements ReactPackage {
    public static final int DEFAULT_EXPLAINING_PERMISSION_DIALIOG_THEME = R.style.DefaultExplainingPermissionsTheme;
    private @StyleRes final int dialogThemeId;
    public AnExampleReactPackage()
    {
        this.dialogThemeId = DEFAULT_EXPLAINING_PERMISSION_DIALIOG_THEME;
    }
    public AnExampleReactPackage(@StyleRes final int dialogThemeId)
    {
        this.dialogThemeId = dialogThemeId;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modoules = new ArrayList<>();
        modoules.add(new MyRN(reactContext,dialogThemeId));
        return modoules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.EMPTY_LIST;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.EMPTY_LIST;
    }
}
