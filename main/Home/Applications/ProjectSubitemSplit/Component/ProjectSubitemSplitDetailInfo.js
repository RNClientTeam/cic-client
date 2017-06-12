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

export default class ProjectSubitemSplitDetailInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {key:"工程子项",value:"市场营销一部"},
                {key:"是否锁定",value:"否"},
                {key:"实施经理",value:"贾世坤"},
                {key:"工程类别",value:"配电"},
                {key:"工程子项承包范围",value:"承接范围详情"},
                {key:"图纸编号及名称",value:"无"},
                {key:"责任人",value:"李健坤"},
                {key:"施工部门",value:"市场项目部"},
                {key:"进场施工时间",value:"2017-09-12"},
                {key:"竣工送电时间",value:"2017-09-12"},
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="工程子项详情"/>
                <ScrollView>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText} numberOfLines={1}>
                            {this.props.proNum}   {this.props.proName}
                        </Text>
                    </View>
                    {this.renderKV()}
                    <View style={styles.divide}></View>
                    <View>
                        <View style={styles.headerView}>
                            <Text style={styles.headerText} numberOfLines={1}>
                                送电时间
                            </Text>
                        </View>
                        <KeyValue propKey='意向送电/竣工时间' propValue='2017-02-16'/>
                        <KeyValue propKey='最晚送电/竣工时间' propValue='2017-02-16'/>
                        <KeyValue propKey='确认送电/竣工时间' propValue='2017-02-16'/>
                    </View>
                    <View style={styles.divide}></View>
                    <View>
                        <View style={styles.headerView}>
                            <Text style={styles.headerText} numberOfLines={1}>
                                其他说明
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text numberOfLines={1}>
                                其他情况说明
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderKV = ()=>{
        let tpl = [];
        for(let i = 0;i<this.state.dataSource.length;i++){
            tpl.push(
                <KeyValue key={i} propKey={this.state.dataSource[i].key} propValue={this.state.dataSource[i].value}/>
            )
        }
        return tpl;
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