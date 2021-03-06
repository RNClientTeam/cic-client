import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import StatusBar from '../../../Component/StatusBar'
import EarlierStageList from './Component/EarlierStageList'
import SearchHeader from '../Component/SearchHeader'
import EarlierStageListModalView from "./Component/EarlierStageListModalView";
import Toast from 'react-native-simple-toast';
import {getCurrentMonS, getCurrentMonE, getTimestamp} from '../../../Util/Util'
import Loading from "../../../Component/Loading";
export default class Ssjdjh extends Component {
    constructor(props) {
        super(props);
        this.dataArr = [];
        this.state = {
            isModalVisible: false,
            sDate: getCurrentMonS(),//开始时间
            eDate: getCurrentMonE(),//结束时间
            jhlx: this.props.tag==='todo'?'我的待办':'全部',//计划类型
            pageNum: 1,//页码
            isLoading: false,
            dataSource: [],
            keywords: ''
        }
    }

    render() {
        return (
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="实施进度计划">
                    <TouchableOpacity onPress={() => {
                        this.setState({isModalVisible: !this.state.isModalVisible})
                    }}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader
                    getData={()=>this.getDataFromNet()}
                    tag="Ssjdjh"
                    changeZxmc={(keywords)=>this.setState({keywords:keywords})}/>
                <EarlierStageList loadMore={() => this.loadMore()} refresh={(callback) => this.getDataFromNet(callback)}
                                  dataSource={this.state.dataSource} navigator={this.props.navigator}/>
                {this.state.isModalVisible ?
                    <EarlierStageListModalView
                        changeFilter={(sDate, eDate, lx) => {
                            this.filter(sDate, eDate, lx)
                        }}
                        isModalVisible={this.state.isModalVisible}
                        jhlx={this.state.jhlx}
                        eDate={this.state.eDate}
                        sDate={this.state.sDate}
                        closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View></View>}
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.getDataFromNet();
        this.listener = RCTDeviceEventEmitter.addListener('refreshListAndDetail', () => {
            this.refreshDetail = true;
            this.getDataFromNet();
        });
    }

    filter(sDate, eDate, lx) {
        this.setState({
            jhlx: lx,
            sDate: sDate,
            eDate: eDate
        }, () => {
            this.getDataFromNet();
        })
    }

    //首次加载
    getDataFromNet(callback = () => {
    }, sDate = this.state.sDate, eDate = this.state.eDate) {
        this.setState({
            pageNum: 1
        });
        this.setState({
            isLoading:true
        });
        let lx = '';
        if (this.state.jhlx === '全部') {
            lx = 500;
        } else if (this.state.jhlx === '我参与的') {
            lx = 400;
        } else if (this.state.jhlx === '我审核的') {
            lx = 300;
        } else if (this.state.jhlx === '我的计划') {
            lx = 200;
        } else if (this.state.jhlx === '我的待办') {
            lx = 100;
        }
        axios.get('/psmSsjdjh/list', {
            params: {
                userID: GLOBAL_USERID,
                ksrq: sDate,
                jsrq: eDate,
                jhlx: lx,
                pageNum: 1,
                pageSize: 10,
                callID: true,
                keywords: this.state.keywords
            }
        }).then(data => {
            this.setState({
                isLoading:false
            });
            if (data.code === 1) {
                this.dataArr = [];
                for (let i = 0; i < data.data.data.length; i++) {
                    this.dataArr.push(data.data.data[i])
                }
                this.setState({
                    isLoading: false,
                    dataSource: this.dataArr
                }, () => {
                    if (this.refreshDetail === true) {
                        this.tempListener = RCTDeviceEventEmitter.emit('refreshDetail');
                    }
                });
            } else {
                Toast.show(data.message)
            }

            callback()
        }).catch(err => {
            this.setState({
                isLoading: false
            });
            Toast.show('服务端连接错误！')
        })
    }

    loadMore() {
        let hasMoreData = false;
        this.setState({
            pageNum: this.state.pageNum + 1
        }, () => {
            let lx = '';
            if (this.state.jhlx === '全部') {
                lx = 500;
            } else if (this.state.jhlx === '我参与的') {
                lx = 400;
            } else if (this.state.jhlx === '我审核的') {
                lx = 300;
            } else if (this.state.jhlx === '我的计划') {
                lx = 200;
            } else if (this.state.jhlx === '我的待办') {
                lx = 100;
            }
            axios.get('/psmSsjdjh/list', {
                params: {
                    userID: GLOBAL_USERID,
                    ksrq: this.state.sDate,
                    jsrq: this.state.eDate,
                    jhlx: lx,
                    pageNum: this.state.pageNum,
                    pageSize: 10,
                    callID: getTimestamp(),
                    keywords: this.state.keywords
                }
            }).then(data => {
                if (data.code === 1) {
                    let resultData = data.data.data;
                    if (resultData.length > 0) {
                        hasMoreData = true
                    } else {
                        hasMoreData = false;
                        // Toast.show('没有更多数据了！')
                    }
                    for (let i = 0; i < resultData.length; i++) {
                        this.dataArr.push(resultData[i])
                    }
                    this.setState({
                        dataSource: this.dataArr
                    }, () => {
                        return hasMoreData
                    })
                } else {
                    Toast.show(data.message);
                }

            }).catch(err => {
                // Toast.show('服务端连接错误！')
            })
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }
}

const styles = StyleSheet.create({
    earlierStage: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});
