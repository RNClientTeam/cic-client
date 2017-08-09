/**
 * Created by fan on 2017/05/16.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Modal
} from 'react-native'
import StatusBar from '../../../Component/StatusBar.js';
import SafetyInspectionList from './Component/SafetyInspectionList.js';
import ModalView from "./Component/ModalView.js";
import toast from 'react-native-simple-toast';
import Calendar from "../Component/Calendar";
import QualityCheckPlanHeader from "./Component/QualityCheckPlanHeader";
import {padStart} from '../../../Util/Util'
import SafetyCheckPlanModal from "./Component/SafetyCheckPlanModal";
import EditSafetyCheck from './Component/EditSafetyCheck';

const {width}  = Dimensions.get('window');
export default class SafetyInspectionPlane extends Component{
    constructor(props){
        super(props);
        this.date = new Date();
        this.state={
            isModalVisible:false,
            modalVisible: false,
            dataSource: [],
            year: this.date.getFullYear(),//当前年份
            month: this.date.getMonth(),//当前月份
            day: this.date.getDate(),
            calendarState: [],
            jhlx: 300,
            rwzt: '',
            pageNum: 1,
            canAdd: false,
            date: this.formatDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate()),
        }
    }

    componentDidMount() {
        this.getCalendarData();
        this.getList();
        //增加按钮权限控制
        axios.get('/psmAqjcjh/operationAuthority4add',{
            params:{
                userID:GLOBAL_USERID,
                type:'addAqjcjh',
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                this.setState({
                    canAdd:data.data.addAqjcjh
                })
            }else{
                toast.show(data.message);
            }
        }).catch(err=>{
            toast.show('服务端异常');
        });
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查计划">
                    {this.state.canAdd &&
                        <TouchableWithoutFeedback
                            onPress={()=> this.add()}>
                            <Image style={{width: 0.04 * width, height: 0.04 * width,position:'absolute',right:width*0.15}}
                                   source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                        </TouchableWithoutFeedback>
                    }
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
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
                    data={this.state.calendarState}/>
                <SafetyInspectionList
                    navigator={this.props.navigator}
                    dataSource={this.state.dataSource}
                    loadMore={() => this.loadMore()}
                    total={this.state.total}
                    reload={(resolve)=>this.getList(1,resolve)}
                    setModalVisible={(id) => this.setModalVisible(id)}/>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setState({modalVisible: !this.state.modalVisible})}}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <SafetyCheckPlanModal
                        navigator={this.props.navigator}
                        closeModal={() => {
                            this.setState({modalVisible: false})
                        }}
                        id={this.state.id}
                        authority={this.state.authority}
                        reloadInfo={() => this.getList()} />
                </Modal>
                {this.state.isModalVisible &&
                    <ModalView
                        jhlx={this.state.jhlx}
                        rwzt={this.state.rwzt}
                        isModalVisible={this.state.isModalVisible}
                        closeModal={(type, jhlx, rwzt) => this.closeModal(type, jhlx, rwzt)}
                    />
                }
            </View>
        )
    }

    getList(pageNum = 1, callBack = () => {}) {
        const {
            jhlx = 300,
            rwzt = '',
        } = this.state;
        const date = this.formatDate(this.state.year, this.state.month + 1, this.state.day);

        axios.get('/psmAqjcjh/list4Aqjcjh', {
            params: {
                userID: GLOBAL_USERID,
                date,
                jhlx,
                rwzt,
                pageNum,
                pageSize: 10,
                callID: true,
            }
        }).then(responseData => {
            callBack();
            this.setState({
                isLoading: false
            });
            let tmp = [];
            if (responseData.code === 1) {
                if (pageNum === 1) {
                   this.setState({
                       dataSource: responseData.data.data,
                   })
                } else {
                    tmp = [...this.state.dataSource, ...responseData.data.data];
                    this.setState({
                        dataSource: tmp
                    })
                }
                this.setState({
                    total: responseData.data.total || 0,
                })
            } else {
                toast.show(responseData.message);
            }
        }).catch(err =>{
            this.setState({isLoading:false});
            toast.show('服务端异常');
        })
    }

    loadMore() {
        let pageNum = ++this.state.pageNum;
        this.getList(pageNum);
        this.setState({
            pageNum,
        });
    }

    setModalVisible(id) {
        this.getAuthority(id, () => {
            this.setState(
                {
                    modalVisible: true,
                    id,
                }
            );
        });
    }

    getAuthority(id, callBack = () => {}) {
        axios.get('/psmAqjcjh/getOperationAuthority4Aqjcjh', {
            params: {
                userID: GLOBAL_USERID,
                aqjcjhId: id,
                callID: true,
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                const authority = responseData.data;
                if (authority.updateAqjcjh || authority.deleteAqjcjh || authority.effectAqjcjh) {
                    this.setState({
                        authority
                    }, () => {
                        callBack();
                    });
                } else {
                    toast.show('没有操作权限!');
                }
            } else {
                toast.show(responseData.message);
            }
        }).catch(() => {
            toast.show('服务端异常!');
        })
    }

    closeModal(type, jhlx, rwzt) {
        this.setState({isModalVisible:false});
        if (type === 1) {
            this.setState({
                jhlx,
                rwzt
            }, () => {
                this.getList();
            });
        } else {
            this.setState({
                jhlx: 300,
                rwzt: '',
            }, () => {
                this.getList();
            });
        }
    }

    // 点击某一天
    changeDay(day){
        this.setState({
            day: day,
        },function () {
            this.getList()
        })
    }

    // 选择日期
    changeYearAndMonth(data){
        const showDate = new Date(this.formatDate(data.substr(0,4), parseInt(data.substr(-2,data.length-1)), 1));
        this.setState({
            year: data.substr(0,4),
            month: parseInt(data.substr(-2,data.length-1))-1,
            showDate,
        },function () {
            this.getList();
            this.getCalendarData();
        })
    }

    formatDate(year, month, day) {
        return `${year}-${padStart(month)}-${padStart(day)}`
    }

    setToday() {
        const today = new Date();
        this.setState({
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            showDate: today,
        }, function () {
            this.getList();
            this.getCalendarData();
        })
    }

    getCalendarData(){
        axios.get('/psmAqjcjh/calendarStatus4Aqjcjh',{
            params:{
                userID:GLOBAL_USERID,
                month:this.state.year + '-' + padStart(this.state.month + 1),
                callID:true
            }
        }).then(data=>{
            console.log(data);
            if(data.code === 1){
                this.setState({
                    calendarState:data.data.list
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }

    // 跳转到新增页面
    add() {
        this.props.navigator.push({
            name: 'EditSafetyCheck',
            component: EditSafetyCheck,
            params: {
                reloadInfo: () => this.getList(),
            }
        })
    }
}

const styles = StyleSheet.create({
    earlierStage:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});
