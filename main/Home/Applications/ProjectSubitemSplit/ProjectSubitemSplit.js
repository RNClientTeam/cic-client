/**
 * Created by Nealyang on 2017/5/5.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import ProjectSubitemSplitList from './Component/ProjectSubitemSplitList'
import ProjectSubitemSplitModal from "./Component/ProjectSubitemSplitModal";
import {getTimestamp, getCurrentMonS, getCurrentMonE} from '../../../Util/Util'
import toast from 'react-native-simple-toast'
export default class ProjectSubitemSplit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            sDate: getCurrentMonS(),
            eDate: getCurrentMonE(),
            pageNum: 1,
            cfzt: true,//0
            jhlx: '我的',//2,
            dataSource: [],
            xmmc:'',
        }
    }

    render() {
        return (
            <View style={styles.projectSubitemSplit}>
                <StatusBar navigator={this.props.navigator} title="工程子项拆分">
                    <TouchableOpacity onPress={() => {
                        this.setState({isModalVisible: !this.state.isModalVisible})
                    }}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader getData={()=>this.getDataFromNet()} getKeyWord={(keywords)=>this.setState({xmmc:keywords})}/>
                <ProjectSubitemSplitList
                    dataSource={this.state.dataSource}
                    getData={()=>this.getDataFromNet()}
                    loadMore={()=>this.loadMore()}
                    navigator={this.props.navigator}/>
                {this.state.isModalVisible ?
                    <ProjectSubitemSplitModal
                        isModalVisible={this.state.isModalVisible}
                        sDate={this.state.sDate}
                        eDate={this.state.eDate}
                        cfzt={this.state.cfzt}
                        getDataFromNet={(sDate,eData,isSplit,mine) => this.changeFilter(sDate,eData,isSplit,mine)}
                        closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View/>}
            </View>
        )
    }

    componentDidMount() {
        this.getDataFromNet();
    }


    changeFilter(sDate,eData,isSplit,mine){
        this.setState({
            sDate:sDate,
            eDate:eData,
            cfzt:isSplit,
            jhlx:mine
        },function () {
            this.getDataFromNet();
        })
    }

    getDataFromNet(callback=()=>{}) {
        let jhlx = 1,cfzt=0;
        if (this.state.jhlx === '所有') {
            jhlx = 2;
        }
        if(this.state.cfzt){
            cfzt = 1;
        }
        this.setState({
            pageNum:1
        });
        axios.get('/psmGczx/xmlist', {
            params: {
                userID: GLOBAL_USERID,
                sDate: this.state.sDate,
                eDate: this.state.eDate,
                callID: getTimestamp(),
                cfzt: cfzt,
                jhlx: jhlx,
                pageNum: this.state.pageNum,
                pageSize: 10,
                xmmc:this.state.xmmc
            }
        }).then(data => {
            console.log(data);
            if (data) {
                if(data.code === 1){
                    // TODO
                    data={
                        "code": 1,
                        "data": {
                            "total": 1,
                            "list": [
                                {
                                    "id": "8a8180b85beadff3015beff723770c16",
                                    "gcfwjjztmc": "拆分已退回",
                                    "zxcount": "0",
                                    "xmjl": "贾世坤",
                                    "gcfwjjzt": -2,
                                    "xmmc": "平谷胡营路标准化改造",
                                    "xmbh": "CX_DS14241-15013",
                                    "ssdw": "市场营销一部",
                                    "cfsj": "2017-05-10 00:00:00"
                                }
                            ]
                        },
                        "message": "成功"
                    };
                    this.setState({
                        dataSource: data.data.list
                    });
                    callback();
                }
            }else{
                toast.show(data.message);
            }
        }).catch(err=>{
            if(err) toast.show('服务端异常');
        })
    }

    loadMore(){
        let hasMoreData = false;
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            let jhlx = 1,cfzt=0;
            if (this.state.jhlx === '所有') {
                jhlx = 2;
            }
            if(this.state.cfzt){
                cfzt = 1;
            }
            axios.get('/psmGczx/xmlist', {
                params: {
                    userID: GLOBAL_USERID,
                    sDate: this.state.sDate,
                    eDate: this.state.eDate,
                    callID: getTimestamp(),
                    cfzt: cfzt,
                    jhlx: jhlx,
                    pageNum: this.state.pageNum,
                    pageSize: 10,
                    xmmc:this.state.xmmc
                }
            }).then(data => {
                console.log(data);
                if (data) {
                    if(data.code === 1){
                        // TODO
                        if(this.state.pageNum<10){
                            data={
                                "code": 1,
                                "data": {
                                    "total": 1,
                                    "list": [
                                        {
                                            "id": "8a8180b85beadff3015beff723770c16",
                                            "gcfwjjztmc": "拆分已退回",
                                            "zxcount": "0",
                                            "xmjl": "贾世坤",
                                            "gcfwjjzt": -2,
                                            "xmmc": "平谷胡营路标准化改造",
                                            "xmbh": "CX_DS14241-15013",
                                            "ssdw": "市场营销一部",
                                            "cfsj": "2017-05-10 00:00:00"
                                        }
                                    ]
                                },
                                "message": "成功"
                            };
                        }

                        if(data.data&&data.data.list&&data.data.list.length>0){
                            hasMoreData = true;
                            for(let i = 0;i<data.data.list.length;i++){
                                this.state.dataSource.push(data.data.list[i]);
                            }
                            this.setState({
                                dataSource: this.state.dataSource
                            });
                        }
                        return hasMoreData
                    }
                }else{
                    toast.show(data.message);
                }
            }).catch(err=>{
                if(err) toast.show('服务端异常');
            })
        })
    }
}

const styles = StyleSheet.create({
    projectSubitemSplit: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});