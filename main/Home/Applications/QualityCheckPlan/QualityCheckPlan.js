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
import Calendar from "../Component/Calendar";
import QualityCheckPlanHeader from "./Component/QualityCheckPlanHeader";
import QualityCheckPlanList from "./Component/QualityCheckPlanList";
import QualityCheckFiltrate from "./Component/QualityCheckFiltrate";
const {width}  = Dimensions.get('window');

export default class QualityCheckPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            selectRange:"mine",
            filtrate:false
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查计划">
                    <TouchableOpacity onPress={()=>{this.setState({filtrate:!this.state.filtrate})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckPlanHeader changeRange={this.changeRange.bind(this)} range={this.state.selectRange} changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar year={this.state.year} month={this.state.month}/>
                <QualityCheckPlanList/>
                {this.state.filtrate?<QualityCheckFiltrate closeFiltrate={()=>this.setState({filtrate:false})}/>:null}
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
        // this.props.navigator.push({
        //     name:'ProjectListView',
        //     component:ProjectListView
        // })
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