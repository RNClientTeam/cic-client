/**
 * Created by Nealyang on 2017/4/25.
 * 日历的头部星期
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');
const week = ['周日','周一','周二','周三','周四','周五','周六'];
export default class CalendarCell extends Component{

    render(){
        return(
            <View style={styles.calendarWeekContainer}>
                {this.renderWeekDay()}
            </View>
        )
    }

    renderWeekDay(){
        let weekDays = [];
        for(let i = 0;i<week.length;i++){
            weekDays.push(
                <Text key={i} style={styles.weekDay}>{week[i]}</Text>
            )
        }
        return weekDays;
    }
}

const styles = StyleSheet.create({
    calendarWeekContainer:{
        width:width,
        flexDirection:'row',
        backgroundColor:'#fafafa',
        borderBottomColor:'#ddd',
        borderTopColor:'#ddd',
        borderTopWidth:1,
        borderBottomWidth:1,
    },
    weekDay:{
        width:width/7.01,
        backgroundColor:'#fafafa',
        textAlign:'center',
        height:30,
        lineHeight:30,
        color:'#b7b7b7'
    }
});
