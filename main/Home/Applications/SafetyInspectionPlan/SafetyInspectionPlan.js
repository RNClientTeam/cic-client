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
    Text,
    Modal
} from 'react-native'
import StatusBar from '../../../Component/StatusBar.js';
import SafetyInspectionList from './Component/SafetyInspectionList.js';
import ModalView from "./Component/ModalView.js";
import toast from 'react-native-simple-toast';
import Calendar from "../Component/Calendar";
import QualityCheckPlanHeader from "./Component/QualityCheckPlanHeader";

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
            rwzt: 0,
            pageNum: 1,
            date: this.formatDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate()),
        }
    }

    componentDidMount() {
        this.getCalendarData();
        this.getList();
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查计划">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckPlanHeader
                    showDate={this.state.showDate}
                    changeDate={this.changeYearAndMonth.bind(this)}
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
                />
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
            rwzt = 0,
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
            console.log('data-------', responseData);
            callBack();
            if (pageNum === 1) {
                responseData = {
                    "code": 1,
                    "data": {
                        "total": 2,
                        "data": [
                            {
                                "jhjssj": "2017-03-29",
                                "count": 0,
                                "aqjcjhmc": "现场检查",
                                "xmmc": "北京化工大学昌平新校区永久用电",
                                "RN": 1,
                                "isTodo": 0,
                                "sgrwmc": "高低压设备进场",
                                "zrbm": "安全管理部",
                                "id": "8a8180d85b0561b0015b0d83d0cd375b",
                                "jhkssj": "2017-03-28",
                                "gczxmc": "2-2分配配电工程",
                                "zrr": "时永强",
                                "gczxId": "8a8180d857adaa600157b282e9dd70d2",
                                "zt": 100,
                                "ztmc": "已生效",
                                "xmbh": "CX_DS14136-16080"
                            },
                            {
                                "jhjssj": "2017-03-28",
                                "count": 0,
                                "aqjcjhmc": "现场检查",
                                "xmmc": "友谊医院配电室改造项目",
                                "RN": 2,
                                "isTodo": 0,
                                "sgrwmc": "配电室二楼重新装修",
                                "zrbm": "安全管理部",
                                "id": "8a8180d85b0561b0015b0d870deb38a3",
                                "jhkssj": "2017-03-28",
                                "gczxmc": "新建机房及配电室装修",
                                "zrr": "宗永进",
                                "gczxId": "8a8180d858bb00d30158bef9775b74ec",
                                "zt": 100,
                                "ztmc": "已生效",
                                "xmbh": "CX_DS15128-16085"
                            }
                        ]
                    },
                    "message": "成功"
                }
            }
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

    closeModal(type, jhlx, rwzt) {
        this.setState({isModalVisible:false});
        if (type === 1) {
            this.setState({
                jhlx,
                rwzt
            });
        }
        this.getList();
    }

    // 点击某一天
    changeDay(day){
        console.log('------day', day);
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
        return `${year}-${(month + '').padStart(2, '0')}-${(day + '').padStart(2, '0')}`
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
                month:this.state.year+'-'+(this.state.month+1),
                callID:true
            }
        }).then(data=>{
            console.log('-----getCalendarData', data);
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
