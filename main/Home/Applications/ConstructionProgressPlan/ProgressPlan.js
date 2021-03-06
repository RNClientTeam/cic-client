/**
 * Created by zhubin on 17/5/8.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import ProgressPlanList from './Component/ProgressPlanList'
import ProgressPlanListModalView from './Component/ProgressPlanListModalView'
import {getCurrentMonS, getCurrentMonE} from '../../../Util/Util'
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";

const {width, height} = Dimensions.get('window');

export default class ProgressPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            ksrq: getCurrentMonS(),
            jsrq: getCurrentMonE(),
            jhlx: this.props.tag==='todo'?'我的待办':'全部',//全部,我参与的，我审核的，我的计划，我的待办
            pageNum: 1,
            pageSize: 10,
            keywords: '',
            dataSource: [],
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划编制">
                    <TouchableOpacity onPress={() => {
                        this.setState({isModalVisible: !this.state.isModalVisible})
                    }}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader getData={() => this.getDataFromNet(1)} placeholder="请输入查询条件"
                              changeZxmc={(keywords) => this.setState({keywords: keywords})}/>
                <ProgressPlanList navigator={this.props.navigator}
                                  dataSource={this.state.dataSource}
                                  loadMore={() => this.loadMore()}
                                  refresh={(callback) => this.getDataFromNet(1, callback)}
                />
                {this.state.isModalVisible ?
                    <ProgressPlanListModalView isModalVisible={this.state.isModalVisible}
                                               ksrp={this.state.ksrq}
                                               jsrp={this.state.jsrq}
                                               jhlx={this.state.jhlx}
                                               changeFilter={(sDate, eDate, lx) => {
                                                   this.filter(sDate, eDate, lx)
                                               }}
                                               reset={() => this.reset()}
                                               closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View/>}
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    componentDidMount() {
        this.getDataFromNet(1)
    }

    filter(sDate, eDate, lx) {
        this.setState({
            jhlx: lx,
            ksrq: sDate,
            jsrq: eDate
        }, () => {
            this.getDataFromNet();
        })
    }

    reset() {
        this.setState({
            jhlx: '全部',
            ksrq: getCurrentMonS(),
            jsrq: getCurrentMonE(),
        }, () => {
            this.getDataFromNet();
        })
    }

    getDataFromNet(pageNum = 1, resolve = () => {
    }) {
        let jhlx = 500;
        this.setState({
            isLoading: true,
            pageNum: pageNum
        });
        switch (this.state.jhlx) {
            case '全部':
                jhlx = 500;
                break;
            case '我参与的':
                jhlx = 400;
                break;
            case '我审核的':
                jhlx = 300;
                break;
            case '我的计划':
                jhlx = 200;
                break;
            case '我的待办':
                jhlx = 100;
                break;
        }
        axios.get('/psmSgjdjh/list', {
            params: {
                userID: GLOBAL_USERID,
                ksrq: this.state.ksrq,
                jsrq: this.state.jsrq,
                jhlx: jhlx,
                pageNum: pageNum,
                pageSize: 10,
                keywords: this.state.keywords,
                callID: true
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                //第一页数据 设置total 清空dataSource数组
                if (pageNum === 1) {
                    this.state.dataSource = [];
                }
                this.setState({
                    dataSource: this.state.dataSource.concat(responseData.data.data),
                    total: pageNum === 1 ? responseData.data.total : this.state.total,
                    isLoading: false
                });
                resolve();
                return responseData.data.data.length > 0
            } else {
                this.setState({
                    isLoading: false
                });
                toast.show(responseData.message);
                return false
            }
        }).catch(err => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    loadMore() {
        // 数据还没加载完
        if (this.state.dataSource.length < this.state.total) {
            this.setState({
                pageNum: ++this.state.pageNum
            }, () => {
                this.getDataFromNet(this.state.pageNum);
            })
        } else {
            // toast.show("没有更多数据");
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});
