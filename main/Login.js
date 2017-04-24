"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView
} from 'react-native';

var {width, height} = Dimensions.get('window');
import Main from './main.js';
import MyTextInput from './Component/MyTextInput.js';

export default class Login extends Component {
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
                    leftImageSource={require('../resource/imgs/login/ic_user.png')}
                    style={styles.myInput}/>
                {/**密码**/}
                <MyTextInput
                    placeholder="请输入密码"
                    leftImageSource={require('../resource/imgs/login/ic_lock.png')}
                    style={styles.myInput}
                    secureTextEntry={true}/>

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
        backgroundColor:'blue',
        marginTop: 60
    },
    loginText: {
        fontSize: 20,
        color: 'white'
    }
});
