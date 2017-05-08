"use strict";
import React, {Component} from 'react';
import {
    View,
    Image,
    TextInput
} from 'react-native';

import GesturePassword from '../lib/gesturePassword/index.js';
import Main from '../main.js';
import {getKey} from '../Util/Util.js';
var Password1 = '';

export default class GestureLogin extends Component {
    constructor() {
        super();
        this.state = {
            status: 'normal',
            message: '请设置手势密码'
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: '请设置手势密码'
        });
    }
    onEnd(password) {
        if (Password1 === '') {
            if (password.length < 4) {
                this.setState({
                    status: 'normal',
                    message: '密码过于简单，请重新设置'
                });
            } else {
                Password1 = password;
                this.setState({
                    status: 'normal',
                    message: '请再次输入密码'
                });
            }
        } else if (Password1 !== password){
            this.setState({
                status: 'wrong',
                message: '两次密码不一样，请重新设置'
            });
            Password1 = '';
        } else if (Password1 === password) {
            Password1 = '';
            this.setState({
                status: 'right',
                message: '设置密码成功'
            });
            this.timer = setTimeout(() => {
                storage.save({
                    key: getKey('gestureSecret'),
                    data: password
                });
                this.props.navigator.pop();
            }, 320);
        }
    }
    render() {
        return(
            <GesturePassword
                ref='pg'
                bgSource={require('../../resource/imgs/login/bgImage.png')}
                safeSource={require('../../resource/imgs/login/safe.png')}
                allowCross={false}
                interval={300}
                rightColor='white'
                isLogin={false}
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
