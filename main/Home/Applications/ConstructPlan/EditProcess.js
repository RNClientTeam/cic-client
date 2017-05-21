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

export default class EditProcess extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="填报项目进展"/>
                <ScrollView>
                    <EditProcessHeader/>
                    <KeyValueRight propKey="负责人" readOnly={false} defaultValue=""/>
                    <KeyValueRight propKey="当前状态" readOnly={false} defaultValue=""/>
                    <KeyTime propKey="任务开始时间"/>
                    <KeyTime propKey="任务结束时间"/>
                    <KeyValueRight propKey="工作地点" readOnly={false} defaultValue=""/>
                    <KeyValueRight propKey="参与人员" readOnly={false} defaultValue=""/>
                    <KeyPercentage propKey="完成比例" readOnly={false}/>
                    <Remark propKey="完成情况" remark=""/>
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