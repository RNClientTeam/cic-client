/**
 * Created by Nealyang on 2017/4/30.
 * 我发送的
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const {width}  = Dimensions.get('window');
import OptionCell from './OptionCell';
import toast from 'react-native-simple-toast'
let optionCells = [];
export default class SendView extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.isendView}>
                    {this.renderOptionCell()}
                </View>
            </ScrollView>
        )
    }

    renderOptionCell(){
        let optionCell = [];
        for(let i = 0;i<this.state.dataSource.length;i++){
            optionCell.push(
                <OptionCell
                    badge={optionCells[i].badge?optionCells[i].badge:0}
                    src={optionCells[i].src}
                    name={optionCells[i].name}
                    navigator={this.props.navigator}
                    key={i}
                />
            )
        }
        return optionCell
    }
    componentDidMount() {
        this.props.showLoading();
        optionCells = [];
        axios.get('/todo/list4spz',{
            params:{
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            this.props.hideLoading();
            if(data.code ===1){
                for(let i in data.data){
                    if(i === 'P0301'){
                        optionCells.push({name:'前期进度计划执行',src:require('../../../../resource/imgs/home/backlog/frontPlan.png'),badge:data.data[i]})
                    }else if(i==='P0302'){
                        optionCells.push({name:'工程子项拆分',src:require('../../../../resource/imgs/home/backlog/projectSplit.png'),badge:data.data[i]})
                    }else if(i==='P0303'){
                        optionCells.push({name:'工程范围交接',src:require('../../../../resource/imgs/home/backlog/projectSplit.png'),badge:data.data[i]})
                    }else if(i==='P0304'){
                        optionCells.push({name:'实施进度计划',src:require('../../../../resource/imgs/home/backlog/toDoPlan.png'),badge:data.data[i]})
                    }else if(i==='P0305'){
                        optionCells.push({name:'施工进度计划编制',src:require('../../../../resource/imgs/home/backlog/toDoPlanEdit.png'),badge:data.data[i]})
                    }else if(i==='P0306'){
                        optionCells.push({name:'施工进度计划执行',src:require('../../../../resource/imgs/home/backlog/todoTodo.png'),badge:data.data[i]})
                    }else if(i==='P0307'){
                        optionCells.push({name:'施工日计划',src:require('../../../../resource/imgs/home/backlog/constructDayPlan.png'),badge:data.data[i]})
                    }else if(i==='P0308'){
                        optionCells.push({name:'部门计划编制',src:require('../../../../resource/imgs/home/backlog/departmentPlan.png'),badge:data.data[i]})
                    }else if(i==='P0309'){
                        optionCells.push({name:'部门计划执行',src:require('../../../../resource/imgs/home/backlog/departmentPlanTodo.png'),badge:data.data[i]})
                    }else if(i==='P0310'){
                        optionCells.push({name:'质量检查计划',src:require('../../../../resource/imgs/home/backlog/qualityInspectionPlan.png'),badge:data.data[i]})
                    }else if(i==='P0311'){
                        optionCells.push({name:'质量检查记录',src:require('../../../../resource/imgs/home/backlog/qualityInspectionRecord.png'),badge:data.data[i]})
                    }else if(i==='P0312'){
                        optionCells.push({name:'安全检查计划',src:require('../../../../resource/imgs/home/backlog/safetyInspectPlan.png'),badge:data.data[i]})
                    }else if(i==='P0313'){
                        optionCells.push({name:'安全检查记录',src:require('../../../../resource/imgs/home/backlog/safetyInspectRecord.png'),badge:data.data[i]})
                    }else if(i==='P04'){
                        optionCells.push({name:'公文管理',src:require('../../../../resource/imgs/home/backlog/documentManage.png'),badge:data.data[i]})
                    }else if(i==='P05'){
                        optionCells.push({name:'工作计划',src:require('../../../../resource/imgs/home/backlog/workPlan.png'),badge:data.data[i]})
                    }else if(i==='P06'){
                        optionCells.push({name:'考勤管理',src:require('../../../../resource/imgs/home/backlog/checkInManage.png'),badge:data.data[i]})
                    }else if(i==='P07'){
                        optionCells.push({name:'办公用品',src:require('../../../../resource/imgs/home/backlog/office.png'),badge:data.data[i]})
                    }else if(i==='P08'){
                        optionCells.push({name:'资源计划',src:require('../../../../resource/imgs/home/backlog/resourcePlan.png'),badge:data.data[i]})
                    }else if(i==='P09'){
                        optionCells.push({name:'项目收款',src:require('../../../../resource/imgs/home/backlog/getMoney.png'),badge:data.data[i]})
                    } else if(i==='P10'){
                        optionCells.push({name:'项目核算',src:require('../../../../resource/imgs/home/backlog/projectCheck.png'),badge:data.data[i]})
                    }
                }
                this.setState({
                    dataSource:optionCells
                });
            }else{
                toast.show(data.message);
            }
        }).catch((err)=>{
            this.props.hideLoading();
            toast.show('服务端错误！');
        })
    }
}

const styles = StyleSheet.create({
    isendView: {
        width: width,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});