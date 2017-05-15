/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import ConstructPlanHeader from "./Component/ConstructPlanHeader";
import Calendar from "./Component/Calendar";
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
                <StatusBar navigator={this.props.navigator} title="施工日计划"/>
                <ConstructPlanHeader changeRange={this.changeRange.bind(this)} range={this.state.selectRange} changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar year={this.state.year} month={this.state.month}/>
            </View>
        )
    }

    changeYearAndMonth(data){
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1
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
    }
});