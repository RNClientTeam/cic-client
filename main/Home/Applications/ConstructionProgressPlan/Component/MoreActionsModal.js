/**
 * Created by zhubin on 17/5/10.
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
import toast from 'react-native-simple-toast'
import MyPlanDetail from './MyPlanDetail'
import CheckFlowInfo  from '../../SafetyInspectionRecord/Component/CheckFlowInfo'
import FinishedPath from '../../SafetyInspectionRecord/Component/FinishedPath'

const {width} = Dimensions.get('window');

export default class MoreActionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionList: []
        }
    }
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.container}>
                    { this.renderActions(this.state.actionList) }
                    {/*{ this.state.actionList ? this.renderActions(this.state.actionList) : null}*/}
                </View>
            </TouchableOpacity>
        )
    }

    create() {
        this.props.closeModal();
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail',
            params:{
                reloadInfo:this.props.reloadInfo,
                gczxId: this.props.gczxId,
                cfxxId: this.props.cfxxId,
            }
        });
    }

    update(id) {
        this.props.closeModal();
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail',
            params: {
                id,
                reloadInfo:this.props.reloadInfo
            }
        });
    }

    delete(rwid) {
        axios.post('/psmSgjdjh/deleteSgjhJhrw', {
            userID: GLOBAL_USERID,
            id: rwid,
        }).then((data) => {
            if(data.code === 1){
                toast.show('删除成功');
                this.props.reloadInfo();
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        });
        this.props.closeModal();
    }

    approval(rwid) {
        this.props.navigator.push({
            name: "CheckFlowInfo",
            component: CheckFlowInfo,
            params:{
                resID: rwid,
                wfName:'sgjdjhbz',
                name: 'ProgressPlanDetail',
                reloadInfo:this.props.reloadInfo
            }
        });
        this.props.closeModal();
    }

    effect(rwid) {
        axios.post('/psmSgjdjh/updateStatusToEffect', {
            userID: GLOBAL_USERID,
            id: rwid,
        }).then((data) => {
            if(data.code === 1){
                toast.show('生效成功');
                this.props.reloadInfo();
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        });
        this.props.closeModal();
    }

    chakan(rwid){
        this.props.navigator.push({
            name: 'finishedPath',
            component: FinishedPath,
            params: {
                wfName: 'sgjdjhbz',
                resID: rwid
            }
        });
        this.props.closeModal();
    }

    componentDidMount() {
        let actionList = [];
        const authority = this.props.authority;
        console.log(authority);
        // 有创建权限
        if (authority) {
            if(authority.chakan){
                actionList.push(
                    {
                        img: require('../../../../../resource/imgs/home/earlierStage/workflow.png'),
                        name: '查看已完成步骤',
                        action: () => this.chakan(this.props.rwid)
                    }
                );
            }
            if (authority.updateSgrw) {
                actionList.push(
                    {
                        img: require('../../../../../resource/imgs/home/applications/modification.png'),
                        name: '修改',
                        action: () => this.update(this.props.rwid)
                    }
                );
            }
            if (authority.submit) {
                actionList.push(
                    {
                        img: require('../../../../../resource/imgs/home/applications/approvalIcon.png'),
                        name: '提交审核',
                        action: () => this.approval(this.props.rwid)
                    }
                );
            }
            if (authority.effectSgrw) {
                actionList.push(
                    {
                        img: require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                        name: '生效',
                        action: () => this.effect(this.props.rwid)
                    }
                );
            }
            if (authority.deleteSgrw) {
                actionList.push(
                    {
                        img: require('../../../../../resource/imgs/home/applications/stopAction.png'),
                        name: '删除',
                        action: () => this.delete(this.props.rwid)
                    }
                );
            }
            this.setState({
                actionList: actionList
            });
        }
    }

    renderActions(actionList) {
        return actionList.map((item, i) => {
            return (
                <TouchableOpacity key={i} onPress={ () => item.action() }>
                    <View style={styles.actionRow}>
                        <Image style={styles.img}
                               source={item.img}/>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
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
