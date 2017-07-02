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

import MyPlanDetail from './MyPlanDetail'

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
            name: 'MyPlanDetail'
        });
    }

    update(id) {
        this.props.closeModal();
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail',
            params: {
                id
            }
        });
    }

    delete(rwid) {
        console.log('rwid', this.props.rwid);
        axios.post('/psmSgjdjh/deleteSgjhJhrw', {
            userID: GLOBAL_USERID,
            id: rwid,
        }).then(() => {
            console.log('success!')
        });
    }

    effect(rwid) {
        axios.post('/psmSgjdjh/updateStatusToEffect', {
            userID: GLOBAL_USERID,
            id: rwid,
        }).then(() => {
            console.log('success!')
        });
    }

    componentDidMount() {
        let actionList = [];
        actionList.push(
            {
                img: require('../../../../../resource/imgs/home/applications/createItem.png'),
                name: '新建',
                action: () => this.create()
            }
        );
        actionList.push(
            {
                img: require('../../../../../resource/imgs/home/applications/modification.png'),
                name: '修改',
                action: () => this.update(this.props.rwid)
            }
        );
        actionList.push(
            {
                img: require('../../../../../resource/imgs/home/applications/approvalIcon.png'),
                name: '提交审核',
                action: () => this.approval(this.props.rwid)
            }
        );
        actionList.push(
            {
                img: require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                name: '生效',
                action: () => this.effect(this.props.rwid)
            }
        );
        actionList.push(
            {
                img: require('../../../../../resource/imgs/home/applications/stopAction.png'),
                name: '删除',
                action: () => this.delete(this.props.rwid)
            }
        );
        this.setState({
            actionList: actionList
        })
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
        width:width * 0.1,
        height:width * 0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});