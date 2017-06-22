/**
 * Created by Nealyang on 2017/4/24.
 * 状态导航栏高度
 */
"use strict";
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    TouchableHighlight
} from 'react-native'
const Platform = require('Platform');
const {width} = Dimensions.get('window');
export default class StatusBar extends Component {
    render() {
        return (
            <View>
                <View style={[Platform.OS === 'android' ? {
                    backgroundColor: '#216fd0',
                    height: 0
                } : {backgroundColor: '#216fd0', height: 20}]}>
                </View>
                <View style={styles.navigationStyle}>
                    {this.props.notBack ?
                        <TouchableOpacity style={styles.backIcon}/>
                        : Platform.OS === 'android' ?
                            <TouchableOpacity underlayColor='transparent' style={{padding:10}} onPress={this.goBack.bind(this)}>
                                <Image style={styles.backIcon}
                                       source={require('../../resource/imgs/nav/android_back.png')}/>
                            </TouchableOpacity> :
                            <TouchableHighlight underlayColor='transparent' style={{padding:10}} onPress={this.goBack.bind(this)}>
                                <Image style={styles.backIcon}
                                       source={require('../../resource/imgs/nav/ios_back.png')}/>
                            </TouchableHighlight>
                    }
                    {this.props.title ? <View style={{width:width*0.85}}>
                        <Text style={{textAlign:'center',color:'#fff',fontSize:15,fontWeight:'bold'}}>{this.props.title}</Text>
                    </View> : <View/>}
                    {this.props.children}
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
    navigationStyle: {
        flexDirection: 'row',
        backgroundColor: '#216fd0',
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
