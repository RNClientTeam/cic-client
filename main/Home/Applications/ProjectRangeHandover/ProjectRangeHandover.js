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
export default class ProjectRangeHandover extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            sDate:getCurrentMonS(),
            eDate:getCurrentMonE(),
            keywords:'',
            pageNum:1
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
                <SearchHeader sDate={this.state.sDate} eDate={this.state.eDate}/>
                <ProjectRangeHandoverList navigator={this.props.navigator}/>
                {this.state.isModalVisible?<ProjectRangeHandoverModal sDate={this.state.sDate} eDate={this.state.eDate} isModalVisible={this.state.isModalVisible}  closeModal={()=>this.setState({isModalVisible:false})} />:<View></View>}
            </View>
        )
    }

    componentDidMount() {
        this.getDateFromNet(1,()=>{});
    }

    getDateFromNet(pageNum,resolve){
        axios.get('/psmGcfw/xmlist',{
            params:{
                userID:GLOBAL_USERID,
                sDate:this.state.sDate,
                eDate:this.state.eDate,
                pageNum:pageNum,
                pageSize:10,
                callID:true,
                keywords:this.state.keywords
            }
        }).then(data=>{
            data = {
                "code": 1,
                "data": {
                    "total": 13,
                    "list": [
                        {
                            "id": "8a8180b85c0b0744015c0b0e6d45004b",
                            "gcfwjjztmc": "已拆分子项",
                            "zxcount": "0",
                            "xmjl": "刘姗姗",
                            "gcfwjjzt": 60,
                            "xmmc": "京棉A1区北区2号配及A2区2#配户表集中器",
                            "xmbh": "DQ11104-14161",
                            "ssdw": "市场营销二部",
                            "cfsj": "2017-05-15 00:00:00"
                        },
                        {
                            "id": "8a8180b85bacee8d015bad56dfc10306",
                            "gcfwjjztmc": "已拆分子项",
                            "zxcount": "1",
                            "xmjl": "贾世坤",
                            "gcfwjjzt": 60,
                            "xmmc": "2016平谷南营路网架结构优化",
                            "xmbh": "CX_DS16003-16016",
                            "ssdw": "市场营销一部",
                            "cfsj": "2017-04-27 00:00:00"
                        }
                    ]
                },
                "message": "成功"
            }
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
