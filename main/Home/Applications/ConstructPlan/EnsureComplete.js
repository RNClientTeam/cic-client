/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import EditProcessHeader from "./Component/EditProcessHeader";
import KeyValueRight from "../../../Component/KeyValueRight";
import KeyTime from "../../../Component/KeyTime";
import KeyPercentage from "../../../Component/KeyPercentage";
import Remark from "../../../Component/Remark";
const {width}  = Dimensions.get('window');

export default class EnsureComplete extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="确认完成"/>
                <ScrollView>
                    <EditProcessHeader/>
                    <KeyValueRight propKey="负责人"  defaultValue="王东"/>
                    <KeyValueRight propKey="当前状态"  defaultValue="执行中"/>
                    <KeyTime propKey="任务开始时间"/>
                    <KeyTime propKey="任务结束时间"/>
                    <KeyValueRight propKey="工作地点"  defaultValue="中科委员电所"/>
                    <KeyValueRight propKey="参与人员"  defaultValue="张辉"/>
                    <KeyPercentage propKey="完成比例"/>
                    <Remark propKey="完成情况" remark="无"/>
                </ScrollView>
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