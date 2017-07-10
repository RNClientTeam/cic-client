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
import ConstructPlan from './ConstructPlan'
import ExecuteProfile from './ExecuteProfile'
import ShareFile from './ShareFile'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

const {width, height} = Dimensions.get('window');

export default class ProgressExecuteDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jdbl: props.rowData.jdbl
        }
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('进度计划执行详情刷新成功', (value) => {
            this.setState({jdbl: value.jdbl});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划执行"/>
                <Image style={styles.bgImage}
                       source={require('../../../../../resource/imgs/home/earlierStage/backgroundImg.png')}>
                    <Text style={styles.number}>{this.props.rowData.xmbh}</Text>
                    <Text style={styles.engineerName}>{this.props.rowData.xmmc}</Text>
                    <Text style={styles.dateSty}>{`日期：${this.props.rowData.jhkssj}/${this.props.rowData.jhjssj}`}</Text>
                    <View style={styles.progressView}>
                        <View style={styles.backView}>
                            <View style={[styles.foregroundView, {width:parseInt(this.state.jdbl+0)/100 * 0.72 * width}]}>
                            </View>
                        </View>
                        <Text style={styles.percentText}>{this.state.jdbl || '0'}%</Text>
                    </View>
                </Image>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'>
                    <ProjectChildProfile tabLabel="工程子项概况" navigator={this.props.navigator} rowData={this.props.rowData}/>
                    <ConstructPlan tabLabel="施工计划" navigator={this.props.navigator} rowData={this.props.rowData}/>
                    <ExecuteProfile tabLabel="总执行情况" navigator={this.props.navigator} rowData={this.props.rowData}/>
                    <ShareFile tabLabel="共享资料" navigator={this.props.navigator} rowData={this.props.rowData}/>
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
        height: 12,
        backgroundColor: '#ffb432'
    }
});
