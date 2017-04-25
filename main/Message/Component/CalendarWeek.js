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
const week = ['日','一','二','三','四','五','六'];
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
        flexDirection:'row'
    },
    weekDay:{
        width:width/7.01,
        backgroundColor:'#6782a9',
        textAlign:'center',
        height:30,
        lineHeight:30,
        color:'#fff'
    }
});
