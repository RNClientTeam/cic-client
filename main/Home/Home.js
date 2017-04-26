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
const  {width} = Dimensions.get('window');
import StatusBar from '../Component/StatusBar'
import MenuItems from './Component/MenuItems'
import ManageState from './Component/ManageState'
import Notification from './Component/Notification'
import Signed from './Signed/Signed'
// import CameraPage from  './../Util/CameraPage';
import CameraPage from './Component/CameraPage';
export default class Home extends Component {
    render() {
        return(
        <View>
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
                    <MenuItems/>
                    {/*公司经营状况*/}
                    <ManageState/>
                    {/*最新消息*/}
                    <Notification/>
                </View>
            </ScrollView>
        </View>
        );
    }

    /**
     * 扫一扫
     */
    onPressSweep(){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                component: CameraPage,
                name: 'CameraPage'
            });
        }
    }

    /**
     * 签到
     */
    onPresSigned(){
        this.props.navigator.push({
            component: Signed,
            name: 'Signed'
        })
    }
}

const styles = StyleSheet.create({
    navigationStyle:{
        flexDirection:'row',
        backgroundColor:'#216fd0',
        width:width,
        height:44,
        alignItems:'center'
    },
    logoStyle:{
        width:width*0.1,
        height:width*0.1,
        marginLeft:5
    },
    logoText:{
        color:'#fff',
        fontWeight:"800",
        marginLeft:6,
        fontSize:15
    },
    operationViewStyle:{
        flexDirection:'row',
        height:44,
        position:'absolute',
        right:10,
        alignItems:'center'
    },
    sweepStyle:{
        width:width*0.05,
        height:width*0.05
    },
    signedStyle:{
        width:width*0.05,
        height:width*0.05,
        marginLeft:width*0.07
    },
    viewSty: {
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});
