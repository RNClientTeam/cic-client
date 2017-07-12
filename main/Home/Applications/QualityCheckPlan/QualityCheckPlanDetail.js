/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import ListHeaderCell from "../Component/ListHeaderCell";
import KeyValueLeft from "../../../Component/KeyValueLeft";
const {width} = Dimensions.get('window');

export default class QualityCheckPlanDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="项目质量检查计划详情"/>
                <ScrollView>
                    <ListHeaderCell name={this.props.proName}/>
                    <KeyValueLeft propsKey="项目编号" propsValue="CX-DS140188-1032"/>
                    <KeyValueLeft propKey="项目名称" propValue="十三陵配电基地啦啦啦"/>
                    <KeyValueLeft propKey="工程子项名称" propValue="工程子项1"/>
                    <KeyValueLeft propKey="任务性质" propValue="一检"/>
                    <KeyValueLeft propKey="当前状态" propValue="新建任务"/>
                    <KeyValueLeft propKey="计划开始时间" propValue="2017-08-11"/>
                    <KeyValueLeft propKey="计划结束时间" propValue="2017-08-11"/>
                    <KeyValueLeft propKey="负责人" propValue="曹婷婷"/>
                    <KeyValueLeft propKey="创建时间" propValue="2017-05-11"/>
                </ScrollView>
                <TouchableOpacity style={styles.editRecord}>
                    <Image style={styles.imgSty} source={require('../../../../resource/imgs/home/QualityCheckPlan/editRecord.png')}/>
                    <Text style={{color:'#216fd0'}}>填报检查记录</Text>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmZljcjh/detail',{
            params:{
                userID:GLOBAL_USERID,
                jhrwId:this.props.id,
                callID:true
            }
        }).then(data=>{
            console.log(data);
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    editRecord:{
        flexDirection:'row',
        height:width*0.12,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',

    },
    imgSty:{
        width:width*0.07,
        height:width*0.07,
        marginRight:width*0.02
    }
});