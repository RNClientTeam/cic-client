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

const {width, height} = Dimensions.get('window');

export default class ProgressPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            ksrq: getCurrentMonS(),
            jsrq: getCurrentMonE(),
            jhlx: '全部',//全部,我参与的，我审核的，我的计划，我的待办
            pageNum: 1,
            pageSize: 10,
            keywords: '',
            dataSource:[]
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
                <SearchHeader getData={()=>this.getDataFromNet(1)} getKeyWord={(keywords) => this.setState({keywords:keywords})}/>
                <ProgressPlanList navigator={this.props.navigator}
                                  dataSource={this.state.dataSource}
                                  loadMore={() => this.loadMore()}
                                  refresh={(callback) => this.getDataFromNet(callback)}
                                  />
                {this.state.isModalVisible ?
                    <ProgressPlanListModalView isModalVisible={this.state.isModalVisible}
                                               ksrp={this.state.ksrq}
                                               jsrp={this.state.jsrq}
                                               jhlx={this.state.jhlx}
                                               changeFilter={(sDate, eDate, lx) => {
                                                   this.filter(sDate, eDate, lx)
                                               }}
                                               closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View/>}
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
            this.getDataFromNet(1);
        })
    }

    getDataFromNet(pageNum) {
        let jhlx = 500;
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
        this.setState({
            pageNum
        });
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
            console.log(responseData);
            // responseData = {
            //     "code": 1,
            //     "data": {
            //         "total": 209,
            //         "data": [
            //             {
            //                 "jhkssj": "2017-10-31",
            //                 "zxmc": "3号配电室设备安装",
            //                 "count": 0,
            //                 "cfxxId": "8a8180d856b8094b0156e4d958f84669",
            //                 "zrr": "李建春(配网工程部经理)",
            //                 "xmmc": "密云华润希望小镇配电室",
            //                 "gczxId": "8a8180d857433a5b015746cadea804ac",
            //                 "jhjssj": "2017-12-31",
            //                 "xmbh": "C112003-14002",
            //                 "RN": 1,
            //                 "isTodo": 0,
            //                 "jdbl": "",
            //                 "zrbm": "配网工程部"
            //             },
            //             {
            //                 "jhkssj": "2017-03-01",
            //                 "zxmc": "万家果园箱变基础",
            //                 "count": 0,
            //                 "cfxxId": "8a8180d856b8094b0156e4d958f84669",
            //                 "zrr": "于文晓",
            //                 "xmmc": "密云华润希望小镇配电室",
            //                 "gczxId": "8a8180d857433a5b015746c707bb03bf",
            //                 "jhjssj": "2017-10-31",
            //                 "xmbh": "C112003-14002",
            //                 "RN": 2,
            //                 "isTodo": 0,
            //                 "jdbl": "",
            //                 "zrbm": "市政工程部"
            //             }
            //         ]
            //     },
            //     "message": "成功"
            // };
            if(responseData.code === 1){
                //第一页数据 设置total 清空dataSource数组
                if (pageNum === 1) {
                    this.setState({
                        total: responseData.data.total
                    });
                    this.state.dataSource = [];
                }
                let data = responseData.data;
                let tmp = this.state.dataSource;
                for(let i = 0; i < data.data.length;i++){
                    tmp.push(data.data[i]);
                }
                this.setState({
                    dataSource: tmp
                });

            }else {
                toast.show(responseData.message)
            }
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
            toast.show("没有更多数据");
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