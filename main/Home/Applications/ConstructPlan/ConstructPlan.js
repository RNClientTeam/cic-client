/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import ConstructPlanHeader from "./Component/ConstructPlanHeader";
import Calendar from "./Component/Calendar";
import DayProjectListContainer from "./Component/DayProjectListContainer";
import ProjectListView from "./ProjectListView";
import NewProject from "./NewProject";
const {width}  = Dimensions.get('window');

export default class ConstructPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            selectRange:"mine"
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工日计划">
                    <TouchableOpacity onPress={()=>this.props.navigator.push({name:'NewProject',component:NewProject})}>
                        <Image style={[styles.filtrate, {marginLeft:-width*0.045-10}]} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.skipPage()}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/constuctPlan/projectList.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <ConstructPlanHeader changeRange={this.changeRange.bind(this)} range={this.state.selectRange} changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar year={this.state.year} month={this.state.month}/>
                <DayProjectListContainer/>
            </View>
        )
    }

    changeYearAndMonth(data){
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1
        })
    }
    skipPage(){
        this.props.navigator.push({
            name:'ProjectListView',
            component:ProjectListView
        })
    }

    changeRange(txt){
        this.setState({
            selectRange:txt
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