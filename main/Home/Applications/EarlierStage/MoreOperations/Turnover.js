/**
 * Created by Nealyang on 2017/5/3.
 * 人员变更
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width}  = Dimensions.get('window');

export default class Turnover extends Component{
    render(){
        return(
            <View>
                <StatusBar navigator={this.props.navigator} title="人员变更"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

