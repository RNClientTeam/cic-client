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

export default class RectifyTask extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="下达整改任务" navigator={this.props.navigator}/>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2,width:0.248*width,marginLeft:0.122*width}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="#fff">
                    <CheckRecord tabLabel='检查记录' navigator={this.props.navigator}/>
                    <CheckRecord tabLabel='整改任务' navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    }
})
