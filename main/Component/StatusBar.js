/**
 * Created by Nealyang on 2017/4/24.
 * 状态导航栏高度
 */
"use strict";
import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const Platform = require('Platform');
const {width} = Dimensions.get('window');
export default class StatusBar extends Component{
    render(){
        return(
            <View>
                <View style={[Platform.OS === 'android'?{backgroundColor:'#216fd0',height:0}:{backgroundColor:'#216fd0',height:20}]}>
                </View>
                <View style={styles.navigationStyle}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationStyle:{
        flexDirection:'row',
        backgroundColor:'#216fd0',
        width:width,
        height:44,
        alignItems:'center'
    }
});