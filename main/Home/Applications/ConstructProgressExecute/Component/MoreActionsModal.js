/**
 * Created by zhubin on 17/5/12.
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
import CompletionForm from './CompletionForm'
import CompletionConfirm from './CompletionConfirm'
import YanqiBG from './YanqiBGSQ.js';
import FinishedPath from './FinishedPath'
const {width} = Dimensions.get('window');

export default class MoreActionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let dataArr = [];
        if(this.props.auth.workflow){
            dataArr.push({img:require('../../../../../resource/imgs/home/earlierStage/workflow.png'),name:'查看已完成流程步骤'})
        }
        if(this.props.auth.rybg){
            dataArr.push({img:require('../../../../../resource/imgs/home/earlierStage/peopleChange.png'),name:'人员变更'})
        }
        if(this.props.auth.yqbg){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png'),name:'延期变更申请'}
            );
        }
        if(this.props.auth.tbwcqk){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),name:'填报完成情况'}
            );
        }
        if(this.props.auth.qrwcqk){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'确认完成'}
            );
        }
        if(this.props.auth.tbzzxqk){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'填报总执行情况'}
            );
        }
        if (this.props.auth.start) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                name: '恢复'
            });
        }
        if (this.props.auth.stop) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/stopAction.png'),
                name: '暂停'
            });
        }
        this.setState({data:dataArr});
    }
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.container}>
                    {this.renderCell()}
                </View>
            </TouchableOpacity>
        )
    }

    renderCell() {
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <TouchableOpacity onPress={this.confirm.bind(this, this.state.data[i])} key={i}>
                    <View style={styles.actionRow}>
                        <Image style={styles.img} source={this.state.data[i].img}/>
                        <Text>{this.state.data[i].name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return cs;
    }

    confirm(dataSource) {
        if(dataSource.name === '延期变更申请'){
            this.props.navigator.push({
                name:'YanqiBG',
                component:YanqiBG,
                params: {
                    rwid: this.props.sgrwId,
                    gczxId:this.props.gczxId,
                    reloadInfo:this.props.reloadInfo,
                    exchangeRwid:this.props.exchangeRwid
                }
            });
        } else if(dataSource.name === '填报完成情况'){
            this.props.navigator.push({
                name:'CompletionForm',
                component:CompletionForm,
                params:{
                    rwid:this.props.sgrwId,
                    gczxId:this.props.gczxId,
                    reloadInfo:this.props.reloadInfo
                }
            });
        }else if(dataSource.name === '确认完成'){
            this.props.navigator.push({
                name:'CompletionConfirm',
                component:CompletionConfirm,
                params:{
                    rwid:this.props.sgrwId,
                    reloadInfo:this.props.reloadInfo
                }
            });
        }else if(dataSource.name === '查看已完成流程步骤'){
            this.props.navigator.push({
                name:'CompletionConfirm',
                component:FinishedPath,
                params:{
                    resID:this.props.sgrwId,
                    wfName:'sgphrwyqbg'
                }
            });
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
        height: 0.12 * width,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    button:{
        width:width*0.29,
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    img: {
        width:width * 0.08,
        height:width * 0.08,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});
