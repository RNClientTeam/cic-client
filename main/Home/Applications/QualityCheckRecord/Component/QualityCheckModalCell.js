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
import  SecurityApproval from "./SecurityApproval"
import QualityCheckRecordModification from "./QualityCheckRecordModification"

const {width} = Dimensions.get('window');

export default class QualityCheckModalCell extends Component {
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
        // if(this.props.dataSource.name === '检查计划新建'){
        //     this.props.navigator.push({
        //         name:"AddOrEditQualityCehck",
        //         component:AddOrEditQualityCehck,
        //         params:{
        //             flag:'add'
        //         }
        //     })
        //
        // }else if(this.props.dataSource.name === '检查计划编辑'){
        //     this.props.navigator.push({
        //         name:"AddOrEditQualityCehck",
        //         component:AddOrEditQualityCehck,
        //         params:{
        //             flag:'edit'
        //         }
        //     })
        // }
        if (this.props.dataSource.name === '提交安全审核') {
            this.props.navigator.push({
                name: 'SecurityApproval',
                component: SecurityApproval
            })
        } else if (this.props.dataSource.name === '记录整改') {
            this.props.navigator.push({
                name: 'QualityCheckRecordModification',
                component: QualityCheckRecordModification
            })
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