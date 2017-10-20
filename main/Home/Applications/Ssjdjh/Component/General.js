"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    ListView,
    StyleSheet,
    Dimensions
} from 'react-native';
import toast from 'react-native-simple-toast'
var {width, height} = Dimensions.get('window');

export default class General extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: [],
            cbfw:''
        }
    }
    render() {
        return (
            <ListView
                dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={() => {
                    return <View  style={styles.separator}></View>
                }}
                renderHeader={this.renderHeader.bind(this)}
                enableEmptySections={true}
                renderFooter={this.renderFooter.bind(this)}/>
        );
    }

    renderRow(rowData) {
        return (
            <View style={styles.rowStyle}>
                <Text style={[styles.textStyl,{width:width*0.4}]} numberOfLines={1}>{rowData.key}</Text>
                <Text style={[styles.textStyl, rowData.key==='参与人员'&&styles.peopleName,{width:width*0.62,lineHeight:parseInt(width*0.05)}]}
                    numberOfLines={0}>
                    {rowData.value}
                </Text>
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={styles.headerView}>
            </View>
        )
    }

    renderFooter() {
        return (
            <View>
                <View style={[styles.headerView, {height:10}]}></View>
                <View style={styles.footerTitle}>
                    <Text style={styles.textStyl}>承包范围</Text>
                </View>
                <View style={styles.footerInfo}>
                    <Text style={[styles.textStyl,{lineHeight: 25}]}>
                        {this.state.cbfw}
                    </Text>
                </View>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmSsjdjh/gczxgk',{
            params:{
                userID:GLOBAL_USERID,
                gczxId:this.props.gczxId,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                data = data.data;
                this.setState({
                    dataSource: [
                        {key:'工程子项名称', value:data.zxmc},
                        {key:'责任部门', value:data.zrbm},
                        {key:'责任人', value:data.zrr},
                        {key:'意向送电时间', value:data.yxsdsj},
                        {key:'最晚送电时间', value:data.zwsdsj},
                        {key:'计划开始时间', value:data.jhkssj},
                        {key:'计划结束时间', value:data.jhjssj},
                        {key:'合同工期开始时间', value:data.htgqkssj},
                        {key:'合同工期结束时间', value:data.htgqjssj},
                    ],
                    cbfw:data.cbfw
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            console.error(err);
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerView: {
        width: width,
        height: 6,
        backgroundColor:'#f2f2f2'
    },
    rowStyle: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 12,
        paddingVertical: 16,
        backgroundColor: '#fff',
        width:width,
    },
    separator: {
        width: width,
        height: 1,
        backgroundColor: '#f2f2f2'
    },
    footerTitle: {
        paddingLeft: 15,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    footerInfo: {
        paddingLeft: 16,
        paddingRight: 12,
        paddingTop: 10,
        paddingBottom: 20
    },
    textStyl: {
        fontSize: 14,
        color:'#3d3d3d',
    },
    peopleName: {
        flex: 1,
        color: '#4fa6ef',
        lineHeight: 28,
        marginTop: -7
    }
});
