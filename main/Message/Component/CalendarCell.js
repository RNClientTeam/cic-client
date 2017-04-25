/**
 * Created by Nealyang on 2017/4/25.
 * 日历的每一个cell
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class CalendarCell extends Component{
    render(){
        return(
            <View style={styles.calendarCellContainer}>
                <Text style={styles.singleDay}>{this.props.day>0?this.props.day:""}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    calendarCellContainer:{
        width:width/7.01,
        height:width*0.1,
        backgroundColor:'#6782a9',
        alignItems:'center',
        justifyContent:'center'
    },
    singleDay:{
        color:'#fff'
    }
});
