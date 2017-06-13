/**
 * Created by Nealyang on 2017/4/30.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import EarlierStageDetail from "../EarlierStage/Component/EarlierStageDetail";
import ProgressPlanDetail from "../ConstructionProgressPlan/Component/ProgressPlanDetail"
import ProjectSubitemSplitDetail from "../ProjectSubitemSplit/Component/ProjectSubitemSplitDetail"
import ProjectRangeHandoverDetail from "../ProjectRangeHandover/Component/ProjectRangeHandoverDetail"
import ProgressExecuteDetail from "../ConstructProgressExecute/Component/ProgressExecuteDetail"

const {width} = Dimensions.get('window');

export default class EarlierStageListCell extends Component {
    constructor(props){
        super(props);
        this.state={
            xmbh:'',//项目编号
            xmmc:'',//项目名称
            state:'',//项目状态
            fzr:'',//负责人
            bm:'',//部门
            bfb:'',//百分比
            sjd:'',//时间段
            count:''
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color: '#216fd0', fontSize: width * 0.045}}>{this.state.xmbh}</Text>
                            {this.props.stateBg ?
                                <View style={[styles.stateView, {backgroundColor: this.props.stateBg}]}>
                                    <Text style={styles.stateText}>{this.state.state}</Text>
                                </View> :
                                <View style={[styles.stateView]}>
                                    <Text style={styles.stateText}>{this.state.state}</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.projectName}>
                            <Text style={{width:width*0.85,lineHeight:parseInt(width*0.05)}}>{this.state.xmmc}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>{this.state.count}</Text>
                                <Text style={{color: '#999', fontSize: width * 0.05}}> > </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.state.fzr}</Text>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.state.bm}</Text>
                        <Text style={[{width: width * 0.5,paddingLeft:width*0.04}, styles.textStyle]}>{this.state.bfb}%</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.state.sjd}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    componentWillReceiveProps(props) {
        switch (props.target){
            case 'EarlierStageDetail':
                this.setState({
                    xmbh:props.data.xmbh,//项目编号
                    xmmc:props.data.xmmc,//项目名称
                    state:props.data.ztmc,//项目状态
                    fzr:props.data.xmjl,//负责人
                    bm:props.data.tbdw,//部门
                    bfb:props.data.wcbl,//百分比
                    sjd:props.data.sDate+'-'+this.props.data.eDate,//时间段
                    count:props.data.count
                });
                break;
        }
    }

    skipPage() {
        switch (this.props.target) {
            case 'EarlierStageDetail':
                this.props.navigator.push({
                    component: EarlierStageDetail,
                    name: 'EarlierStageDetail',
                    params:{
                        xmbh:this.props.data.xmbh,
                        jhxxId:this.props.data.jhxxId,
                        wcbl:this.props.data.wcbl,
                        xmmc:this.props.data.xmmc,
                        sDate:this.props.data.sDate,
                        eDate:this.props.data.eDate
                    }
                });
                break;
            case 'ProgressPlanDetail':
                this.props.navigator.push({
                    component: ProgressPlanDetail,
                    name: 'ProgressPlanDetail'
                });
                break;
            case 'ProjectSubitemSplitDetail':
                this.props.navigator.push({
                    component: ProjectSubitemSplitDetail,
                    name: 'ProjectSubitemSplitDetail',
                    params: {proName: this.props.data.planName, proNum: this.props.data.number}
                });
                break;
            case 'ProjectRangeHandoverDetail':
                this.props.navigator.push({
                    component: ProjectRangeHandoverDetail,
                    name: 'ProjectRangeHandoverDetail',
                    params: {
                        proName: this.props.data.planName,
                        proNum: this.props.data.number,
                        proState:this.props.data.state,
                        stateBg:this.props.stateBg
                    }
                });
                break;
            case 'ProgressExecuteDetail':
                this.props.navigator.push({
                    component: ProgressExecuteDetail,
                    name: 'ProgressExecuteDetail'
                });
                break;
        }
    }
}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        minHeight: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.1,
        alignItems: 'center',
    },
    projectName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: width * 0.1,
        alignItems: 'center',
        paddingTop:width*0.01,
        paddingBottom:width*0.01
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color: '#4f74a3',
    },
    stateView: {
        backgroundColor: '#fe9a25',
        width: width * 0.17,
        height: width * 0.05,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03}


});
