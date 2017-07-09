/**
 * Created by fan on 2017/05/02.
 * 前期进度计划执行-进度计划
 */
"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';

import SchedulePlanCell from './SchedulePlanCell.js';
import MyTask from './MyTask.js';
import MoreOperations from "./MoreOperations.js";
const {width, height} = Dimensions.get('window');
import AllTask from "./AllTask";
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'

export default class SchedulePlan extends Component {
    constructor(props) {
        super(props);
        this.myTaskArr = [];
        this.allTaskArr = [];
        this.state = {
            currentPage: 0,
            modalVisible: false,
            myTask: [],
            allTask: [],
            myTaskPageNum: 1,
            allTaskPageNum: 1,
            rwid: null,
            auth: {},
            rySDate: '',
            ryEdate: ''
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.segmentView}>
                    <TouchableOpacity onPress={this.changePage.bind(this, 0)}>
                        <View
                            style={[styles.leftView, {backgroundColor: this.state.currentPage === 0 ? '#4fa6ef' : 'white'}]}>
                            <Text style={{
                                fontSize: 12,
                                color: this.state.currentPage === 0 ? 'white' : '#4fa6ef'
                            }}>我的任务</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changePage.bind(this, 1)}>
                        <View
                            style={[styles.rightView, {backgroundColor: this.state.currentPage === 1 ? '#4fa6ef' : 'white'}]}>
                            <Text style={{
                                fontSize: 12,
                                color: this.state.currentPage === 1 ? 'white' : '#4fa6ef'
                            }}>全部任务</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    ref={"scrollView"}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <MyTask navigator={this.props.navigator}
                            xmbh={this.props.xmbh}
                            refresh={(callback) => this.getMyTask(callback)}
                            dataSource={this.state.myTask}
                            getMoreData={() => {
                                this.getMoreMy()
                            }}
                            setModalVisible={(rwid, sDate, eDate) => {
                                this.setModalVisible(rwid,sDate,eDate)
                            }}/>
                    <AllTask navigator={this.props.navigator}
                             xmbh={this.props.xmbh}
                             refresh={(callback) => this.getAllTask(callback)}
                             dataSource={this.state.allTask}
                             getMoreData={() => {
                                 this.getMoreAll()
                             }}
                             setModalVisible={(rwid, sDate, eDate) => {
                                 this.setModalVisible(rwid,sDate,eDate)
                             }}/>
                </ScrollView>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreOperations reloadInfo={()=>{this.getAllTask();this.getMyTask()}} tag="进度计划" sDate={this.state.rySDate} eDate={this.state.ryEdate} jhxxId={this.props.jhxxId} auth={this.state.auth} rwid={this.state.rwid}
                                    navigator={this.props.navigator}
                                    exchangeRwid={this.exchangeRwid.bind(this)}
                                    closeModal={() => {
                                        this.setState({modalVisible: false})
                                    }}/>
                </Modal>

            </View>
        );
    }

    exchangeRwid(newId) {
        let myTaskIndex = -1;
        let allTaskIndex = -1;
        this.state.myTask.forEach((elem, index) => {
            if (elem.rwid === this.state.rwid) {
                myTaskIndex = index;
                return;
            }
        });
        this.state.allTask.forEach((elem, index) => {
            if (elem.rwid === this.state.rwid) {
                allTaskIndex = index;
                return;
            }
        });
        if (myTaskIndex >= 0) {
            this.state.myTask[myTaskIndex].rwid = newId;
            this.setState({myTask: this.state.myTask});
        }
        if (allTaskIndex >= 0) {
            this.state.allTask[allTaskIndex].rwid = newId;
            this.setState({allTask: this.state.allTask});
        }
    }

    changePage(page) {
        if (this.state.currentPage !== page) {
            this.setState({currentPage: page});
            this.refs.scrollView.scrollTo({x: page * width, y: 0, animated: true});
        }
    }

    componentDidMount() {
        this.getMyTask();
        this.getAllTask();
    }

    getMyTask(callback = () => {
    }) {
        axios.get('/psmSsjdjh/list4Zrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: 1,
                pageSize: 10,
                callID: true,
                rwlx: 100
            }
        }).then(data => {
            let resultData = data.data.data;
            this.state.myTask = [];
            for (let i = 0; i < resultData.length; i++) {
                this.state.myTask.push(resultData[i]);
            }
            this.setState({
                myTask: this.state.myTask,
                myTaskPageNum: 1
            });
            callback();
        })
    }

    setModalVisible(rwid, sDate, eDate) {
        this.setState({
            rySDate: sDate,
            ryEdate: eDate
        });
        axios.get('/psmSsjdjh/operationAuthority', {
            params: {
                userID: GLOBAL_USERID,
                belongTo: 1,
                objId: rwid,
                callID: true
            }
        }).then((data) => {
            if (data.code === 1) {
                let showToast = true;
                data.data.workflow = true;
                for(let key in data.data) {
                    if (data.data[key]) {
                        showToast = false;
                        this.setState({
                            modalVisible: true,
                            auth: data.data,
                            rwid: rwid
                        });
                        return;
                    }
                }
                if (showToast) {
                    toast.show('您没有相关权限');
                }
            } else {
                toast.show(data.message);
            }

        }).catch(err => {
            toast.show('服务端错误');
        })
    }


    getAllTask(callback = () => {
    }) {
        axios.get('/psmSsjdjh/list4Zrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: 1,
                pageSize: 10,
                callID: true,
                rwlx: 200
            }
        }).then(data => {
            let resultData = data.data.data;
            this.state.allTask = [];
            for (let i = 0; i < resultData.length; i++) {
                this.state.allTask.push(resultData[i]);
            }
            this.setState({
                allTask: this.state.allTask,
                allTaskPageNum: 1
            });
            callback();
        });
    }

    getMoreMy() {
        this.setState({
            myTaskPageNum: this.state.myTaskPageNum + 1
        }, () => {
            axios.get('/psmSsjdjh/list4Zrw', {
                params: {
                    userID: GLOBAL_USERID,
                    jhxxId: this.props.jhxxId,
                    pageNum: this.state.myTaskPageNum,
                    pageSize: 10,
                    callID: true,
                    rwlx: 100
                }
            }).then(data => {

                let resultData = data.data;
                for (let i = 0; i < resultData.length; i++) {
                    this.state.myTask.push(resultData[i]);
                }
                this.setState({
                    myTask: this.state.myTask
                });
                if (resultData.length > 0) {
                    return true;
                } else {
                    return false
                }
            })
        })
    }

    getMoreAll() {
        this.setState({
            allTaskPageNum: this.state.allTaskPageNum + 1
        }, () => {
            axios.get('/psmSsjdjh/list4Zrw', {
                params: {
                    userID: GLOBAL_USERID,
                    jhxxId: this.props.jhxxId,
                    pageNum: this.state.allTaskPageNum,
                    pageSize: 10,
                    callID: true,
                    rwlx: 200
                }
            }).then(data => {
                let resultData = data.data.data;
                for (let i = 0; i < resultData.length; i++) {
                    this.state.allTask.push(resultData[i]);
                }
                this.setState({
                    allTask: this.state.allTask
                });
                if (resultData.length > 0) {
                    return true;
                } else {
                    return false
                }
            })
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    segmentView: {
        width: width,
        height: 0.0645 * height,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftView: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        height: 0.036 * height,
        width: 88,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightView: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        height: 0.036 * height,
        width: 88,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
