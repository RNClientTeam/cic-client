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
import KeyValueN from "../../../../Component/KeyValueN";
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
                        <Text style={styles.headerText}>
                            {this.state.data.xmgh}  {this.state.data.xmmc}
                        </Text>
                    </View>
                    <KeyValue propsKey='工程子项' propsValue={this.state.data.zxmc}/>
                    <KeyValue propsKey='是否锁定' propsValue={this.state.data.jhsd}/>
                    <KeyValue propsKey='实施经理' propsValue={this.state.data.ssjl}/>
                    <KeyValue propsKey='工程类别' propsValue={this.state.data.gclb}/>
                    <KeyValue propsKey='工程子项承包范围' propsValue={this.state.data.cbfw}/>
                    <KeyValue propsKey='图纸编号及名称' propsValue={this.state.data.tzbhmc}/>
                    <KeyValue propsKey='责任人' propsValue={this.state.data.zrrmc}/>
                    <KeyValue propsKey='施工部门' propsValue={this.state.data.sgbm}/>
                    <KeyValue propsKey='进场施工时间' propsValue={this.state.data.jhkssj}/>
                    <KeyValue propsKey='竣工送电时间' propsValue={this.state.data.jhjssj}/>
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
                    <View style={styles.headerView}>
                        <Text style={styles.headerText} numberOfLines={1}>
                            其他说明
                        </Text>
                    </View>
                    <View style={{minHeight:width * 0.12,backgroundColor:'#fff',paddingLeft:width*0.02,justifyContent:'center'}}>
                        <Text>dafdasfsdafasdf</Text>
                    </View>
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
                console.log(data);
                this.setState({
                    data
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
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center',
        paddingTop:width*0.04,
        paddingBottom:width*0.04
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