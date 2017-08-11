"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import StatusBar from '../../../../Component/StatusBar.js';
import CheckRecord from './CheckRecord.js';
import ReformTask from './ReformTask.js';
import ReviewRecord from './ReviewRecord.js';
import AccomplishProgress from "./AccomplishProgress";
import toast from 'react-native-simple-toast'

export default class RectifyTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addIcon: props.initialPage==1?true:false,
            canAdd:false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="安全检查记录" navigator={this.props.navigator}>
                    {
                        this.state.addIcon&&this.state.canAdd?
                            <TouchableOpacity
                                onPress={() => this.addModification()}>
                                <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/add.png')}/>
                            </TouchableOpacity>:null

                    }
                </StatusBar>
                <ScrollableTabView
                    initialPage={this.props.initialPage||0}
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2, width:width*0.25,marginLeft:width*0.04}}
                    onChangeTab={(obj) => {
                        this.setState({addIcon:obj.i===1?true:false});
                    }}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="#fff">
                    <CheckRecord tabLabel='检查记录'
                        navigator={this.props.navigator}
                        data={this.props.data}
                        fromList={this.props.fromList}
                        add={this.props.add}
                        check={this.props.check}
                        reloadInfo={this.props.reloadInfo}
                        edit={this.props.edit}/>
                    <ReformTask tabLabel='整改任务'
                        navigator={this.props.navigator}
                        item={this.props.data}
                        reloadInfo={this.props.reloadInfo}
                        tbzgqk={this.props.tbzgqk}
                        fromList={this.props.fromList}
                        checkAndZgrw={this.props.checkAndZgrw}/>
                    <ReviewRecord tabLabel="复查记录"
                        navigator={this.props.navigator}
                        data={this.props.data}
                        reloadInfo={this.props.reloadInfo}
                        fromList={this.props.fromList}
                        fcjl={this.props.fcjl}/>
                </ScrollableTabView>
            </View>
        );
    }

    componentDidMount() {
        if (this.props.fromList || this.props.tbzgqk || this.props.checkAndZgrw) {
            axios.get('/psmAqjcjh/getOperationAuthority4Aqjcjl',{
                params:{
                    userID:GLOBAL_USERID,
                    stepId:this.props.data.stepId,
                    isTodo:this.props.data.isTodo,
                    callID:true
                }
            }).then(data=>{
                if(data.code === 1){
                    this.setState({
                        canAdd:data.data.checkAndaddZgrw
                    })
                }else{
                    toast.show(data.message);
                }
            }).catch(err=>{
                toast.show('服务端异常');
            });
        }
    }

    addModification() {
        this.props.navigator.push({
            name:"AccomplishProgress",
            component:AccomplishProgress,
            params:{
                type:'新建',
                aqjcjlId:this.props.data.aqjcjlId
            }
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    icon: {
        width: 0.04*width,
        height: 0.04*width
    }
});
