/**
 * Created by Nealyang on 2017/4/30.
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
const {width} = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar'
import EarlierStageList from './Component/EarlierStageList'
import SearchHeader from '../Component/SearchHeader'
import EarlierStageListModalView from "./Component/EarlierStageListModalView";
import keys from '../../../Util/storageKeys.json'
import Toast from 'react-native-simple-toast';
import {getCurrentMonS,getCurrentMonE, getTimestamp} from '../../../Util/Util'
import FetchUrl from '../../../Util/service.json'
import Loading from "../../../Component/Loading";
export default class EarlierStage extends Component {
    constructor(props) {
        super(props);
        this.dataArr = [],
        this.state = {
            isModalVisible: false,
            sDate: getCurrentMonS(),//开始时间
            eDate: getCurrentMonE(),//结束时间
            jhlx: '500',//计划类型
            pageNum: 1,//页码
            isLoading: false,
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="前期进度计划执行">
                    <TouchableOpacity onPress={() => {
                        this.setState({isModalVisible: !this.state.isModalVisible})
                    }}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <EarlierStageList loadMore={()=>this.loadMore()} refresh={(callback)=>this.getDataFromNet(callback)} dataSource={this.state.dataSource} navigator={this.props.navigator}/>
                {this.state.isModalVisible ? <EarlierStageListModalView isModalVisible={this.state.isModalVisible}
                                                                        closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View></View>}
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            isLoading:true
        });
        this.getDataFromNet();
    }

    //首次加载
    getDataFromNet(callback,sDate=this.state.sDate,eDate=this.state.eDate) {
        this.setState({
            pageNum:1
        });
        axios.get('/psmQqjdjh/list', {
            params: {
                userID: GLOBAL_USERID,
                sDate: sDate,
                eDate: eDate,
                jhlx: this.state.jhlx,
                pageNum: 1,
                pageSize: 10,
                callID: getTimestamp()
            }
        }).then(data => {
            this.dataArr = [];
            for(let i = 0;i<data.data.length;i++){
                this.dataArr.push(data.data[i])
            }
            this.setState({
                isLoading:false,
                dataSource:this.dataArr
            });
            callback()
        }).catch(err=>{
            this.setState({
                isLoading:false
            })
        })
    }

    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },()=>{
            axios.get('/psmQqjdjh/list', {
                params: {
                    userID: GLOBAL_USERID,
                    sDate: this.state.sDate,
                    eDate: this.state.eDate,
                    jhlx: this.state.jhlx,
                    pageNum: this.state.pageNum,
                    pageSize: 10,
                    callID: getTimestamp()
                }
            }).then(data=>{
                let resultData = data.data;
                for(let i  = 0;i<resultData.length;i++){
                    this.dataArr.push(resultData[i])
                }
                this.setState({
                    dataSource:this.dataArr
                })
            })
        })
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