/**
 * Created by Nealyang on 2017/5/5.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StatusBar from "../../../../Component/StatusBar";
import ProjectRangeHandoverInfo from "./ProjectRangeHandoverInfo";
import ProjectRangeHandoverDetailList from "./ProjectRangeHandoverDetailList";
// import ProjectSubitemSplitInfo from "./ProjectSubitemSplitInfo";
// import ProjectSubitemSplitDetailList from "./ProjectSubitemSplitDetailList";
import toast from 'react-native-simple-toast'
const {width}  = Dimensions.get('window');

export default class ProjectRangeHandoverDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            proName:'',
            ssbm:'',
            xmjl:'',
            jjzt:'',
            cfsj:'',
            xmbh:''
        }
    }
    render(){
        return(
            <View style={styles.projectSubitemSplitDetail}>
                <StatusBar navigator={this.props.navigator} title={this.state.proName}/>
                <ScrollableTabView
                    tabBarBackgroundColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <ProjectRangeHandoverInfo
                        xmbh={this.state.xmbh}
                        proName={this.state.proName}
                        proNum={this.state.proName}
                        ssbm={this.state.ssbm}
                        xmjl={this.state.xmjl}
                        jjzt={this.state.jjzt}
                        stateBg={this.props.stateBg}
                        cfsj={this.state.cfsj}
                        tabLabel='详情'/>
                    <ProjectRangeHandoverDetailList cfxxid={this.props.xmid}
                                                    navigator={this.props.navigator}
                                                    proName={this.props.proName}
                                                    proNum={this.props.proNum}
                                                    tabLabel='工程子项'/>
                </ScrollableTabView>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmGcfw/xmDetail',{
            params:{
                userID:GLOBAL_USERID,
                cfxxid:this.props.xmid,
                callID:true
            }
        }).then(responseData=>{
            if(responseData.code === 1){
                let data = responseData.data;
                this.setState({
                    proName:data.xmmc,
                    ssbm:data.ssdw,
                    xmjl:data.xmjl,
                    jjzt:data.gcfwjjztmc,
                    cfsj:data.cfsj,
                    xmbh:data.xmbh
                })
            }else{
                toast.show(responseData.message);
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    projectSubitemSplitDetail:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});