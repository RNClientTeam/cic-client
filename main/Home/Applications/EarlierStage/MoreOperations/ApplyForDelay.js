/**
 * Created by Nealyang on 2017/5/3.
 * 延期变更申请
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

export default class ApplyForDelay extends Component{
    render(){
        return(
            <View>
                <StatusBar navigator={this.props.navigator} title="延期变更申请"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
