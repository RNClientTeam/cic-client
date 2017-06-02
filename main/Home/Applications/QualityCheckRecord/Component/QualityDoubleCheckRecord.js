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

const {width} = Dimensions.get('window');

export default class QualityDoubleCheckRecord extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录复查">
                    <TouchableOpacity
                        onPress={() => this.addModification()}>
                        <Image style={[styles.icon]} source={require('../../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="white">
                    <DoubleCheckDetail tabLabel="检查记录" navigator={this.props.navigator}/>
                    <DoubleCheckModification tabLabel="整改任务" navigator={this.props.navigator}/>
                    <DoubleCheckRecord tabLabel="复查" navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View>
        )
    }
    addModification() {}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width:width*0.045,
        height:width*0.045
    }
});