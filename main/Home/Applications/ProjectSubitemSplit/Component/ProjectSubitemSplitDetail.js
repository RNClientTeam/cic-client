/**
 * Created by Nealyang on 2017/5/5.
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

export default class ProjectSubitemSplitDetail extends Component{
    render(){
        return(
            <View>
                <StatusBar navigator={this.props.navigator} title="工程子项拆分详情"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});