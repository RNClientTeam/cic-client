/**
 * Created by Nealyang on 2017/4/25.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native'
const {width}  = Dimensions.get('window');
import CalendarCell from './CalendarCell'
import CalendarWeek from './CalendarWeek'
export default class Calendar extends Component{

    constructor(props){
        super(props);
        this.state = {
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            today:new Date().getDate(),//今天日期
        }
    }


    render(){
        return(
            <View style={styles.containerStyle}>
                <CalendarWeek/>
                <View style={styles.calendarContainerStyle}>
                    {this.renderCalendarCell()}
                </View>
                <TouchableOpacity style={styles.pullDown} activeOpacity={0.9}>
                    <Image style={styles.pullDownImg} source={require('../../../../../resource/imgs/home/constuctPlan/pullDown.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    //判断是否为闰年,是则返回1，否则返回0
    isLeap(year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

    renderCalendarCell(){
        let currentMonWeek =new Date(this.state.year, this.state.month, 1).getDay();//当前月份是周几
        let days_per_month = new Array(31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //创建月份数组
        let renderCalendarArr = [];
        let renderCalendarCell = [];
        //1、确定当期现实的月份第一天是星期几
        for(let i =0 ;i<currentMonWeek;i++){
            renderCalendarArr.push(0)
        }
        for(let i = 0;i<days_per_month[this.state.month];i++){
            renderCalendarArr.push(i+1)
        }
        for(let i = 0;i<renderCalendarArr.length;i++){
            renderCalendarCell.push(
                <CalendarCell date={renderCalendarArr[i]} key={i}/>
            )
        }
        return renderCalendarCell;
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        width:width,
        backgroundColor:'#fff'
    },
    calendarContainerStyle:{
        width:width,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    pullDown:{
        backgroundColor:'#f2f2f2',
        width:width,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    pullDownImg:{
        // resizeMode:'contain',
        width:width*0.1,
        height:width*0.032
    }
});
