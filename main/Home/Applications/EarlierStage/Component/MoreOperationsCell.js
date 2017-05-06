/**
 * Created by Nealyang on 2017/5/3.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import ApproveForDelay from "../MoreOperations/ApproveForDelay";
import ApplyForDelay from "../MoreOperations/ApplyForDelay";
import CheckFlowInfo from "../MoreOperations/CheckFlowInfo";
import Turnover from "../MoreOperations/Turnover";
import FillPerformance from "../MoreOperations/FillPerformance";
import EnsureComplete from "../MoreOperations/EnsureComplete";
const {width} = Dimensions.get('window');

export default class MoreOperationsCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                <Image style={styles.imgStyle}
                       source={this.props.dataSource.img}/>
                <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>{this.props.dataSource.name}</Text>
            </TouchableOpacity>
        )
    }

    skipPage(){
        if(this.props.dataSource.name === '延期变更申请'){
            this.props.navigator.push({
                name:'applyForDelay',
                component:ApplyForDelay
            });
        }else if(this.props.dataSource.name === '延期变更审批'){
            this.props.navigator.push({
                name:'approveForDelay',
                component:ApproveForDelay
            });
        }else if(this.props.dataSource.name === '流程信息查看'){
            this.props.navigator.push({
                name:'checkFlowInfo',
                component:CheckFlowInfo
            });
        }else if(this.props.dataSource.name === '人员变更'){
            this.props.navigator.push({
                name:'turnover',
                component:Turnover
            });
        }else if(this.props.dataSource.name === '填报完成情况'){
            this.props.navigator.push({
                name:'fillPerformance',
                component:FillPerformance
            });
        }else if(this.props.dataSource.name === '确认完成'){
            this.props.navigator.push({
                name:'ensureComplete',
                component:EnsureComplete
            });
        }

        this.props.closeModal()
    }
}

const styles = StyleSheet.create({
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection:'row',
        height:width*0.14,
        alignItems:'center',
        borderColor:'#ddd',
        borderBottomWidth:1
    },
    imgStyle: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});