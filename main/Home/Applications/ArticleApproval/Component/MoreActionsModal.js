/**
 * Created by zhubin on 17/5/15.
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
import ArticleDetail from './ArticleDetail'
import CheckFlowInfo from "../../SafetyInspectionRecord/Component/CheckFlowInfo";
import ArticleFinishedPath from "./ArticleFinishedPath";
import PDFView from "../../EarlierStage/Component/PDFView";
import ArticlePDFView from "./ArticlePDFView";

const {width} = Dimensions.get('window');
import toast from 'react-native-simple-toast'
export default class MoreActionsModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.operateMethod('预览文件')}}>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/backlog/articleApproval/review.png')}/>
                            <Text>预览文件</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        this.props.operatingItem.dsp == 'true'?
                            <TouchableOpacity onPress={() => {this.operateMethod('提交审核')}}>
                                <View style={styles.actionRow} >
                                    <Image style={styles.img}
                                           source={require('../../../../../resource/imgs/home/backlog/articleApproval/approval.png')}/>
                                    <Text>提交审核</Text>
                                </View>
                            </TouchableOpacity>:
                            null
                    }

                    <TouchableOpacity onPress={() => {this.operateMethod('查看流程')}}>
                        <View style={styles.actionRow} >
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/earlierStage/workflow.png')}/>
                            <Text>查看流程</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }


    operateMethod(tag) {
        if(tag === '预览文件'){
            if(this.props.operatingItem.fj.substring(this.props.operatingItem.fj.lastIndexOf('.'),this.props.operatingItem.length)!=='.pdf'){
                toast.show('仅支持pdf预览')
            }else{
                this.props.navigator.push({
                    name:'ArticlePDFView',
                    component:ArticlePDFView,
                    params:{
                        url:this.props.operatingItem.fj
                    }
                })
            }

        }else if(tag === '提交审核'){
            this.props.navigator.push({
                name:"CheckFlowInfo",
                component:CheckFlowInfo,
                params:{
                    resID:this.props.operatingItem.id,
                    wfName:'cicosgw'
                }
            })
        }else if(tag === '查看流程'){
            this.props.navigator.push({
                name:'',
                component:ArticleFinishedPath,
                params:{
                    resID:this.props.operatingItem.id,
                    wfName:'cicosgw'
                }
            })
        }
        this.props.closeModal();
    }

}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end'
    },
    container: {
        backgroundColor: 'white'
    },
    actionRow: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        paddingTop: 0.02 * width,
        paddingBottom: 0.02 * width,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    img: {
        width: width * 0.1,
        height: width * 0.1,
        marginLeft: width*0.02,
        marginRight: width*0.06
    }
});