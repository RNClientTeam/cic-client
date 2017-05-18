"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
const {width} = Dimensions.get('window');
import StatusBar from '../Component/StatusBar'
import MenuItems from './Component/MenuItems'
import ManageState from './Component/ManageState'
import Notification from './Component/Notification'
import Signed from './Signed/Signed'
import CameraPage from './Component/CameraPage';
import keys from '../Util/storageKeys.json'
import {getSign, AESDecrypt} from '../Util/Util'
import FetchUrl from '../Util/service.json'
import Loading from "../Component/Loading";
import axios from 'axios'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bsData: [],
            msgList: [],
            badges: {
                todo: 0,
                remind: 0
            }
        }
    }

    render() {
        return (
            <View style={{paddingBottom: 50}}>
                <StatusBar notBack={true} navigator={this.props.navigator}>
                    <Image style={styles.logoStyle} source={require('../../resource/imgs/home/home_logo.png')}/>
                    <Text style={styles.logoText}>九州方圆</Text>
                    <View style={styles.operationViewStyle}>
                        <TouchableOpacity onPress={this.onPressSweep.bind(this)}>
                            <Image style={styles.sweepStyle} source={require('../../resource/imgs/home/sweep.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPresSigned.bind(this)}>
                            <Image style={styles.signedStyle} source={require('../../resource/imgs/home/signed.png')}/>
                        </TouchableOpacity>
                    </View>
                </StatusBar>
                <ScrollView>
                    <View style={styles.viewSty}>
                        {/*菜单栏*/}
                        <MenuItems badges={this.state.badges} navigator={this.props.navigator}/>
                        {/*公司经营状况*/}
                        <ManageState bsData={this.state.bsData}/>
                        {/*最新消息*/}
                        <Notification dataSource={this.state.msgList.data} navigator={this.props.navigator}/>
                    </View>
                </ScrollView>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }


    /**
     * 扫一扫
     */
    onPressSweep() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                component: CameraPage,
                name: 'CameraPage',
                params: {
                    title: '二维码扫描'
                }
            });
        }
    }

    /**
     * 签到
     */
    onPresSigned() {
        this.props.navigator.push({
            component: Signed,
            name: 'Signed'
        })
    }

    componentDidMount() {
        global.axios = axios;
        axios.defaults.baseURL = FetchUrl.baseUrl;
        //添加一个请求拦截器，添加sign
        axios.interceptors.request.use(function (config) {
            if (config.data) {
                config.data.sign = getSign(config.data);
                config.url = config.url + `?userID=${config.data.userID}&sign=${config.data.sign}`
            } else if (config.params) {
                alert('Home.js拦截器需要修改')
            }
            return config;
        }, function (err) {
            return Promise.reject(err);
        });

        //添加一个响应拦截器,解码
        axios.interceptors.response.use(function (res) {
            return JSON.parse(AESDecrypt(res.data.data, SECRETKEY))
        }, function (err) {
            return Promise.reject(err);
        });

        storage.load({
            key: keys.userMessage
        }).then((data) => {
            global.GLOBAL_USERID = data.userID;
            axios.post('/todo/index',
                {
                    userID: data.userID
                }
            ).then(resultData => {
                this.setState({
                    bsData: resultData.bsData,
                    msgList: resultData.msgList,
                    badges: {
                        todo: resultData.todo,
                        remind: resultData.remind
                    },
                    isLoading:false
                })
            }).catch(err=>{
                this.setSate({
                    isLoading:false
                })
            })
        })
    }
}

const styles = StyleSheet.create({
    navigationStyle: {
        flexDirection: 'row',
        backgroundColor: '#216fd0',
        width: width,
        height: 44,
        alignItems: 'center'
    },
    logoStyle: {
        width: width * 0.1,
        height: width * 0.1,
        marginLeft: 5
    },
    logoText: {
        color: '#fff',
        fontWeight: "800",
        marginLeft: 6,
        fontSize: 15
    },
    operationViewStyle: {
        flexDirection: 'row',
        height: 44,
        position: 'absolute',
        right: 10,
        alignItems: 'center'
    },
    sweepStyle: {
        width: width * 0.05,
        height: width * 0.05
    },
    signedStyle: {
        width: width * 0.05,
        height: width * 0.05,
        marginLeft: width * 0.07
    },
    viewSty: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
