/**
 * Created by Nealyang on 2017/4/24.
 * 状态导航栏高度
 */
"use strict";
import React,{Component} from 'react';
import {
    View,
} from 'react-native'
const Platform = require('Platform');
export default class StatusBar extends Component{
    render(){
        return(
            <View style={[Platform.OS === 'android'?{backgroundColor:'#216fd0',height:0}:{backgroundColor:'#216fd0',height:20}]}>
            </View>
        )
    }
}