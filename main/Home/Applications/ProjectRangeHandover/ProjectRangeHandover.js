/**
 * Created by Nealyang on 2017/5/7.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width}  = Dimensions.get('window');

export default class ProjectRangeHandover extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar nvigator={this.props.navigator} title="工程范围交接"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});