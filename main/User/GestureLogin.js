"use strict";
import React, {Component} from 'react';
import {
    View,
    Image,
    TextInput
} from 'react-native';

import GesturePassword from '../lib/gesturePassword/index.js';
import {getKey, MD5Encrypt, AESDecrypt, getSign} from '../Util/Util.js';
import Main from '../main.js';
import FetURL from '../Util/service.json';
import Loading from "../Component/Loading.js";

export default class GestureLogin extends Component {
    constructor() {
        super();
        this.state = {
            status: 'normal',
            message: '使用手势密码登录',
            isLoading: false
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
            this.setState({isLoading:true});
            storage.load({
                key: getKey('usernameAndPW')
            }).then((res)=>{
                let loginURL = FetURL.baseUrl+'/user/login?loginName='+res.username+'&password='+MD5Encrypt(res.password);
                //通过接口判断用户名密码是否正确
                fetch(loginURL)
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.code === 1) {
                        //登录成功
                        this.setState({isLoading:false});
                        //获取并保存用户信息
                        var userMessage = AESDecrypt(responseData.data, responseData.secretKey);
                        storage.save({
                            key: getKey('userMessage'),
                            data: JSON.parse(userMessage)
                        });
                        global.SECRETKEY = responseData.secretKey;
                        //登录成功
                        this.timer = setTimeout(() => {
                            const {navigator} = this.props;
                            if (navigator) {
                                navigator.replace({
                                    component: Main,
                                    name: 'Main',
                                    type: 'fade'
                                });
                            }
                        }, 310);
                    } else {
                        this.setState({
                            status: 'wrong',
                            message: '密码有误，请重试',
                            isLoading: false
                        });
                    }
                })
                .catch((error) => {
                    this.setState({isLoading:false});
                });
            }).catch(err => {
                this.setState({isLoading:false});
            });
        } else {
            this.setState({
                status: 'wrong',
                message: '密码有误，请重试',
                isLoading: false
            });
        }
    }
    render() {
        return(
            <View style={{flex:1}}>
                <GesturePassword
                    ref='pg'
                    bgSource={require('../../resource/imgs/login/bgImage.png')}
                    safeSource={require('../../resource/imgs/login/safe.png')}
                    allowCross={false}
                    interval={300}
                    rightColor='white'
                    isLogin={true}
                    status={this.state.status}
                    message={this.state.message}
                    onStart={() => this.onStart()}
                    onEnd={(password) => this.onEnd(password)}/>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}
