/**
 * Created by zhubin on 17/5/30.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import StatusBar from "../../../../Component/StatusBar"
import ModificationCheckRecord from './ModificationCheckRecord'
import ModificationTask from './ModificationTask'

export default class QualityCheckRecordModification extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="项目安全检查记录审核"/>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="white">
                    <ModificationCheckRecord tabLabel="检查记录" navigator={this.props.navigator}/>
                    <ModificationTask tabLabel="整改任务" navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});