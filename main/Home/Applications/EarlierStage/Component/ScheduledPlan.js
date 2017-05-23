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
import {getTimestamp} from '../../../../Util/Util'
import AllTask from "./AllTask";

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
            myTaskPageNum:1,
            allTaskPageNum:1
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
                            refresh={(callback)=>this.getMyTask(callback)}
                            dataSource={this.state.myTask}
                            getMoreData={()=>{this.getMoreMy()}}
                            setModalVisible={() => {
                                this.setState({modalVisible: true})
                            }}/>
                    <AllTask navigator={this.props.navigator}
                             setModalVisible={() => {
                                 this.setState({modalVisible: true})
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
                    <MoreOperations navigator={this.props.navigator} closeModal={() => {
                        this.setState({modalVisible: false})
                    }}/>
                </Modal>
            </View>
        );
    }

    changePage(page) {
        if (this.state.currentPage !== page) {
            this.setState({currentPage: page});
            this.refs.scrollView.scrollTo({x: page * width, y: 0, animated: true});
        }
    }

    componentDidMount() {
        this.getMyTask();
    }

    getMyTask(callback=()=>{}){
        axios.get('/psmQqjdjh/list4zrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: 1,
                pageSize: 10,
                callID: getTimestamp()
            }
        }).then(data => {
            let resultData  = data.data;
            this.state.myTask = [];
            for(let i = 0;i<resultData.length;i++){
                this.state.myTask.push(resultData[i]);
            }
            this.setState({
                myTask:this.state.myTask
            });
            callback();
            // if(resultData.length>0){
            //     return true;
            // }else{
            //     return false
            // }
        })
    }

    getAllTask(){
        axios.get('/psmQqjdjh/list4zrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: this.state.allTaskPageNum,
                pageSize: 10,
                callID: getTimestamp()
            }
        }).then(data => {
            let resultData  = data.data;
            for(let i = 0;i<resultData.length;i++){
                this.state.myTask.push(resultData[i]);
            }
            this.setState({
                myTask:this.state.myTask
            })
        });
        if(resultData.length>0){
            return true;
        }else{
            return false
        }
    }

    getMoreMy(){
        this.setState({
            myTaskPageNum:this.state.myTaskPageNum+1
        },()=>{
            axios.get('/psmQqjdjh/list4zrw', {
                params: {
                    userID: GLOBAL_USERID,
                    jhxxId: this.props.jhxxId,
                    pageNum: this.state.myTaskPageNum,
                    pageSize: 10,
                    callID: getTimestamp()
                }
            }).then(data => {
                let resultData  = data.data;
                for(let i = 0;i<resultData.length;i++){
                    this.state.myTask.push(resultData[i]);
                }
                this.setState({
                    myTask:this.state.myTask
                });
                if(resultData.length>0){
                    return true;
                }else{
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
