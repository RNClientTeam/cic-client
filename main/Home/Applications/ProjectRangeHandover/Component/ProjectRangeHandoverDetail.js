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
const {width}  = Dimensions.get('window');

export default class ProjectRangeHandoverDetail extends Component{
    render(){
        return(
            <View style={styles.projectSubitemSplitDetail}>
                <StatusBar navigator={this.props.navigator} title={this.props.proName}/>
                <ScrollableTabView
                    tabBarBackgroundColor='#fff'
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <ProjectRangeHandoverInfo proName={this.props.proName} proNum={this.props.proNum} proState={this.props.proState} stateBg={this.props.stateBg} tabLabel='详情'/>
                    <ProjectRangeHandoverDetailList navigator={this.props.navigator} proName={this.props.proName} proNum={this.props.proNum} tabLabel='工程子项'/>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    projectSubitemSplitDetail:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});