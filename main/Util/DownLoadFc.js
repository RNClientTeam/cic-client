/**
 * Created by Administrator on 2016/11/4.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    NativeModules,
} from 'react-native';
class DownLoadFc extends Component {

    static  DownLoadFc (url) {
        NativeModules.MyRN.show('666',0);
        NativeModules.MyRN.appdownload(url);
    }
}
export default DownLoadFc;