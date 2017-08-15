/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import ConstructPlanHeader from "./Component/ConstructPlanHeader";
import Calendar from "../Component/Calendar";
import DayProjectListContainer from "./Component/DayProjectListContainer";
import ProjectListView from "./ProjectListView";
import NewProject from "./NewProject";
const {width}  = Dimensions.get('window');
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";
import {padStart} from '../../../Util/Util'
export default class ConstructPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            day:new Date().getDate(),
            lx:'全部',//0全部，1我的
            zxid:'',//子项ids
            rwlx:0,
            calendarState:[],
            isLoading:false,
            taskList:[],
            canEdit:false
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工日计划">
                    {this.state.canEdit&&
                    <TouchableWithoutFeedback onPress={()=>this.props.navigator.push({name:'NewProject',component:NewProject,params:{reload:()=>{this.getDataFronNet();this.getTask()}}})}>
                        <Image style={{width: 0.045 * width, height: 0.045 * width,position:'absolute',right:width*0.16}}
                               source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableWithoutFeedback>
                        }
                    <TouchableOpacity onPress={()=>{this.skipPage()}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/constuctPlan/projectList.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <ConstructPlanHeader
                    changeRange={this.changeRange.bind(this)}
                    range={this.state.lx}
                    changeDate={this.changeYearAndMonth.bind(this)}
                    showDate={this.state.showDate}
                    setToday={() => this.setToday()}
                />
                <Calendar changeDay={(day)=>this.changeDay(day)} day={this.state.day} data={this.state.calendarState} year={this.state.year} month={this.state.month}/>
                <DayProjectListContainer
                    reload={()=>{this.getDataFronNet();this.getTask()}}
                    dataSource={this.state.taskList}
                    navigator={this.props.navigator}/>
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    showLoading(){
        this.setState({
            isLoading:true
        })
    }

    hideLoading(){
        this.setState({
            isLoading:false
        })
    }

    //判断是否为闰年,是则返回1，否则返回0
    isLeap(year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

    changeYearAndMonth(data){
        const showDate = new Date(this.formatDate(data.substr(0,4), parseInt(data.substr(-2,data.length-1)), 1));
        let days_per_month = new Array(31, 28 + this.isLeap(data.substr(0,4)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //创建月份数组
        let day = this.state.day;
        if(this.state.day>days_per_month[parseInt(data.substr(-2,data.length-1))-1]){
            day=days_per_month[parseInt(data.substr(-2,data.length-1))-1]
        }
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1,
            showDate,
            day
        },function () {
            this.getTask();
            this.getDataFronNet()
        })
    }
    skipPage(){
        this.props.navigator.push({
            name:'ProjectListView',
            component:ProjectListView,
            params:{
                setZxid:(arr)=>{this.setZxid(arr)},
                zxid:this.state.zxid
            }
        })
    }

    changeDay(day){
        this.setState({
            day:day
        },function () {
            this.getTask()
        })
    }

    changeRange(txt){
        this.setState({
            lx:txt
        },function () {
            this.getTask()
        })
    }

    setZxid(arr){
        this.setState({
            zxid:arr.join(',')
        },function () {
            this.getDataFronNet();
        })
    }

    // 选择今日
    setToday() {
        const today = new Date();
        this.setState({
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            showDate: today,
        }, function () {
            this.getTask();
            this.getDataFronNet();
        })
    }

    formatDate(year, month, day) {
        return `${year}-${padStart(month)}-${padStart(day)}`
    }

    componentDidMount() {
        this.getDataFronNet();
        this.getTask();
        axios.get('/psmSgrjh/getOperationAuthority4SgrjhCreate',{
            params:{
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            console.log(data,1111);
            if(data.code === 1){
                this.setState({
                    canEdit:data.data.newcreate
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }

    getDataFronNet(){
        let lx = 0;
        this.showLoading();
        if(this.state.lx === '我的'){
            lx=1;
        }
        axios.get('/psmSgrjh/calendar4rjh',{
            params:{
                userID:GLOBAL_USERID,
                month:this.state.year+'-'+padStart(this.state.month + 1),
                zxid:this.state.zxid,
                rwlx:this.state.rwlx,
                lx:lx,
                callID:true
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code === 1){
                this.setState({
                    calendarState:data.data
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            this.hideLoading()
        })
    }

//    任务列表
    getTask(){
        this.showLoading();
        let lx = 0;
        if(this.state.lx === '我的'){
            lx=1;
        }
        axios.get('/psmSgrjh/list4Rjh',{
            params:{
                userID:GLOBAL_USERID,
                date:this.state.year+'-'+padStart(this.state.month+1)+'-'+padStart(this.state.day),
                zxid:this.state.zxid,
                rwlx:0,
                lx:lx,
                callID:true
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code === 1){
                this.setState({
                    taskList:data.data.list
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            this.hideLoading();
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});