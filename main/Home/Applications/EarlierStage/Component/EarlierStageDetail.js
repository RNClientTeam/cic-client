"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import StatusBar from '../../../../Component/StatusBar.js';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CooperateTask from "./CooperateTask";
import ShareData from "./ShareData";
import General from './General.js';
import SchedulePlan from './ScheduledPlan.js';
import TotalImplementation from './TotalImplementation.js';
var {width, height} = Dimensions.get('window');

export default class EarlierStageDetail extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="前期进度计划执行" navigator={this.props.navigator}>
                </StatusBar>
                <Image style={styles.bgImage}
                    source={require('../../../../../resource/imgs/home/earlierStage/backgroundImg.png')}>
                    <Text style={styles.number}>{this.props.xmbh}</Text>
                    <Text style={styles.engineerName} >{this.props.xmmc}</Text>
                    <Text style={styles.dateSty}>日期：{this.props.sjd}</Text>
                    <View style={styles.progressView}>
                        <View style={styles.backView}>
                            <View style={[styles.forgroundView,{width: 0.72 * this.props.wcbl/100 * width}]}>
                            </View>
                        </View>
                        <Text style={styles.percentText}>{this.props.wcbl}%</Text>
                    </View>
                </Image>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <General xmbh={this.props.xmbh} tabLabel='概况'/>
                    <SchedulePlan xmbh={this.props.xmbh} jhxxId={this.props.jhxxId} tabLabel='进度计划' navigator={this.props.navigator}/>
                    <CooperateTask navigator={this.props.navigator} tabLabel='配合任务' jhxxId={this.props.jhxxId}/>
                    <TotalImplementation navigator={this.props.navigator} tabLabel='总执行情况' jhxxId={this.props.jhxxId}></TotalImplementation>
                    <ShareData navigator={this.props.navigator} xmbh={this.props.xmbh} jhxxId={this.props.jhxxId} tabLabel='共享资料'/>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    bgImage: {
        width: width,
        height: 0.2249 * height,
        paddingLeft: 30
    },
    number: {
        color: 'white',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 0.03 * height,
        marginBottom: 0.0165 * height
    },
    engineerName: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
        marginBottom: 0.03 * height,
    },
    dateSty: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 12,
    },
    progressView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0.0165 * height
    },
    backView: {
        width: 0.72 * width,
        height: 12,
        marginRight: 20,
        backgroundColor: '#9eccfb'
    },
    percentText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    forgroundView: {
        height: 12,
        backgroundColor: '#ffb432'
    }
});
