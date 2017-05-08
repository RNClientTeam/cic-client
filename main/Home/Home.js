"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
const {width} = Dimensions.get('window');
import StatusBar from '../Component/StatusBar'
import MenuItems from './Component/MenuItems'
import ManageState from './Component/ManageState'
import Notification from './Component/Notification'
import Signed from './Signed/Signed'
import DownLoadFc from  './../Util/DownLoadFc';
import CameraPage from './Component/CameraPage';
import keys from '../Util/storageKeys.json'
import {getSign} from '../Util/Util'

export default class Home extends Component {
    render() {
        return (
            <View style={{paddingBottom:50}}>
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
                        <MenuItems navigator={this.props.navigator}/>
                        {/*公司经营状况*/}
                        <ManageState/>
                        {/*最新消息*/}
                        <Notification navigator={this.props.navigator}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    test() {
//存数据
        //  storage.save({
        //      key:'neal',
        //      data:{
        //          name:'杨磊',
        //          userId:'Neal',
        //          token: 'some token'
        //      }
        //  });
//删除数据
        // storage.remove({
        //     key: 'lastPage'
        // });
//取数据
        // storage.load({
        //     key:'neadl'
        // }).then((res)=>{
        //     alert(JSON.stringify(res))
        // }).catch(err => {
        //     console.warn(err.message);
        //     switch (err.name) {
//key没有找到值         case 'NotFoundError':
        //             // TODO;
        //             alert(1)
        //             break;
        //         case 'ExpiredError':
        //             // TODO
        //             alert(2)
        //             break;
        //     }
        // })
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
        storage.load({
            key:keys.userMessage
        }).then((data)=>{
            let userID = data.userID;
            let sign = getSign({userID:userID});
            console.log(userID,sign)
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
