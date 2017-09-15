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
import Loading from "../../../Component/Loading";
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
            isLoading:false
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
                <SearchHeader getData={()=>this.getDataFromNet()} changeZxmc={(keywords)=>this.setState({xmmc:keywords})}/>
                <ProjectSubitemSplitList
                    cfzt={this.state.cfzt}
                    dataSource={this.state.dataSource}
                    getData={(resolve)=>this.getDataFromNet(resolve)}
                    loadMore={()=>this.loadMore()}
                    navigator={this.props.navigator}/>
                {this.state.isModalVisible ?
                    <ProjectSubitemSplitModal
                        isModalVisible={this.state.isModalVisible}
                        sDate={this.state.sDate}
                        eDate={this.state.eDate}
                        cfzt={this.state.cfzt}
                        jhlx={this.state.jhlx}
                        getDataFromNet={(sDate,eData,isSplit,mine) => this.changeFilter(sDate,eData,isSplit,mine)}
                        closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View/>}
                {this.state.isLoading?<Loading/>:null}
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
        this.setState({
            isLoading:true
        });
        let jhlx = 1,cfzt=0;
        if (this.state.jhlx === '所有') {
            jhlx = 2;
        }
        if(this.state.cfzt){
            cfzt = 1;
        }
        this.setState({
            pageNum:1
        },function () {
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
                this.setState({
                    isLoading:false
                });
                if (data) {
                    if(data.code === 1){
                        if(data.data){
                            this.setState({
                                dataSource: data.data.list||[]
                            });
                        }
                        callback();
                    }
                }else{
                    toast.show(data.message);
                }
            }).catch(err=>{
                this.setState({
                    isLoading:false
                });
                if(err) toast.show('服务端异常');
            })
        });

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
                if (data) {
                    if(data.code === 1){
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
