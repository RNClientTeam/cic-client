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
    Modal,
    TouchableWithoutFeedback
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import Calendar from "../Component/Calendar";
import QualityCheckRecordHeader from "./Component/QualityCheckRecordHeader";
import QualityCheckRecordList from "./Component/QualityCheckRecordList";
import QualityCheckRecordFiltrate from "./Component/QualityCheckRecordFiltrate";
import QualityCheckModal from "./Component/QualityCheckModal";
import Loading from "../../../Component/Loading";
import toast from 'react-native-simple-toast';
import {padStart} from '../../../Util/Util';
import QualityCheckRecordDetail from './Component/QualityCheckRecordDetail.js';
const {width} = Dimensions.get('window');

export default class QualityCheckRecord extends Component {
    constructor(props) {
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
            dataSource: [],
            auth: {},
            data: {}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录">
                    <TouchableWithoutFeedback onPress={this.addBtn.bind(this)}>
                        <Image style={{width: 0.045 * width, height: 0.045 * width,position:'absolute',right:width*0.16}}
                               source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => {this.setState({filtrate: !this.state.filtrate})}}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckRecordHeader
                    showDate={this.state.showDate}
                    setToday={() => this.setToday()}
                    changeDate={this.changeYearAndMonth.bind(this)}
                />
                <Calendar changeDay={(day) => this.changeDay(day)} day={this.state.day} data={this.state.calendarState}
                          year={this.state.year} month={this.state.month}/>
                <QualityCheckRecordList navigator={this.props.navigator}
                                        dataSource={this.state.dataSource}
                                        reloadInfo={(resolve) => this.getData(1, resolve)}
                                        loadMore={this.loadMore.bind(this)}
                                        showModal={(auth, data) => {
                                            let tempAuth = false;
                                            for (var key in auth) {
                                                if (auth[key] && !tempAuth) {
                                                    tempAuth = true;
                                                }
                                            }
                                            if (tempAuth) {
                                                this.setState({
                                                    modalVisible: true,
                                                    auth: auth,
                                                    data: data
                                                });
                                            } else {
                                                toast.show('没有相关权限');
                                            }
                                        }}/>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <QualityCheckModal navigator={this.props.navigator}
                                       closeModal={() => {
                                           this.setState({modalVisible: false})
                                       }}
                                       auth={this.state.auth}
                                       data={this.state.data}
                                       reloadInfo={() => {
                                           this.getData()
                                       }}/>
                </Modal>
                {this.state.filtrate ?
                    <QualityCheckRecordFiltrate
                        rwztCn={this.state.rwztCn}
                        rwxzCn={this.state.rwxzCn}
                        rwzt={this.state.rwzt}
                        rwxz={this.state.rwxz}
                        type={this.state.type}
                        closeFiltrate={(tag, type, zt, xz, ztCode, xzCode) => this.filterData(tag, type, zt, xz, ztCode, xzCode)}/> : null}
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    addBtn() {
        this.props.navigator.push({
            component: QualityCheckRecordDetail,
            name: 'QualityCheckRecordDetail',
            params: {
                reloadInfo: this.getData.bind(this)
            }
        });
    }

    //过滤
    filterData(tag, type, zt, xz, ztCode, xzCode) {
        this.setState({filtrate: false});
        if (tag === 1) {
            this.setState({
                type: type,
                rwzt: ztCode,
                rwxz: xzCode,
                rwztCn: zt,
                rwxzCn: xz
            }, function () {
                this.getData()
            })
        }
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
        const showDate = new Date(this.formatDate(data.substr(0,4), parseInt(data.substr(-2,data.length-1)), 1));
        this.setState({
            year: data.substr(0, 4),
            month: parseInt(data.substr(-2, data.length - 1)) - 1,
            showDate,
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

    formatDate(year, month, day) {
        return `${year}-${padStart(month)}-${padStart(day)}`
    }

    loadMore() {
        this.setState({
            pageNum: this.state.pageNum + 1
        }, function () {
            this.getData(this.state.pageNum, () => {
            })
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
                month: this.state.year + '-' + padStart(this.state.month + 1),
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

    // 选择今日
    setToday() {
        const today = new Date();
        this.setState({
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            showDate: today,
        }, function () {
            this.getData();
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
                date: `${this.state.year}-${padStart(this.state.month + 1)}-${padStart(this.state.day)}`,
                type: type,
                rwxz: this.state.rwxz,
                rwzt: this.state.rwzt,
                pageNum: pageNum,
                pageSize: 10,
                callID: true
            }
        }).then(data => {
            resolve();
            this.setState({
                isLoading: false
            });
            if (data.code == 1) {
                if (data.data && data.data.list) {
                    if (pageNum == 1) {
                        this.setState({
                            dataSource: data.data.list
                        },function () {
                            
                        })
                    } else {
                        for (let i = 0; i < data.data.list.length; i++) {
                            this.state.dataSource.push(data.data.list[i]);
                        }
                        this.setState({
                            dataSource: this.state.dataSource
                        })
                    }
                } else {
                }
                return data.data.list.length>0
            } else {
                toast.show(data.message);
                return false
            }
        }).catch(err => {
            resolve();
            this.setState({
                isLoading: false
            });
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
