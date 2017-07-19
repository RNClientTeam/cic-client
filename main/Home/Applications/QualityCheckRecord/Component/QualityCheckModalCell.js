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
import QualityDoubleCheckRecord from "./QualityDoubleCheckRecord"
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
        if (this.props.dataSource.name === '增加') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    add: true,
                    initialPage: 0,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '修改') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    edit: true,
                    initialPage: 0,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '审核') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    check: true,
                    initialPage: 0,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '下发整改任务') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    checkAndZgrw: true,
                    initialPage: 1,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '填报整改情况') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    tbzgqk: true,
                    initialPage: 1,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '填报复查记录') {
            this.props.navigator.push({
                name: 'QualityDoubleCheckRecord',
                component: QualityDoubleCheckRecord,
                params: {
                    fcjl: true,
                    initialPage: 2,
                    data: this.props.data
                }
            })
        } else if (this.props.dataSource.name === '删除') {
            alert('删除操作');
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
