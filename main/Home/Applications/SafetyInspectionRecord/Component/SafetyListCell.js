/**
 * Created by fan on 2017/05/18.
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
import SafetyDetail from './SafetyDetail.js';
import ExamineAndApprove from './ExamineAndApprove.js';
import RectifyTask from './RectifyTask.js';
export default class SafetyInspectionListCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color:'#216fd0',fontSize:width*0.045}} numberOfLines={1}>{this.props.data.zxmc}</Text>
                            <View style={styles.stateView}>
                                <Text style={styles.stateText}>{this.props.data.state}</Text>
                            </View>
                        </View>
                        <Text style={styles.projectName} numberOfLines={0}>{this.props.data.xmmc}</Text>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.jcrmc}</Text>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.xmbh}</Text>
                        <Text style={[styles.textStyle, {flex:1}]}>{this.props.data.jcsj}</Text>
                        <TouchableOpacity onPress={this.props.setModalVisible}>
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
            component: RectifyTask,
            name: 'RectifyTask'
        });
        // else if (this.props.rowID == 1) {
        //     //审批页面
        //     this.props.navigator.push({
        //         component: ExamineAndApprove,
        //         name: 'ExamineAndApprove'
        //     });
        // } else if (this.props.rowID == 2) {
        //     //下达整改任务
        //     this.props.navigator.push({
        //         component: RectifyTask,
        //         name: 'RectifyTask'
        //     });
        // } else if (this.props.rowID == 3) {
        //
        // }
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
        paddingLeft: 10,
        paddingRight: 10
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingVertical: 16
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.1,
        alignItems: 'center',
    },
    projectName: {
        lineHeight: 21,
        paddingBottom: 15,
        fontSize: 14,
        color: '#3d3d3d'
    },
    textStyle: {
        color:'#4f74a3',
        fontSize: 14
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
    },
    editImg: {
        width: 22,
        height: 25,
        marginRight: 20
    }
});
