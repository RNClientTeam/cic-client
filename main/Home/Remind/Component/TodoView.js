/**
 * Created by Nealyang on 2017/4/30.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const {width}  = Dimensions.get('window');
import OptionCell from '../../Backlog/Component/OptionCell';
const optionCells = [
    {name:'前期进度计划执行',src:require('../../../../resource/imgs/home/backlog/frontPlan.png'),badge:2},
    {name:'工程子项拆分',src:require('../../../../resource/imgs/home/backlog/projectSplit.png'),badge:21},
    {name:'工程范围交接',src:require('../../../../resource/imgs/home/backlog/projectConnect.png')},
    {name:'实施进度计划',src:require('../../../../resource/imgs/home/backlog/toDoPlan.png')},
    {name:'施工进度计划编制',src:require('../../../../resource/imgs/home/backlog/toDoPlanEdit.png'),badge:0},
    {name:'施工进度计划执行',src:require('../../../../resource/imgs/home/backlog/todoTodo.png'),badge:20},
    {name:'施工日计划',src:require('../../../../resource/imgs/home/backlog/constructDayPlan.png')},
    {name:'部门计划编制',src:require('../../../../resource/imgs/home/backlog/departmentPlan.png'),badge:100},
    {name:'部门计划执行',src:require('../../../../resource/imgs/home/backlog/departmentPlanTodo.png')},
    {name:'质量检查计划',src:require('../../../../resource/imgs/home/backlog/qualityInspectionPlan.png'),badge:20},
    {name:'质量检查记录',src:require('../../../../resource/imgs/home/backlog/qualityInspectionRecord.png')},
    {name:'安全检查计划',src:require('../../../../resource/imgs/home/backlog/safetyInspectPlan.png')},
    {name:'安全检查记录',src:require('../../../../resource/imgs/home/backlog/safetyInspectRecord.png')},
    {name:'公文管理',src:require('../../../../resource/imgs/home/backlog/documentManage.png'),badge:12},
    {name:'考勤管理',src:require('../../../../resource/imgs/home/backlog/checkInManage.png')},
    {name:'办公用品',src:require('../../../../resource/imgs/home/backlog/office.png')},
    {name:'资源计划',src:require('../../../../resource/imgs/home/backlog/resourcePlan.png')},
    {name:'工作计划',src:require('../../../../resource/imgs/home/backlog/workPlan.png')},
    {name:'项目收款',src:require('../../../../resource/imgs/home/backlog/getMoney.png'),badge:999},
    {name:'项目核算',src:require('../../../../resource/imgs/home/backlog/projectCheck.png')},
];
export default class TodoView extends Component{
    render() {
        return (
            <ScrollView>
                <View style={styles.todoView}>
                    {this.renderOptionCell()}
                </View>
            </ScrollView>
        )
    }


    renderOptionCell(){
        let optionCell = [];
        for(let i = 0;i<optionCells.length;i++){
            optionCell.push(
                <OptionCell
                    badge={optionCells[i].badge?optionCells[i].badge:0}
                    src={optionCells[i].src}
                    name={optionCells[i].name}
                    key={i}
                />
            )
        }
        return optionCell
    }

}

const styles = StyleSheet.create({
    todoView:{
        width: width,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
