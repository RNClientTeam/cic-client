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
import {getTimestamp,getCurrentMonS,getCurrentMonE} from '../../../Util/Util'
export default class ProjectSubitemSplit extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            sDate:getCurrentMonS(),
            eDate:getCurrentMonE(),
            pageNum:1,
            cfzt:1,//0
            jhlx:1,//2,
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.projectSubitemSplit}>
                <StatusBar navigator={this.props.navigator} title="工程子项拆分">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <ProjectSubitemSplitList navigator={this.props.navigator}/>
                {this.state.isModalVisible?
                    <ProjectSubitemSplitModal
                        changeSDate={(date)=>this.changeSDate(date)}
                        changeEDate={(date)=>this.changeEDate(date)}
                        isModalVisible={this.state.isModalVisible}
                        changeJhlx={(jhlx)=>this.setState({jhlx:jhlx})}
                        changeCfzt={(cfzt)=>{this.setState({cfzt:cfzt})}}
                        getDataFromNet={()=>this.getDataFromNet()}
                        closeModal={()=>this.setState({isModalVisible:false})} />:
                    <View/>}
            </View>
        )
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    changeSDate(date){
        this.setState({
            sDate:date
        })
    }

    changeEDate(date){
        this.setState({
            eDate:date
        })
    }

    getDataFromNet(){
        axios.get('/psmGczx/xmlist',{
            params:{
                userID:GLOBAL_USERID,
                sDate:this.state.sDate,
                eDate:this.state.eDate,
                callID:getTimestamp(),
                cfzt:this.state.cfzt,
                jhlx:this.state.jhlx,
                pageNum:this.state.pageNum,
                pageSize:10
            }
        }).then(data=>{
            console.log(data)
            if(data){

            }
        })
    }
}

const styles = StyleSheet.create({
    projectSubitemSplit:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});