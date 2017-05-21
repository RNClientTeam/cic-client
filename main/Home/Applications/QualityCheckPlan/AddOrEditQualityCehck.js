/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import KeySelect from "../../../Component/KeySelect";
import KeyValueRight from "../../../Component/KeyValueRight";
import KeyTime from "../../../Component/KeyTime";
const {width}  = Dimensions.get('window');

export default class AddOrEditQualityCheck extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title={this.props.flag === 'add'?"质量检查计划新建":"质量检查计划编辑"}/>
                <ScrollView>
                    <KeySelect propKey="项目名称"/>
                    <KeyValueRight propKey="项目工号" defaultValue="DS-CS34984908394580"/>
                    <KeyValueRight propKey="子项名称" defaultValue="龙泽苑D区配电室改造工程"/>
                    <KeyValueRight propKey="检查任务" defaultValue="项目实施计划任务"/>
                    <KeySelect propKey="任务性质"/>
                    <KeyTime propKey="计划开始时间"/>
                    <KeyTime propKey="计划结束时间"/>
                    <KeySelect propKey="任务状态"/>
                    <KeySelect propKey="负责部门"/>
                    <KeySelect propKey="负责人"/>
                    <KeySelect propKey="创建时间"/>
                    <KeySelect propKey="创建人"/>
                </ScrollView>
                {
                    this.props.flag === 'add'?
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={[styles.button,{backgroundColor:'#216fd0'}]}>
                                <Text style={{color:'#fff'}}>创建</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={[styles.button,{backgroundColor:'#02bd93'}]}>
                                <Text style={{color:'#fff'}}>提交审核</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{backgroundColor:'#216fd0'}]}>
                                <Text style={{color:'#fff'}}>保存</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{backgroundColor:'#fc9628'}]}>
                                <Text style={{color:'#fff'}}>生效</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#f2f2f2'
    },
    button:{
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        flex:1,
        margin:width*0.04
    }
});