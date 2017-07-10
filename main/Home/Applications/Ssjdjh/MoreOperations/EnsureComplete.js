/**
 * Created by Nealyang on 2017/5/3.
 * 确认完成
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TaskProfile from "./Component/TaskProfile"
import ExecuteProfile from "./Component/ExecuteProfile"
import Modification from "./Component/Modification"
import toast from 'react-native-simple-toast'

const {width}  = Dimensions.get('window');

export default class EnsureComplete extends Component{

    constructor(props){
        super(props);
        this.state={
            rwgk:{},
            zxqk:[],
            yqbgqk:[],
            rybgqk:[]
        }
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="确认完成"/>
                <ScrollableTabView locked={true}
                                   tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                                   tabBarActiveTextColor='#51a5f0'
                                   tabBarInactiveTextColor='#3d3d3d'>
                    <TaskProfile submit={this.affirmComplete.bind(this)} data={this.state.rwgk} tabLabel='任务概况' />
                    <ExecuteProfile submit={()=>this.affirmComplete()} data={this.state.zxqk} tabLabel='执行概况' />
                    <Modification submit={()=>this.affirmComplete()} tag="延期" data={this.state.yqbgqk} tabLabel='延期变更' />
                    <Modification submit={()=>this.affirmComplete()} tag="人员" data={this.state.rybgqk} tabLabel='人员变更' />
                </ScrollableTabView>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmSsjdjh/preQrwcqk',{
            params:{
                userID:GLOBAL_USERID,
                rwid:this.props.rwid,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                this.setState({
                    rwgk:data.data.rwgk,
                    zxqk:data.data.zxqk,
                    yqbgqk:data.data.yqbgqk,
                    rybgqk:data.data.rybgqk
                })
            }else{
                toast.show(dasta.message);
            }
        }).catch(err=>{
            if(err) toast.show('服务端连接错误');
        })
    }

    affirmComplete(){
        axios.post('/psmSsjdjh/qrwcqk',{
            userID:GLOBAL_USERID,
            rwid:this.props.rwid,
            callID:true
        }).then(data=>{
            if(data.code === 1){
                toast.show('提交成功!');
                const that = this;
                setTimeout(function () {
                    that.props.navigator.pop();
                },1000)
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            if(err) toast.show('服务端错误');
        })
    }

    componentWillUnmount() {
        this.props.reloadInfo();
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#fdfdfd',
        flex:1
    }
});
