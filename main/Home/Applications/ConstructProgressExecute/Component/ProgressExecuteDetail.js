/**
 * Created by zhubin on 17/5/10.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import StatusBar from '../../../../Component/StatusBar'
import ProjectChildProfile from './ProjectChildProfile'

const {width, height} = Dimensions.get('window');

export default class ProgressExecuteDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划执行"/>
                <Image style={styles.bgImage}
                       source={require('../../../../../resource/imgs/home/earlierStage/backgroundImg.png')}>
                    <Text style={styles.number}>CX_DS14036-13238</Text>
                    <Text style={styles.engineerName}>人大技术学院配电增容改造技术咨询</Text>
                    <Text style={styles.dateSty}>日期：2017/01/15-2017/02/30</Text>
                    <View style={styles.progressView}>
                        <View style={styles.backView}>
                            <View style={styles.foregroundView}>
                            </View>
                        </View>
                        <Text style={styles.percentText}>80%</Text>
                    </View>
                </Image>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <ProjectChildProfile tabLabel="工程子项概况" navigator={this.props.navigator} />
                    <View tabLabel="施工计划" navigator={this.props.navigator} />
                    <View tabLabel="总执行情况" navigator={this.props.navigator} />
                    <View tabLabel="共享资料" navigator={this.props.navigator} />
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
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
        marginBottom: 0.03 * height
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
    foregroundView: {
        width: 0.72 * 0.8 * width,
        height: 12,
        backgroundColor: '#ffb432'
    }
});