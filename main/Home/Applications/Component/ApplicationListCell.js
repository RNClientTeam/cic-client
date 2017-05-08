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
import ProjectRangeHandoverDetail from "../ProjectRangeHandover/Component/ProjectRangeHandoverDetail";

const {width} = Dimensions.get('window');

export default class EarlierStageListCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color: '#216fd0', fontSize: width * 0.045}}>{this.props.data.number}</Text>
                            {this.props.stateBg ?
                                <View style={[styles.stateView, {backgroundColor: this.props.stateBg}]}>
                                    <Text style={styles.stateText}>{this.props.data.state}</Text>
                                </View> :
                                <View style={[styles.stateView]}>
                                    <Text style={styles.stateText}>{this.props.data.state}</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.projectName}>
                            <Text>{this.props.data.planName}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>{this.props.data.contentNum}</Text>
                                <Text style={{color: '#999', fontSize: width * 0.05}}> > </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.principal}</Text>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.department}</Text>
                        <Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.schedule}</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        switch (this.props.target) {
            case 'EarlierStageDetail':
                this.props.navigator.push({
                    component: EarlierStageDetail,
                    name: 'EarlierStageDetail'
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
        height: width * 0.2,
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
        height: width * 0.1,
        alignItems: 'center'
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color: '#4f74a3'
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