/**
 * Created by fan on 2017/05/10.
 * 前期进度计划详情页 - 进度计划cell
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
const {width} = Dimensions.get('window');
import HistoricalCompletion from './HistoricalCompletion.js';
import ApartmentPlaneDetail from "./ApartmentPlaneDetail";
import IsTodo from "../../Component/IsTodo";
export default class ApartmentPlaneListCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    {this.props.data.isTodo == '00'?null:<IsTodo isTodo={this.props.data.isTodo}/>}
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color:'#216fd0',fontSize:width*0.045,flex:1,marginRight:10}}>{this.props.data.jhmc}</Text>
                            <View style={[styles.stateView,this.props.data.ztmc==='启动'?{backgroundColor:'#11cb43'}:{}]}>
                                <Text style={styles.stateText}>{this.props.data.ztmc}</Text>
                            </View>
                        </View>
                        <Text style={styles.projectName}>{this.props.data.xmbh} - {this.props.data.xmmc}</Text>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.zrrmc}</Text>
                        <Text style={[{width: width * 0.3}, styles.textStyle]}>{this.props.data.zrbmmc}</Text>
                        <Text style={[{width: width * 0.4,marginLeft: 4}, styles.textStyle]}>{this.props.data.wcbl?this.props.data.wcbl+'%':"0%"}</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.qdsj+' / ' +this.props.data.wcsj}</Text>
                        <TouchableOpacity onPress={()=>{this.props.setModalVisible(this.props.data.id);this.props.getOperatingItem(this.props.data)}} style={styles.editTouch}>
                            <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                                style={styles.editImg} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        this.props.navigator.push({
            component: ApartmentPlaneDetail,
            name: 'ApartmentPlaneDetail',
            params:{
                id:this.props.data.id
            }
        });
    }
}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        paddingBottom:width*0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:width*0.02,
        paddingBottom:width*0.02
    },
    projectName: {
        lineHeight: 21
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color:'#4f74a3',
        fontSize:12
    },
    stateView: {
        backgroundColor: '#fe9a25',
        width:width*0.12,
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03},
    editTouch: {
        position: 'absolute',
        top: 22,
        right: 18,
        padding:5
    },
    editImg: {
        width: 22,
        height: 25
    }

});
