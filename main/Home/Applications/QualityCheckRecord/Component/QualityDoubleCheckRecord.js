/**
 * Created by zhubin on 17/6/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import StatusBar from "../../../../Component/StatusBar"
import DoubleCheckDetail from "./DoubleCheckDetail"
import DoubleCheckModification from './DoubleCheckModification'
import DoubleCheckRecord from './DoubleCheckRecord'
import AddModification from "./AddModification";
import toast from 'react-native-simple-toast'

const {width} = Dimensions.get('window');

export default class QualityDoubleCheckRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addIcon: false,
            canAdd:false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录复查">
                    {
                        (this.state.addIcon && this.state.canAdd)?
                        <TouchableOpacity
                            onPress={() => this.addModification()}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/add.png')}/>
                        </TouchableOpacity>:null
                    }
                </StatusBar>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    onChangeTab={(obj) => {
                        this.setState({addIcon:obj.i===1?true:false});
                    }}
                    initialPage={this.props.initialPage||0}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="white">
                    <DoubleCheckDetail
                        data={this.props.data}
                        tabLabel="检查记录"
                        check={this.props.check}
                        navigator={this.props.navigator}
                        fromList={this.props.fromList}
                        reloadInfo={this.props.reloadInfo}/>
                    <DoubleCheckModification
                        id={this.props.data.id}
                        nodeId={this.props.data.nodeId}
                        data={this.props.data}
                        tabLabel="整改任务"
                        navigator={this.props.navigator}/>
                    <DoubleCheckRecord
                        tabLabel="复查"
                        navigator={this.props.navigator}
                        data={this.props.data}
                        reloadInfo={this.props.reloadInfo}/>
                </ScrollableTabView>
            </View>
        )
    }
    addModification() {
        this.props.navigator.push({
            name:"AddModification",
            component:AddModification,
            params:{
                id:this.props.data.id,
                nodeId:this.props.data.nodeId,
                reload:this.props.reload
            }
        })
    }

    componentDidMount() {
        axios.get('/psmZljcjl/getOperationAuthority4Zljcjl',{
            params:{
                userID:GLOBAL_USERID,
                stepId:this.props.data.nodeId,
                isTodo:this.props.data.sfdb,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                this.setState({
                    canAdd:data.data.checkAndaddZgrw
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width:width*0.04,
        height:width*0.04,
        marginHorizontal:10
    }
});
