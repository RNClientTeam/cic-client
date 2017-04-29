"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    AsyncStorage,
    Image,
    Keyboard
} from 'react-native';

var {width, height} = Dimensions.get('window');
import Main from './main.js';
import MyTextInput from './Component/MyTextInput.js';
import GestureLogin from './User/GestureLogin.js';
import {getKey} from './Util/Util.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            warningText: ''
        }
    }
    componentWillMount() {
        AsyncStorage.getItem(getKey('gestureSecret'), (error, result) => {
            //获取到有手势密码,切换路由到手势解锁登录
            if (result) {
                this.props.navigator.replace({
                    name: 'GestureLogin',
                    component: GestureLogin,
                    type: 'fade',
                    params: {
                        password: result
                    }
                });
            }
        });
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
    }
    //键盘弹出调用
    _keyboardWillShow() {
        this.refs.scroll.scrollTo({x:0, y:50, animated:true});
    }

    //键盘收起调用
    _keyboardWillHide() {
        this.refs.scroll.scrollTo({x:0, y:0, animated:true});
    }
    render() {
        return(
            <ScrollView style={styles.flex}
                contentContainerStyle={{alignItems:'center'}}
                ref="scroll"
                overScrollMode='always'
                bounces={false}>
                <Image source={require('../resource/imgs/login/loginBG.png')}
                    style={styles.loginBG} resizeMode="contain"/>

                {/**用户名或密码输入有误的提示信息**/}
                <Text style={styles.warningSty}>{this.state.warningText}</Text>

                {/**用户名**/}
                <MyTextInput
                    placeholder="请输入用户名"
                    leftImageSource={require('../resource/imgs/login/ic_user.png')}
                    style={styles.myInput}
                    text={this.state.username}
                    onChangeText={(text)=>this.setState({username:text})}/>
                {/**密码**/}
                <MyTextInput
                    placeholder="请输入密码"
                    leftImageSource={require('../resource/imgs/login/ic_lock.png')}
                    style={styles.myInput}
                    secureTextEntry={true}
                    text={this.state.password}
                    onChangeText={(text)=>this.setState({password:text})}/>

                {/**忘记密码**/}
                <TouchableHighlight underlayColor='transparent' onPress={()=>{}} style={{alignSelf:'flex-start',marginLeft:20}}>
                    <Text style={styles.forgetPassword}>忘记密码？</Text>
                </TouchableHighlight>
                {/**登录**/}
                <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='transparent' style={styles.loginTouch}>
                    <View style={styles.loginView}>
                        <Text style={styles.loginText}>
                            登录
                        </Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        );
    }

    onPress() {
        //通过接口判断用户名密码是否正确
        if (this.state.password !== '123' && this.state.username !== '123') {
            this.setState({warningText: '用户名：123， 密码：123'});
        } else {
            const {navigator} = this.props;
            if (navigator) {
                navigator.replace({
                    component: Main,
                    name: 'Main',
                    type: 'fade'
                });
            }
        }
    }

    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    myInput: {
        width:width - 40,
        height:height*0.0705,
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 5,
        marginBottom: 0.0335*height
    },
    loginView: {
        alignItems:'center',
        justifyContent:'center',
        width:width - 40,
        height:height*0.0705,
        borderRadius:5,
        backgroundColor:'#0965b5'
    },
    loginText: {
        fontSize: 20,
        color: 'white'
    },
    warningSty: {
        width:width - 40,
        height: 25,
        fontSize: 14,
        color: 'red'
    },
    loginBG: {
        width: width,
        height: width * 0.713,
        marginBottom: height*0.0334
    },
    forgetPassword: {
        fontSize: 16,
        color: '#1969b8'
    },
    loginTouch: {
        marginTop: height*0.14
    }
});
