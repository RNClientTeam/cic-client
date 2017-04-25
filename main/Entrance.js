"use strict";
import React, {Component} from 'react';
import {
    View,
    Navigator,
    Text,
    Image
} from 'react-native';

import Splash from 'react-native-splash-screen';

import Login from './Login.js';

export default class Entrance extends Component {
    componentDidMount() {
        Splash.hide();
    }
    render() {
        return(
            <Navigator
                initialRoute={{
                    component: Login,
                    name:'Login'
                }}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator}  {...route.params}/>;
                }}
                configureScene={(route) => {
                    if (route.type === 'fade') {
                        return Navigator.SceneConfigs.FadeAndroid;
                    }
                    return Navigator.SceneConfigs.PushFromRight;
                }} />
        );
    }
}
