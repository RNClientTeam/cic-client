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
import Toast from 'react-native-simple-toast';
export default class SafetyInspectionListCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color:'#216fd0',fontSize:width*0.045, width:width*0.7}} numberOfLines={2}>{this.props.data.aqjcjhmc}</Text>
                            <View style={[styles.stateView, (this.props.data.ztmc==='新建'||this.props.data.ztmc==='新建任务')&&{backgroundColor:'#18d0ca'}]}>
                                <Text style={styles.stateText} numberOfLines={1}>{this.props.data.ztmc}</Text>
                            </View>
                        </View>
                        <Text style={styles.projectName} numberOfLines={0}>{this.props.data.xmmc} - {this.props.data.zxmc}</Text>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.jcrmc}</Text>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.xmbh}</Text>
                        <Text style={[styles.textStyle, {flex:1}]}>{this.props.data.jcsj}</Text>
                        <TouchableOpacity onPress={this.authBtn.bind(this)}>
                            <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                                style={styles.editImg} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    authBtn() {
        axios.get('/psmAqjcjh/getOperationAuthority4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                stepId: this.props.data.stepId,
                isTodo: this.props.data.isTodo,
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.props.setModalVisible(res.data, this.props.data);
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    skipPage() {
        this.props.navigator.push({
            component: RectifyTask,
            name: 'RectifyTask',
            params: {
                data: this.props.data,
                fromList: true,
                reloadInfo: this.props.reloadInfo
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
        alignItems: 'center'
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
        borderRadius:3,
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03
    },
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
