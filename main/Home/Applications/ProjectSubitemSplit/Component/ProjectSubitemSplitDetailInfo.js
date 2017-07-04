/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView
} from 'react-native'
import KeyValue from "../../../../Component/KeyValueLeft";
import StatusBar from "../../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import toast from 'react-native-simple-toast'
export default class ProjectSubitemSplitDetailInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:{}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="工程子项详情"/>
                <ScrollView>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText} numberOfLines={1}>
                            {this.props.zxmc}
                        </Text>
                    </View>
                    {this.state.data.jhztmc?<KeyValue propsKey='子项状态名称' propsValue={this.state.data.jhztmc}/>:null}
                    {this.state.data.ssjlmc?<KeyValue propsKey='实施经理' propsValue={this.state.data.ssjlmc}/>:null}
                    {this.state.data.jhsd?<KeyValue propsKey='计划锁定' propsValue={this.state.data.jhsd}/>:null}
                    {this.state.data.gclb?<KeyValue propsKey='工程类别' propsValue={this.state.data.gclb}/>:null}
                    {this.state.data.zxmc?<KeyValue propsKey='子项名称' propsValue={this.state.data.zxmc}/>:null}
                    {this.state.data.jhkssj?<KeyValue propsKey='开始时间' propsValue={this.state.data.jhkssj}/>:null}
                    {this.state.data.jhsdmc?<KeyValue propsKey='计划锁定名称' propsValue={this.state.data.jhsdmc}/>:null}
                    {this.state.data.cbfw?<KeyValue propsKey='承包范围' propsValue={this.state.data.cbfw}/>:null}
                    {this.state.data.jhzt?<KeyValue propsKey='子项状体' propsValue={this.state.data.jhzt}/>:null}
                    {this.state.data.jhjssj?<KeyValue propsKey='结束时间' propsValue={this.state.data.jhjssj}/>:null}
                    {this.state.data.dqwcqk?<KeyValue propsKey='当前完成情况' propsValue={this.state.data.dqwcqk}/>:null}
                    {this.state.data.zylb?<KeyValue propsKey='专业类别' propsValue={this.state.data.zylb}/>:null}
                    {this.state.data.zxqz?<KeyValue propsKey='进度权重' propsValue={this.state.data.zxqz}/>:null}
                    {this.state.data.jdbl?<KeyValue propsKey='进度比例' propsValue={this.state.data.jdbl}/>:null}
                    <View style={styles.divide}></View>
                    {
                        (this.state.data.yxsdsj||this.state.data.zwsdsj||this.state.data.jqdhsdsj)?
                        <View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText} numberOfLines={1}>
                                    送电时间
                                </Text>
                            </View>
                            {this.state.data.yxsdsj?<KeyValue propsKey='意向送电/竣工时间' propsValue={this.state.data.yxsdsj}/>:null}
                            {this.state.data.zwsdsj?<KeyValue propsKey='最晚送电/竣工时间' propsValue={this.state.data.zwsdsj}/>:null}
                            {this.state.data.jqdhsdsj? <KeyValue propsKey='局启动会送电时间' propsValue={this.state.data.jqdhsdsj}/>:null}
                        </View>:null
                    }
                    <View style={styles.divide}></View>
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmGczx/zxcf4Detail',{
            params:{
                userID:GLOBAL_USERID,
                zxid:this.props.id,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                data = data.data;
                this.setState({
                    data
                },function () {
                    console.log(this.state);
                })
            }else{
                toast.show(data.message);
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    headerView: {
        backgroundColor: '#fff',
        height: width * 0.12,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center'
    },
    headerText: {
        fontWeight: '500',
        marginLeft:width*0.02
    },
    row: {
        backgroundColor: '#fff',
        height: width * 0.12,
        paddingLeft: 0.02 * width,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center'
    },
    divide: {
        height: 0.02 * width
    }
});