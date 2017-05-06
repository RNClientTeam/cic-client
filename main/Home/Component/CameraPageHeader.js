/**
 * Created by fan on 2017/05/06.
 * 拍照页的状态栏
 */
"use strict";
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
const Platform = require('Platform');
const {width} = Dimensions.get('window');
export default class CameraPageHeader extends Component {
    render() {
        return (
            <View>
                <View style={styles.statusBar}></View>
                <View style={styles.headerView}>
                    {
                        Platform.OS === 'android' ?
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image style={styles.backIcon}
                                   source={require('../../../resource/imgs/nav/android_back.png')}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image style={styles.backIcon}
                                   source={require('../../../resource/imgs/nav/ios_back.png')}/>
                        </TouchableOpacity>
                    }
                    <View style={{width:width*0.85}}>
                        <Text style={{textAlign:'center',color:'#fff',fontSize:15,fontWeight:'bold'}}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        )
    }

    goBack() {
        if(this.props.backButtonFun){
            this.props.backButtonFun();
        }else{
            this.props.navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    statusBar: {
        width: width,
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: 'rgba(20, 20, 20, 1)'
    },
    headerView: {
        flexDirection: 'row',
        backgroundColor: 'rgba(20, 20, 20, 1)',
        width: width,
        height: 44,
        alignItems: 'center'
    },
    backIcon: {
        width: width * 0.05,
        height: width * 0.05,
        marginLeft: 5,
    }
});
