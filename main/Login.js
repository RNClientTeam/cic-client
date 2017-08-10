"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    Image,
    Keyboard
} from 'react-native';

let {width, height} = Dimensions.get('window');
import Main from './main.js';
import MyTextInput from './Component/MyTextInput.js';
import GestureLogin from './User/GestureLogin.js';
import {getKey, MD5Encrypt, AESDecrypt, getSign} from './Util/Util.js';
import FetURL from './Util/service.json';
import Toast from 'react-native-simple-toast';
import Loading from "./Component/Loading";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            warningText: '',
            isLoading:false,
            selected: true
        }
    }

    componentDidMount() {
        storage.load({
            key: getKey('gestureSecret')
        }).then((res)=>{
            this.props.navigator.replace({
                name: 'GestureLogin',
                component: GestureLogin,
                type: 'fade',
                params: {
                    password: res
                }
            });
        }).catch(err => {

        });

        storage.load({
            key: 'rememberPassword'
        }).then((res)=>{
            if (res) {
                storage.load({
                    key: getKey('usernameAndPW')
                }).then((result) => {
                    this.setState({
                        username: result.username,
                        password: result.password
                    });
                }).catch(err => {

                });
            } else {
                this.setState({selected: res});
            }
        }).catch(err => {

        });
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
                    defaultValue={this.state.username}
                    text={this.state.username}
                    onChangeText={(text)=>this.setState({username:text,warningText:''})}/>
                {/**密码**/}
                <MyTextInput
                    placeholder="请输入密码"
                    leftImageSource={require('../resource/imgs/login/ic_lock.png')}
                    style={styles.myInput}
                    defaultValue={this.state.password}
                    secureTextEntry={true}
                    text={this.state.password}
                    onChangeText={(text)=>this.setState({password:text,warningText:''})}/>

                {/**忘记密码**/}
                <TouchableHighlight underlayColor='transparent' onPress={this.rememberPassword.bind(this)} style={{alignSelf:'flex-start',marginLeft:20}}>
                    <View style={styles.selectedView}>
                        <View style={styles.outerView}>
                            <View style={[styles.innerView, {backgroundColor:this.state.selected?'#1969b8':'#fff'}]}></View>
                        </View>
                        <Text style={styles.forgetPassword}>记住密码</Text>
                    </View>
                </TouchableHighlight>
                {/**登录**/}
                <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='transparent' style={styles.loginTouch}>
                    <View style={styles.loginView}>
                        <Text style={styles.loginText}>
                            登录
                        </Text>
                    </View>
                </TouchableHighlight>
                {this.state.isLoading?<Loading/>:null}
            </ScrollView>
        );
    }

    rememberPassword() {
        this.setState({selected:!this.state.selected});
    }

    onPress() {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({warningText: '用户名或密码不能为空！'});
            return;
        }
        this.setState({isLoading:true});
        let loginURL = FetURL.baseUrl+'/user/login?loginName='+this.state.username+'&password='+MD5Encrypt(this.state.password);
        //通过接口判断用户名密码是否正确
        fetch(loginURL, {
            headers: {
                'Accept':'application/json;charset=UTF-8'
            }
        })
        .then((response) => {return response.json()})
        .then((responseData) => {
            if (responseData.code === 1) {
                //登录成功
                this.setState({
                    warningText: '',
                    isLoading:false
                });
                //是否保存密码
                storage.save({
                    key: 'rememberPassword',
                    data: this.state.selected
                });
                //保存用户名和密码
                var usernameAndPW = {
                    username: this.state.username,
                    password: this.state.password
                };
                storage.save({
                    key: getKey('usernameAndPW'),
                    data: usernameAndPW
                });

                //获取并保存用户信息
                var userMessage = AESDecrypt(responseData.data, responseData.secretKey);
                storage.save({
                    key: getKey('userMessage'),
                    data: JSON.parse(userMessage)
                });
                global.SECRETKEY = responseData.secretKey;
                global.DEPARTMENTID = JSON.parse(userMessage).deptID;
                global.USERNAME = JSON.parse(userMessage).userName;
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
                    warningText: '用户名或密码错误！',
                    isLoading: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                warningText: '请检查网络！',
                isLoading:false
            });
            Toast.show('请检查网络！');
        });
    }

    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
        this.timer && clearTimeout(this.timer);
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
    },
    selectedView: {
        flexDirection: 'row',
        alignItems: 'center',
        width:width - 40,
        justifyContent: 'flex-end'
    },
    outerView: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#1969b8',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        width: 8,
        height: 8,
        borderRadius: 4
    }
});
