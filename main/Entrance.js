"use strict";
import React, {Component} from 'react';
import {
    View,
    Navigator,
    Text,
    Image,
    AsyncStorage,
    BackAndroid,
    Platform,
    ToastAndroid
} from 'react-native';

import Splash from 'react-native-splash-screen';
import Storage from 'react-native-storage';
import Login from './Login.js';

export default class Entrance extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: Login,
                    name: 'Login'
                }}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator}  {...route.params}/>;
                }}
                configureScene={(route) => {
                    if (route.type === 'fade') {
                        return Navigator.SceneConfigs.FadeAndroid;
                    }
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                ref="navigator"/>
        );
    }

    componentWillMount() {
        Splash.hide();
        let storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

        });
        global.storage = storage;

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid() {
        const  navigator  = this.refs.navigator;
        let routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
               //最近2秒内按过back键，可以退出应用。
               return false;
            } else {
               this.lastBackPressed = Date.now();
               ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
               return true;//默认行为
            }
        }
    };
}
