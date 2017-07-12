/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import Calendar from "../Component/Calendar";
import QualityCheckRecordHeader from "./Component/QualityCheckRecordHeader";
import QualityCheckRecordList from "./Component/QualityCheckRecordList";
import QualityCheckRecordFiltrate from "./Component/QualityCheckRecordFiltrate";
import QualityCheckModal from "./Component/QualityCheckModal";
import QualityCheckRecordDetail from "./Component/QualityCheckRecordDetail.js";
const {width}  = Dimensions.get('window');
import Loading from "../../../Component/Loading";
import toast from 'react-native-simple-toast'

export default class QualityCheckRecord extends Component{
    constructor(props){
        super(props);
        this.state = {
            year: new Date().getFullYear(),//当前年份
            month: new Date().getMonth(),//当前月份
            day: new Date().getDate(),
            selectRange: "mine",
            filtrate: false,
            modalVisible: false,
            type: '全部',
            rwzt: 'all',
            rwxz: 'all',
            rwztCn: '',
            rwxzCn: '',
            isLoading: false,
            calendarState: [],
            pageNum: 1,
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录">
                    <TouchableOpacity onPress={() => {
                        this.props.navigator.push({
                            component:QualityCheckRecordDetail,
                            name:'QualityCheckRecordDetail',
                        });
                    }}>
                        <Image style={{width:0.04*width,height:0.04*width,marginLeft:-width*0.04-10}} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({filtrate:!this.state.filtrate})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckRecordHeader changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar changeDay={(day) => this.changeDay(day)} day={this.state.day} data={this.state.calendarState}
                          year={this.state.year} month={this.state.month}/>
                <QualityCheckRecordList navigator={this.props.navigator}
                                        dataSource={this.state.dataSource}
                                        reload={(resolve)=>this.getData(1,resolve)}
                                        loadMore={this.loadMore.bind(this)}
                                        showModal={() => this.setState({modalVisible: true})}/>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <QualityCheckModal navigator={this.props.navigator} closeModal={() => {
                        this.setState({modalVisible: false})
                    }}/>
                </Modal>
                {this.state.filtrate ?
                    <QualityCheckRecordFiltrate
                        rwztCn={this.state.rwztCn}
                        rwxzCn={this.state.rwxzCn}
                        rwzt={this.state.rwzt}
                        rwxz={this.state.rwxz}
                        type={this.state.type}
                        closeFiltrate={() => this.setState({filtrate: false})}/> : null}
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    //点击某一天
    changeDay(day) {
        this.setState({
            day: day
        }, function () {
            this.getData()
        })
    }

    changeYearAndMonth(data) {
        this.setState({
            year: data.substr(0, 4),
            month: parseInt(data.substr(-2, data.length - 1)) - 1
        }, function () {
            this.getData();
        })
    }

    changeRange(txt) {
        this.setState({
            selectRange: txt
        })
    }

    componentDidMount() {
        this.getData()
    }

    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            this.getData(this.state.pageNum,()=>{})
        })
    }

    getData(pageNum = 1, resolve = () => {
    }) {
        this.getCalendar();
        this.getList(pageNum, resolve);
    }

    getCalendar() {
        this.setState({
            isLoading: true
        });
        let type = 'all';
        if (this.state.type === '我代办') {
            type = 'wdb'
        } else if (this.state.type === '我参与') {
            type = 'wcy'
        }
        axios.get('/psmZljcjl/calendar4Zljcjl', {
            params: {
                userID: GLOBAL_USERID,
                month: this.state.year + '-' + (this.state.month + 1),
                type: type,
                rwxz: this.state.rwxz,
                rwzt: this.state.rwzt,
                callID: true
            }
        }).then(data => {
            this.setState({
                isLoading: false
            });
            if (data.code === 1) {
                this.setState({
                    calendarState: data.data.list
                })
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
        })
    }

    getList(pageNum, resolve) {
        this.setState({
            isLoading: true
        });
        let type = 'all';
        if (this.state.type === '我代办') {
            type = 'wdb'
        } else if (this.state.type === '我参与') {
            type = 'wcy'
        }
        axios.get('/psmZljcjl/list', {
            params: {
                userID: GLOBAL_USERID,
                date: `${this.state.year}-${this.state.month + 1}-${this.state.day}`,
                type: type,
                rwxz: this.state.rwxz,
                rwzt: this.state.rwzt,
                pageNum: pageNum,
                pageSize: 10,
                callID: true
            }
        }).then(data => {
            resolve();
            if (data.code == 1) {
                // TODO
                data = {
                    "code": 1,
                    "data": {
                        "total": 5,
                        "list": [
                            {
                                "zxmc": "附属设施施工",
                                "xmgh": "JZ_JY15011-16004",
                                "xmmc": "规划九路电力沟道工程（注浆专业）",
                                "cjsj": "2017-06-08 16:54:43",
                                "jcsj": "2017-06-08 00:00:00",
                                "RN": 1,
                                "dqzt": 20,
                                "rwxz": 5,
                                "jcr": "刘栓",
                                "id": "8a8181a25c85d8dc015c86e9ba0f0135",
                                "gcjd": "设备厂验",
                                "dqztmc": "审批中",
                                "rwnr": "123",
                                "nodeId": "0",
                                "zxid": "8a8180d8573fd03c01574138cda03ded",
                                "sfxczg": 0,
                                "twzt": 100,
                                "sfdb": "0",
                                "cjr": "ZNDQ2053",
                                "wtlb": "设备问题,施工安装问题"
                            },

                        ]
                    },
                    "message": "成功"
                };
                if(data.data && data.data.list && data.data.list.length>0){
                    if(pageNum==1){
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
                    return true
                }else{
                    return false
                }
            }else{
                toast.show(data.message);
                return false
            }
        }).catch(err=>{
            toast.show('服务端异常');
            return false;
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});