/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import KeyValue from "../../../../Component/KeyValue";
const {width} = Dimensions.get('window');

export default class ProjectSubitemSplitInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {key:"所属部门",value:"市场营销一部"},
                {key:"项目经理",value:"王二"},
                {key:"合同工期开始时间",value:"2017-02-16"},
                {key:"合同工期结束时间",value:"2017-09-12"},
                {key:"合同计划开始时间",value:"2017-09-12"},
                {key:"合同计划结束时间",value:"2017-09-12"},
            ]
        }
    }

    render() {
        return (
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText} numberOfLines={1}>
                        【电气业务】CX_DS14163-15011 动物园园区电缆更换
                    </Text>
                </View>
                {this.renderKV()}
            </View>
        )
    }

    renderKV = ()=>{
        let tpl = [];
        for(let i = 0;i<this.state.dataSource.length;i++){
            tpl.push(
                <KeyValue key={i} propsKey={this.state.dataSource[i].key} propsValue={this.state.dataSource[i].value}/>
            )
        }
        return tpl;
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#fff',
        marginTop: width * 0.02,
        height: width * 0.12,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center'
    },
    headerText: {
        fontWeight: '500',
        color: '#5476a1',
        marginLeft:width*0.02
    }
});