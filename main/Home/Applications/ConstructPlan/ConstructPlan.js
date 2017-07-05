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
            taskList:[]
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工日计划">
                    <TouchableOpacity onPress={()=>this.props.navigator.push({name:'NewProject',component:NewProject})}>
                        <Image style={[styles.filtrate, {marginLeft:-width*0.045-10}]} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.skipPage()}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/constuctPlan/projectList.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <ConstructPlanHeader changeRange={this.changeRange.bind(this)} range={this.state.lx} changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar changeDay={(day)=>this.changeDay(day)} day={this.state.day} data={this.state.calendarState} year={this.state.year} month={this.state.month}/>
                <DayProjectListContainer dataSource={this.state.taskList} navigator={this.props.navigator}/>
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

    changeYearAndMonth(data){
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1
        },function () {
            this.getTask()
        })
    }
    skipPage(){
        this.props.navigator.push({
            name:'ProjectListView',
            component:ProjectListView
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

    componentDidMount() {
        this.getDataFronNet();
        this.getTask();
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
                month:this.state.year+'-'+(this.state.month+1),
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
                date:this.state.year+'-'+(this.state.month+1)+'-'+this.state.day,
                zxid:this.state.zxid,
                rwlx:0,
                lx:lx,
                callID:true
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code === 1){
                // TODO
                data = {
                    "code": 1,
                    "data": {
                        "list": [
                            {
                                "zxmc": "延庆开发区土地立项报告--延庆开发区子项2",
                                "zxid": "8a8180b858fc59750158fc6c16990071",
                                "listMap": [
                                    {
                                        "wcsj": "2016-12-20 17:30:00",
                                        "jhxxid": "8a8180b858fc59750158fc6c16990071",
                                        "rwid": "E2D5332781FA4CA6B39537296CDEF9F7",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "张廷柱_延庆质量任务2",
                                        "kssj": "2016-12-20 08:30:00",
                                        "jhrwid": "8a8180b858fc59750158fc786b3d0210",
                                        "wcbl": "0",
                                        "rwztmc": "开工",
                                        "rwzt": "1",
                                        "wcqk": ""
                                    },
                                    {
                                        "wcsj": "2016-12-20 17:30:00",
                                        "jhxxid": "8a8180b858fc59750158fc6c16990071",
                                        "rwid": "EAC1143CC9334EDF91765D441F3492F1",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "于文东_延庆施工任务1",
                                        "kssj": "2016-12-20 08:30:00",
                                        "jhrwid": "8a8180b858fc59750158fc774d3d0204",
                                        "wcbl": "0",
                                        "rwztmc": "开工",
                                        "rwzt": "1",
                                        "wcqk": ""
                                    },
                                    {
                                        "wcsj": "2016-12-20 17:30:00",
                                        "jhxxid": "8a8180b858dc0f0e0158dc430a8f00fd",
                                        "rwid": "23592E3B7A5149D9BBDA8305F39459B9",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "宋保悦_人大土建施工任务1",
                                        "kssj": "2016-12-20 08:30:00",
                                        "jhrwid": "8a8180b858dc0f0e0158dc7c1c6b02a1",
                                        "wcbl": "0",
                                        "rwztmc": "开工",
                                        "rwzt": "1",
                                        "wcqk": ""
                                    }
                                ]
                            },
                            {
                                "zxmc": "人大继续学院配电增容改造--人大土建子项",
                                "zxid": "8a8180b858dc0f0e0158dc430a8f00fd",
                                "listMap": [
                                    {
                                        "wcsj": "2016-12-20 17:30:00",
                                        "jhxxid": "8a8180b858dc0f0e0158dc430a8f00fd",
                                        "rwid": "53D1BF94464D4FA0808572177218D34A",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "宋保悦_人大土建施工任务2",
                                        "kssj": "2016-12-20 08:30:00",
                                        "jhrwid": "8a8180b858dc0f0e0158dc7cadc502a7",
                                        "wcbl": "0",
                                        "rwztmc": "开工",
                                        "rwzt": "1",
                                        "wcqk": ""
                                    },
                                    {
                                        "wcsj": "2016-12-20 17:30:00",
                                        "jhxxid": "8a8180b858dc0f0e0158dc430a8f00fd",
                                        "rwid": "23592E3B7A5149D9BBDA8305F39459B9",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "宋保悦_人大土建施工任务1",
                                        "kssj": "2016-12-20 08:30:00",
                                        "jhrwid": "8a8180b858dc0f0e0158dc7c1c6b02a1",
                                        "wcbl": "0",
                                        "rwztmc": "开工",
                                        "rwzt": "1",
                                        "wcqk": ""
                                    }
                                ]
                            },
                            {
                                "zxmc": "临时任务",
                                "zxid": "1",
                                "listMap": [
                                    {
                                        "wcsj": "2016-12-20 00:05:00",
                                        "jhxxid": "sgrz-lszx00001",
                                        "rwid": "C7583F101FD000024EB553606B8015AC",
                                        "zrr": "ZNDQ1933",
                                        "zrrmc": "张廷柱",
                                        "rwmc": "12121212",
                                        "kssj": "2016-12-20 00:00:00",
                                        "jhrwid": "sgrz-lsrw00001",
                                        "wcbl": "12",
                                        "rwztmc": "",
                                        "rwzt": "",
                                        "wcqk": "121212"
                                    }
                                ]
                            }
                        ]
                    },
                    "message": "成功"
                }
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