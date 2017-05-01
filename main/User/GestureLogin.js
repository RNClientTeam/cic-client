"use strict";
import React, {Component} from 'react';
import {
    View,
    Image,
    TextInput
} from 'react-native';

import GesturePassword from '../lib/gesturePassword/index.js';
import Main from '../main.js';

export default class GestureLogin extends Component {
    constructor() {
        super();
        this.state = {
            status: 'normal',
            message: '使用手势密码登录'
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: '使用手势密码登录'
        });
    }
    onEnd(password) {
        if (password == this.props.password) {
            this.timer = setTimeout(() => {
                const {navigator} = this.props;
                if (navigator) {
                    navigator.replace({
                        component: Main,
                        name: 'Main',
                        type: 'fade'
                    });
                }
            }, 320);
        } else {
            this.setState({
                status: 'wrong',
                message: '密码有误，请重试'
            });
        }
    }
    render() {
        return(
            <GesturePassword
                ref='pg'
                bgSource={require('../../resource/imgs/login/bgImage.png')}
                safeSource={require('../../resource/imgs/login/safe.png')}
                allowCross={true}
                interval={300}
                rightColor='white'
                isLogin={true}
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}/>
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}
