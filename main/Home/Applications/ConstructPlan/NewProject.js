/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import NewProjectHeaderCell from "./Component/NewProjectHeaderCell";
import KeyTime from "../../../Component/KeyTime";
import KeySelect from "../../../Component/KeySelect";
import KeyValueN from "../../../Component/KeyValueN";
import KeyPercentage from "../../../Component/KeyPercentage";
import BottomSaveButton from "../../../Component/BottomSaveButton";
import ListHeaderCell from "../Component/ListHeaderCell";
const {width}  = Dimensions.get('window');

export default class NewProject extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新建施工日计划"/>
                <ScrollView>
                    <ListHeaderCell name="临时任务"/>
                    <KeySelect propKey="任务负责人"/>
                    <KeyTime propKey="任务开始时间"/>
                    <KeyTime propKey="任务结束时间"/>
                    <KeySelect propKey="参与人员"/>
                    <View style={{marginTop:width*0.02,marginBottom:width*0.03}}>
                        <KeyValueN propKey="工作地点"/>
                        <KeyValueN propKey="工作内容"/>
                        <KeyValueN propKey="完成情况"/>
                    </View>
                    <KeyPercentage propKey="完成比例"/>
                    <BottomSaveButton/>
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