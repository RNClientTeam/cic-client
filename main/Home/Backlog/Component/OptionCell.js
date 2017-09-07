/**
 * Created by Nealyang on 2017/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

const {width} = Dimensions.get('window');
import IconBadge from 'react-native-icon-badge'
import ArticleApproval from '../../Applications/ArticleApproval/ArticleApproval'
import EarlierStage from "../../Applications/EarlierStage/EarlierStage";
import Organization from "../../../Organization/Organization";
import ProjectSubitemSplit from "../../Applications/ProjectSubitemSplit/ProjectSubitemSplit";
import ProjectRangeHandover from "../../Applications/ProjectRangeHandover/ProjectRangeHandover";
import Ssjdjh from "../../Applications/Ssjdjh/Ssjdjh";
import ConstructionProgressPlan from '../../Applications/ConstructionProgressPlan/ProgressPlan'
import ApartmentPlane from '../../Applications/ApartmentPlane/ApartmentPlane.js';
import SafetyInspectionPlan from '../../Applications/SafetyInspectionPlan/SafetyInspectionPlan.js';
import SafetyInspectionRecord from '../../Applications/SafetyInspectionRecord/SafetyInspectionRecord.js';
import ConstructPlan from "../../Applications/ConstructPlan/ConstructPlan"
import ProgressExecute from '../../Applications/ConstructProgressExecute/ProgressExecute'
import QualityCheckPlan from "../../Applications/QualityCheckPlan/QualityCheckPlan";
import QualityCheckRecord from "../../Applications/QualityCheckRecord/QualityCheckRecord";

export default class OptionCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.containerStyle} onPress={() => this.skipPage()}>
                {(this.props.badge && this.props.badge > 0) ?
                    <IconBadge
                        MainElement={
                            <View style={styles.imgTextView}>
                                <Image style={styles.imgStyle}
                                       source={this.props.src}/>
                                <Text style={styles.text}>{this.props.name}</Text>
                            </View>
                        }
                        BadgeElement={
                            <Text
                                style={[{color: '#FFFFFF'}, this.props.badge.toString().length > 2 ? {fontSize: width * 0.022} : {fontSize: width * 0.03}]}>{this.props.badge}</Text>
                        }

                        IconBadgeStyle={
                            {
                                width: width * 0.055,
                                height: width * 0.055,
                                backgroundColor: '#f34353',
                            }
                        }
                    /> :
                    <View style={styles.imgTextView}>
                        <Image style={styles.imgStyle}
                               source={this.props.src}/>
                        <Text style={styles.text}>{this.props.name}</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    getInfo(pmid, name) {
        console.log(pmid, name)
    }

    skipPage() {
        switch (this.props.name) {
            case '公文管理':
                this.props.navigator.push({
                    name: 'ArticleApproval',
                    component: ArticleApproval
                });
                break;
            case '前期进度计划执行':
                if(this.props.resource === '提醒'){
                    this.props.navigator.push({
                        name: 'EarlierStage',
                        component: EarlierStage
                    });
                }else{
                    this.props.navigator.push({
                        name: 'EarlierStage',
                        component: EarlierStage,
                        params: {
                            tag: 'todo'
                        }
                    });
                }

                break;
            case '工程子项拆分':
                this.props.navigator.push({
                    name: 'ProjectSubitemSplit',
                    component: ProjectSubitemSplit
                });
                break;
            case '工程范围交接':
                this.props.navigator.push({
                    name: 'ProjectRangeHandover',
                    component: ProjectRangeHandover
                });
                break;
            case '实施进度计划执行':
                this.props.navigator.push({
                    name: 'Ssjdjh',
                    component: Ssjdjh
                });
                break;
            case '施工进度计划编制':
                this.props.navigator.push({
                    name: 'ConstructionProgressPlan',
                    component: ConstructionProgressPlan
                });
                break;
            case '施工进度计划执行':
                this.props.navigator.push({
                    name: 'ProgressExecute',
                    component: ProgressExecute
                });
                break;
            case '施工日计划':
                this.props.navigator.push({
                    name: 'ConstructPlan',
                    component: ConstructPlan
                });
                break;
            case '部门计划编制':
                this.props.navigator.push({
                    name: 'ApartmentPlane',
                    component: ApartmentPlane
                });
                break;
            case '部门计划':
                this.props.navigator.push({
                    name: 'ApartmentPlane',
                    component: ApartmentPlane
                });
                break;
            case '质量检查计划':
                this.props.navigator.push({
                    name: 'QualityCheckPlan',
                    component: QualityCheckPlan
                });
                break;
            case '质量检查记录':
                this.props.navigator.push({
                    name: 'QualityCheckRecord',
                    component: QualityCheckRecord
                });
                break;
            case '安全检查计划':
                this.props.navigator.push({
                    name: 'SafetyInspectionPlan',
                    component: SafetyInspectionPlan
                });
                break;
            case '安全检查记录':
                this.props.navigator.push({
                    name: 'SafetyInspectionRecord',
                    component: SafetyInspectionRecord
                });
                break;

        }
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: width / 3,
        borderColor: '#dbdbdb',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        height: width * 0.23,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgTextView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3.6,
        height: width * 0.2
    },
    imgStyle: {
        width: width * 0.09,
        height: width * 0.09,
        marginBottom: width * 0.01
    },
    text: {
        color: '#333',
        fontSize: width * 0.028
    }
});