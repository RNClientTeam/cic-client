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
const {width}  = Dimensions.get('window');

export default class ProjectSubitemSplitDetail extends Component{
    render(){
        return(
            <View>
                <StatusBar navigator={this.props.navigator} title="工程子项拆分详情"/>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <View tabLabel='详情'>
                        <Text>2</Text>
                    </View>
                    <View tabLabel='工程子项'>
                        <Text>3</Text>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});