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

const {width}  = Dimensions.get('window');

export default class EnsureComplete extends Component{
    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="确认完成"/>
                <ScrollableTabView locked={true}
                                   tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                                   tabBarActiveTextColor='#51a5f0'
                                   tabBarInactiveTextColor='#3d3d3d'>
                    <TaskProfile tabLabel='任务概况' />
                    <ExecuteProfile tabLabel='执行概况' />
                    <Modification tabLabel='变更概况' />
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#fdfdfd',
        flex:1
    }
});
