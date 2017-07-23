/**
 * Created by Nealyang on 2017/5/7.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width}  = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import ProjectRangeHandoverList from './Component/ProjectRangeHandoverList'
import ProjectRangeHandoverModal from "./Component/ProjectRangeHandoverModal";
import {getCurrentMonS,getCurrentMonE} from '../../../Util/Util'
import Loading from "../../../Component/Loading";
import toast from 'react-native-simple-toast'
export default class ProjectRangeHandover extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            sDate:getCurrentMonS(),
            eDate:getCurrentMonE(),
            xmmc:'',
            pageNum:1,
            list:[],
            isLoading:false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="工程范围交接">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader
                    getData={()=>{this.getDateFromNet(1)}}
                    changeZxmc={(txt)=>{this.setState({xmmc:txt})}}/>
                <ProjectRangeHandoverList
                    getData={(pageNum,resolve)=>this.getDateFromNet(pageNum,resolve)}
                    loadMore={()=>this.loadMore()}
                    dataSource={this.state.list} navigator={this.props.navigator}/>
                {this.state.isModalVisible?<ProjectRangeHandoverModal
                    sDate={this.state.sDate}
                    eDate={this.state.eDate}
                    isModalVisible={this.state.isModalVisible}
                    closeModal={()=>this.setState({isModalVisible:false})}
                    changeFileter={(sDate,eDate)=>this.changeFileter(sDate,eDate)}
                />:<View></View>}
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    showLoading(){
        this.setState({
            isLoading:true
        })
    }
    hideLoading(){
        this.setState({
            isLoading:false
        })
    }

    componentDidMount() {
        this.getDateFromNet(1,()=>{});
    }

    changeFileter(sdate,edate){
        this.setState({
            sDate:sdate,
            eDate:edate
        },function () {
            this.getDateFromNet(1);
        })
    }

    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            this.getDateFromNet(this.state.pageNum)
        })
    }

    getDateFromNet(pageNum,resolve=()=>{}){
        this.showLoading();
        axios.get('/psmGcfw/xmlist',{
            params:{
                userID:GLOBAL_USERID,
                sDate:this.state.sDate,
                eDate:this.state.eDate,
                pageNum:pageNum,
                pageSize:10,
                callID:true,
                xmmc:this.state.xmmc
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code ===1){
                resolve();
                if(pageNum === 1){
                    this.state.list = [];
                }
                if(data.data.list){
                    for(let i = 0;i<data.data.list.length;i++){
                        this.state.list.push(data.data.list[i]);
                    }
                    this.setState({
                        list:this.state.list
                    });
                    if(data.data.list.length===0){
                        return false
                    }else{
                        return true
                    }
                }else{
                    this.setState({
                        list:[]
                    });
                    return false
                }
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});
