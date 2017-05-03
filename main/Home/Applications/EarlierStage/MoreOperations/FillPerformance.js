/**
 * Created by Nealyang on 2017/5/3.
 * 填报完成情况
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

export default class FillPerformance extends Component{
    render(){
        return(
            <View>
                <StatusBar navigator={this.props.navigator} title="填报完成情况"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
