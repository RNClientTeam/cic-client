/**
 * Created by fan on 2017/4/30.
 * 首页应用列表
 */
"use strict"
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    SectionList,
    StyleSheet,
    Dimensions
} from 'react-native';

var {width, height}  = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar.js';
import EarlierStage from './EarlierStage/EarlierStage.js';
var commonlyApp = [
    {title:'前期进度计划执行', image: require('../../../resource/imgs/home/applications/scheduleExecution.png')},
    {title:'工程子项拆分', image: require('../../../resource/imgs/home/applications/engineeringSubdivision.png')},
    {title:'工程范围交接', image: require('../../../resource/imgs/home/applications/engineeringTransfer.png')}
];
var businessApp = [
    {title:'前期进度计划执行', image: require('../../../resource/imgs/home/applications/scheduleExecution.png')},
    {title:'工程子项拆分', image: require('../../../resource/imgs/home/applications/engineeringSubdivision.png')},
    {title:'工程范围交接', image: require('../../../resource/imgs/home/applications/engineeringTransfer.png')},
    {title:'实施进度计划', image: require('../../../resource/imgs/home/applications/implementationSchedule.png')},
    {title:'施工进度计划编制', image: require('../../../resource/imgs/home/applications/schedulePlanning.png')},
    {title:'施工进度计划执行', image: require('../../../resource/imgs/home/applications/executionConstruction.png')},
    {title:'施工日计划', image: require('../../../resource/imgs/home/applications/dailyPlan.png')},
    {title:'部门计划编制', image: require('../../../resource/imgs/home/applications/departmentalPlanning.png')},
    {title:'部门计划执行', image: require('../../../resource/imgs/home/applications/departmentPlanExecution.png')},
    {title:'质量检查计划', image: require('../../../resource/imgs/home/applications/qualityInspectionPlan.png')},
    {title:'质量检查记录', image: require('../../../resource/imgs/home/applications/qualityInspectionRecord.png')},
    {title:'安全检查计划', image: require('../../../resource/imgs/home/applications/inspectionPlan.png')},
    {title:'安全检查记录', image: require('../../../resource/imgs/home/applications/inspectionRecord.png')}
];
var tradingApp = [
    {title:'物资采购', image: require('../../../resource/imgs/home/applications/materialPurchasing.png')},
    {title:'项目成本', image: require('../../../resource/imgs/home/applications/projectCost.png')},
    {title:'项目收款', image: require('../../../resource/imgs/home/applications/projectPayment.png')},
    {title:'项目核算', image: require('../../../resource/imgs/home/applications/projectAccounting.png')}
];
var officialApp = [
    {title:'工作计划', image: require('../../../resource/imgs/home/applications/workPlane.png')},
    {title:'考勤', image: require('../../../resource/imgs/home/applications/attendance.png')},
    {title:'办公用品', image: require('../../../resource/imgs/home/applications/officeSupplies.png')}
];
var otherApp = [
    {title:'派车申请', image: require('../../../resource/imgs/home/applications/applyFor.png')}
];
var imgDown = require('../../../resource/imgs/home/applications/down.png');
var imgLeft = require('../../../resource/imgs/user/push_in.png');

export default class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonlyApp: commonlyApp,
            businessApp: businessApp,
            tradingApp: tradingApp,
            officialApp: officialApp,
            otherApp: otherApp,
            imgSource: imgDown
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title='应用' navigator={this.props.navigator}>
                    <TouchableOpacity onPress={this.toolsOnPress.bind(this)}>
                        <Image source={require('../../../resource/imgs/home/applications/setting.png')}
                            style={styles.appImgSty}/>
                    </TouchableOpacity>
                </StatusBar>
                <SectionList
                    renderItem={({item}) => this.renderItem(item)}
                    renderSectionHeader={({section}) => this.renderSectionHeader(section)}
                    SectionSeparatorComponent={()=>this.sectionSeparator()}
                    keyExtractor={(item, index)=>this.keyExtractor(item,index)}
                    sections={[
                        {data:[this.state.commonlyApp], key:'常用应用'},
                        {data:[this.state.businessApp], key:'业务类应用'},
                        {data:[this.state.tradingApp], key:'商务类应用'},
                        {data:[this.state.officialApp], key:'办公类应用'},
                        {data:[this.state.otherApp], key:'其他应用'}
                    ]}/>
            </View>
        );
    }

    renderItem(item) {
        return (
            <View style={styles.list}>
                {
                    item.map((item, i) => this.renderExpenseItem(item, i))
                }
            </View>
        );
    }

    renderExpenseItem(item, i) {
        return (
            <TouchableOpacity onPress={this.itemPress.bind(this, item, i)} key={i+item.title}>
                <View style={styles.itemStyle}>
                    <Image source={item.image} style={styles.itemImg}/>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
            </TouchableOpacity>

        );
    }

    itemPress(item, index) {
        if(item.title === '前期进度计划执行') {
            this.props.navigator.push({
                component: EarlierStage,
                name: 'EarlierStage'
            });
        }
    }

    //分组头
    renderSectionHeader(section) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{section.key}</Text>
                <TouchableOpacity onPress={this.sectionOnPress.bind(this,section.key)}>
                    <View style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                        <Image source={this.state.imgSource}
                            style={{width:15,height:15}} resizeMode="contain"/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    //每个分组的分割线
    sectionSeparator() {
        return (
            <View style={styles.separator}/>
        );
    }

    keyExtractor(item, index) {
        return item.title+index;
    }

    //点击头部右按钮
    toolsOnPress() {

    }

    //点击分组
    sectionOnPress(sectionTitle) {
        if (sectionTitle === '常用应用') {
            this.setState({commonlyApp: this.state.commonlyApp.length !== 0 ? [] : commonlyApp});
        } else if (sectionTitle === '业务类应用') {
            this.setState({businessApp: this.state.businessApp.length !== 0 ? [] : businessApp});
        } else if (sectionTitle === '商务类应用') {
            this.setState({tradingApp: this.state.tradingApp.length !== 0 ? [] : tradingApp});
        } else if (sectionTitle === '办公类应用') {
            this.setState({officialApp: this.state.officialApp.length !== 0 ? [] : officialApp});
        } else {
            this.setState({otherApp: this.state.otherApp.length !== 0 ? [] : otherApp});
        }
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor:'#fff'
    },
    appImgSty: {
        width: 0.05 * width,
        height: 0.05 * width,
        marginRight: 5
    },
    separator: {
        width: width,
        height: 12,
        backgroundColor:'#f2f2f2'
    },
    sectionHeader: {
        width: width,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemStyle: {
        width: width / 3,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionText: {
        fontSize: 13,
        color: '#3d3d3d'
    },
    itemText: {
        marginTop: 10,
        fontSize: 10,
        color: '#3d3d3d'
    },
    itemImg: {
        width: 43,
        height: 43
    }
});
