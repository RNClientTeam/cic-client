/**
 * Created by Nealyang on 2017/4/30.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar'
import EarlierStageList from './Component/EarlierStageList'
import SearchHeader from '../Component/SearchHeader'
import EarlierStageListModalView from "./Component/EarlierStageListModalView";
import keys from '../../../Util/storageKeys.json'
import {AESDecrypt,getTimestamp} from '../../../Util/Util'
import FetchUrl from '../../../Util/service.json'
import Loading from "../../../Component/Loading";
export default class EarlierStage extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            sDate:'',//开始时间
            eDate:'',//结束时间
            jhlx:'500',//计划类型
            pageNum:1,//页码
            pageSize:10,//行数
            callID:'',//时间戳
            sign:GLOBAL_USERSIGN,
            userID:GLOBAL_USERID,
            isLoading:true
        }
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="前期进度计划执行">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <EarlierStageList navigator={this.props.navigator}/>
                {this.state.isModalVisible?<EarlierStageListModalView isModalVisible={this.state.isModalVisible}  closeModal={()=>this.setState({isModalVisible:false})} />:<View></View>}
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    componentDidMount() {
        // this.getDataFromNet().bind(this)
        this.getDataFromNet();
    }

    getDataFromNet(){
        this.setState({
            jhlx:'500',//计划类型
            pageNum:1,//页码
            pageSize:10,//行数
            callID:getTimestamp(),
            sign:GLOBAL_USERSIGN,
            userID:GLOBAL_USERID,
        });
        let url =`${FetchUrl.baseUrl}/psmQqJdjh/list?userID=${this.state.userID}`
        console.log(this.state)
    }
}

const styles = StyleSheet.create({
    earlierStage:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});