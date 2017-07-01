/**
 * Created by zhubin on 17/5/10.
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
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import ProgressExecuteModal from './Component/ProgressExecuteModal'
import ProgressExecuteList from './Component/ProgressExecuteList'
import {getCurrentMonS, getCurrentMonE} from '../../../Util/Util.js'
import Toast from 'react-native-simple-toast';
import Loading from "../../../Component/Loading.js";
const {width} = Dimensions.get('window');

export default class ProgressPlan extends Component {
    constructor(props){
        super(props);
        this.pageNum = 1;
        this.receiveNoti = false;
        this.jhlxObj = {
            '全部' : '500',
            '我参与的' : '400',
            '我审核的' : '300',
            '我的计划' : '200',
            '我的待办' : '100'
        };
        this.state={
            isModalVisible:false,
            sDate: getCurrentMonS(),
            eDate: getCurrentMonE(),
            jhlx: '全部',
            keywords: '',
            dataSource: [],
            hasMoreData: true
        }
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('刷新施工进度进化执行', () => {
            this.receiveNoti = true;
            this.state.dataSource = [];
            this.pageNum = 1;
            this.fetchData(1);
        });
        this.fetchData(1);
    }

    //请求数据
    fetchData(pageNum, callback = () => {}) {
        axios.get('/psmSgjdjh/list4Zx', {
            params: {
                userID: GLOBAL_USERID,
                ksrq: this.state.sDate,
                jsrq: this.state.eDate,
                jhlx: this.jhlxObj[this.state.jhlx],
                keywords: this.state.keywords,
                pageNum: pageNum,
                pageSize: 10,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.setState({
                    dataSource: this.state.dataSource.concat(responseData.data.data),
                    hasMoreData: responseData.data.data.length===0?false:true
                }, () => {
                    if (this.receiveNoti) {
                        RCTDeviceEventEmitter.emit('刷新施工进度计划执行详情');
                    }
                });
            }
            callback();
        }).catch((error) => {
            callback();
            Toast.show('服务端错误');
        });
    }

    //获取搜索框输入的关键字
    getKeyWord(text) {
        this.setState({keywords: text});
    }

    //筛选
    changeFilter(sDate, eDate, jhlx) {
        this.setState({
            sDate: sDate,
            eDate: eDate,
            jhlx: jhlx
        }, () => {
            this.state.dataSource = [];
            this.pageNum = 1;
            this.fetchData(1);
        });
    }

    loadMore() {
        this.fetchData(++this.pageNum);
    }

    searchData() {
        this.state.dataSource = [];
        this.pageNum = 1;
        this.fetchData(1);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划执行">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader getKeyWord={this.getKeyWord.bind(this)} getData={this.searchData.bind(this)}/>
                <ProgressExecuteList navigator={this.props.navigator}
                    dataSource={this.state.dataSource}
                    hasMoreData={this.state.hasMoreData}
                    loadMore={this.loadMore.bind(this)}
                    refreshData={(callback) => {
                        this.state.dataSource = [];
                        this.pageNum = 1;
                        this.fetchData(1, callback);
                    }}/>
                {this.state.isModalVisible?
                    <ProgressExecuteModal
                        sDate={this.state.sDate}
                        eDate={this.state.eDate}
                        jhlx={this.state.jhlx}
                        changeFilter={this.changeFilter.bind(this)}
                        isModalVisible={this.state.isModalVisible}
                        closeModal={()=>this.setState({isModalVisible:false})} />
                    :<View/>}
            </View>
        )
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});
