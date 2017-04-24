"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    AsyncStorage
} from 'react-native';

var {width, height} = Dimensions.get('window');
import Main from './Main.js';
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
            if (!result) {
                this.props.navigator.replace({
                    name: 'GestureLogin',
                    component: GestureLogin,
                    type: 'fade'
                });
            }
        });
    }
    render() {
        return(
            <ScrollView style={styles.flex}
                contentContainerStyle={{alignItems:'center'}}
                bounces={false}>
                <Text style={styles.text1}>
                    九州方圆
                </Text>
                <Text style={styles.text2}>
                    业务管理信息系统
                </Text>

                {/**用户名**/}
                <MyTextInput
                    placeholder="请输入用户名"
                    leftImageSource={require('../resource/ic_user.png')}
                    style={styles.myInput}
                    text={this.state.username}
                    onChangeText={(text)=>this.setState({username:text})}/>
                {/**密码**/}
                <MyTextInput
                    placeholder="请输入密码"
                    leftImageSource={require('../resource/ic_lock.png')}
                    style={styles.myInput}
                    secureTextEntry={true}
                    text={this.state.password}
                    onChangeText={(text)=>this.setState({password:text})}/>

                {/**用户名或密码输入有误的提示信息**/}
                <Text style={styles.warningSty}>{this.state.warningText}</Text>
                {/**登录**/}
                <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                    <View style={styles.loginView}>
                        <Text style={styles.loginText}>
                            登录
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
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
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    text1: {
        fontSize: 40,
        color: 'blue',
        marginTop: 80,
        marginBottom: 20,
        fontWeight: '300',
        letterSpacing: 18,
        paddingLeft: 18
    },
    text2: {
        fontSize: 28,
        color: 'blue',
        marginBottom: 80,
        fontWeight: '300'
    },
    myInput: {
        width:width - 80,
        height:40,
        borderWidth: 1,
        borderColor: '#c2c2c2',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#f2f2f2'
    },
    loginView: {
        alignItems:'center',
        justifyContent:'center',
        width:width - 80,
        height:40,
        borderRadius:5,
        backgroundColor:'blue'
    },
    loginText: {
        fontSize: 20,
        color: 'white'
    },
    warningSty: {
        width:width - 80,
        height: 25,
        fontSize: 12,
        color: 'red',
        marginTop: 40,
        marginBottom: 2
    }
});
