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
    Image,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import Calendar from "../Component/Calendar";
import QualityCheckPlanHeader from "./Component/QualityCheckPlanHeader";
import QualityCheckPlanList from "./Component/QualityCheckPlanList";
import QualityCheckFiltrate from "./Component/QualityCheckFiltrate";
import QualityCheckModal from "./Component/QualityCheckModal";
import toast from 'react-native-simple-toast';
import Loading from "../../../Component/Loading";
import AddOrEditQualityCheck from "./AddOrEditQualityCehck"
import {padStart} from '../../../Util/Util'
const {width}  = Dimensions.get('window');

export default class QualityCheckPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            day:new Date().getDate(),
            filtrate:false,
            modalVisible:false,
            calendarState:[],
            rwxz:'请选择任务性质',
            rwzt:'请选择任务状态',
            pageNum:1,
            rwxzid:'all',
            rwztid:'all',
            isLoading:false,
            dataSource:[],
            keywords: '',
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查计划">
                    {this.state.addZljcjh &&
                        <TouchableWithoutFeedback
                            onPress={()=> this.add()}>
                            <Image style={{width: 0.04 * width, height: 0.04 * width,position:'absolute',right:width*0.15}}
                                   source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                        </TouchableWithoutFeedback>
                    }
                    <TouchableOpacity onPress={()=>{this.setState({filtrate:!this.state.filtrate})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckPlanHeader
                    changeDate={this.changeYearAndMonth.bind(this)}
                    showDate={this.state.showDate}
                    setToday={() => this.setToday()}
                />
                <Calendar
                    changeDay={(day)=>this.changeDay(day)}
                    day={this.state.day}
                    year={this.state.year}
                    month={this.state.month}
                    data={this.state.calendarState}
                />
                <QualityCheckPlanList dataSource={this.state.dataSource}
                                      reload={(resolve)=>this.getTask(1,resolve)}
                                      loadMore={this.loadMore.bind(this)}
                                      navigator={this.props.navigator}
                                      showModal={(jhrwId, cfxxId) => this.setModalVisible(jhrwId, cfxxId)}/>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <QualityCheckModal
                        navigator={this.props.navigator}
                        jhrwId={this.state.jhrwId}
                        cfxxId={this.state.cfxxId}
                        authority={this.state.authority}
                        reloadInfo={() =>
                            this.getTask()
                        }
                        closeModal={() => {this.setState({modalVisible: false})
                    }}/>
                </Modal>
                {this.state.filtrate?<QualityCheckFiltrate
                    rwztId={this.state.rwztid}
                    rwxzId={this.state.rwxzid}
                    rwzt={this.state.rwzt}
                    rwxz={this.state.rwxz}
                    closeFiltrate={(zt,xz,ztCode,xzCode)=>this.filterData(zt,xz,ztCode,xzCode)}/>:null}
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    setModalVisible(jhrwId, cfxxId) {
        this.getAuthority(jhrwId, () => {
            this.setState(
                {
                    modalVisible: true,
                    jhrwId,
                    cfxxId,
                }
            );
        });
    }

    getAuthority(id, callBack = () => {}) {
        axios.get('/psmZljcjh/getOperationAuthority4Zljcjh', {
            params: {
                userID: GLOBAL_USERID,
                zlcjhId: id,
                callID: true,
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                const authority = responseData.data;
                if (authority.updateZljcjh || authority.deleteZljcjh || authority.effectZljcjh) {
                    this.setState({
                        authority
                    });
                    callBack();
                } else {
                    toast.show('没有操作权限!');
                }
            } else {
                toast.show(responseData.message);
            }
        }).catch((err) => {
            toast.show('服务端异常!');
        })
    }

    //过滤
    filterData(zt,xz,ztCode,xzCode){
        this.setState({filtrate:false});
        this.setState({
            rwzt:zt,
            rwxz:xz,
            rwztid:ztCode,
            rwxzid:xzCode
        },function () {
            this.getTask();
            this.getCalendarData();
        })
    }

    //判断是否为闰年,是则返回1，否则返回0
    isLeap(year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

    // 选择日期
    changeYearAndMonth(data){
        const showDate = new Date(this.formatDate(data.substr(0,4), parseInt(data.substr(-2,data.length-1)), 1));
        let days_per_month = new Array(31, 28 + this.isLeap(data.substr(0,4)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //创建月份数组
        let day = this.state.day;
        if(this.state.day>days_per_month[parseInt(data.substr(-2,data.length-1))-1]){
            day=days_per_month[parseInt(data.substr(-2,data.length-1))-1]
        }
        this.setState({
            year: data.substr(0,4),
            month: parseInt(data.substr(-2,data.length-1))-1,
            showDate,
            day
        },function () {
            this.getTask();
            this.getCalendarData();
        })
    }

    // 点击某一天
    changeDay(day){
        this.setState({
            day:day
        },function () {
            this.getTask()
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
            this.getCalendarData();
        })
    }

    componentDidMount() {
        this.getAddAuthority();
        this.getCalendarData();
        this.getTask()
    }

    // 获取新增权限
    getAddAuthority() {
        axios.get('/psmZljcjh/operationAuthority4ZljcjhAdd',{
            params:{
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            if (data.data.addZljcjh) {
                this.setState({
                    addZljcjh: true,
                })
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    };

    // 跳转新增页面
    add() {
        this.props.navigator.push({
            name: "AddOrEditQualityCheck",
            component: AddOrEditQualityCheck,
            params:{
                flag:'add',
                reload: this.getTask.bind(this)
            }
        })
    }

    getCalendarData(){
        axios.get('/psmZljcjh/calendar4Zljcjh',{
            params:{
                userID:GLOBAL_USERID,
                month:this.state.year+'-'+padStart(this.state.month + 1),
                rwzt:this.state.rwztid,
                rwxz:this.state.rwxzid,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                this.setState({
                    calendarState:data.data.list
                })
            }else{
                toast.show(data.message)
            }
        }).catch(() => {
            toast.show('服务端异常');
        })
    }

    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            this.getTask(this.state.pageNum);
        })
    }

    formatDate(year, month, day) {
        return `${year}-${padStart(month)}-${padStart(day)}`
    }

    getTask(pageNum=1,resolve=()=>{}) {
        this.setState({isLoading:true});
        axios.get('/psmZljcjh/list',{
            params:{
                userID:GLOBAL_USERID,
                date:this.state.year + '-' + padStart(this.state.month + 1 )+'-'+padStart(this.state.day),
                rwzt:this.state.rwztid,
                rwxz:this.state.rwxzid,
                pageNum:pageNum,
                pageSize:10,
                keywords: this.state.keywords,
                callID:true
            }
        }).then(data=>{
            this.setState({isLoading:false,pageNum:pageNum});
            resolve();
            if(data.code ===1){
                if(pageNum===1){
                    this.setState({
                        dataSource:data.data.list
                    })
                }else{
                    for(let i = 0;i<data.data.list.length;i++){
                        this.state.dataSource.push(data.data.list[i]);
                    }
                    this.setState({
                        dataSource:this.state.dataSource
                    })
                }
                return data.data.list.length > 0
            } else {
                toast.show(data.message);
                return false
            }
        }).catch(()=>{
            this.setState({isLoading:false});
            toast.show('服务端异常');
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
