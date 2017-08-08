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
const arr = [2,5,23,14,12,30,27];
export default class Calendar extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectDate:this.props.day,
            renderCalendarArrAll:[],
            all:true,
            renderCalendarArrWeek:[]
        }
    }


    render(){
        return(
            <View style={styles.containerStyle}>
                <CalendarWeek/>
                <View style={styles.calendarContainerStyle}>
                    {this.state.all?this.renderCalendarCell(this.state.renderCalendarArrAll):this.renderCalendarCell(this.state.renderCalendarArrWeek)}
                </View>
                <TouchableOpacity style={styles.pullDown} activeOpacity={0.7} onPress={()=>this.setState({all:!this.state.all})}>
                    <Image style={styles.pullDownImg} source={require('../../../../resource/imgs/home/constuctPlan/pullDown.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    //判断是否为闰年,是则返回1，否则返回0
    isLeap(year) {
        return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
    }

    renderCalendarCell(renderCalendarArr){
        let renderCalendarCell = [];
        for(let i = 0;i<renderCalendarArr.length;i++){
            renderCalendarCell.push(
                <CalendarCell
                    checkThisDay={this.choiceData.bind(this,renderCalendarArr[i])}
                    hasPlan={this.hasTask(renderCalendarArr[i])}
                    beenSelected={this.state.selectDate == renderCalendarArr[i]}
                    date={renderCalendarArr[i]}
                    key={i}/>
            )
        }
        return renderCalendarCell;
    }

    hasTask(index){
        let result = false;
        for(let i = 0;i<(this.props.data&&this.props.data.length);i++){
            if(parseInt(this.props.data[i].day)==index){
                return this.props.data[i].rwcount> 0;
            }
        }
        return result;
    }

    choiceData(data){
        this.props.changeDay(data);
        this.setState({
            selectDate:data
        },()=>{
            this.getSelectedWeek();
        });

    }

    componentWillReceiveProps(props){
        this.getSelectedWeek();
        this.renderAll(parseInt(props.year),parseInt(props.month));
        this.setState({
            selectDate: props.day
        })
    }

    componentDidMount() {
        this.getSelectedWeek();
        this.renderAll(this.props.year,this.props.month)
    }

    renderAll(year,month){
        let currentMonWeek =new Date(year, month, 1).getDay();//当前月份是周几
        let days_per_month = new Array(31, 28 + this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //创建月份数组
        let templateArr = [];
        for(let i =0 ;i<currentMonWeek;i++){
            templateArr.push(0)
        }
        for(let i = 0;i<days_per_month[month];i++){
            templateArr.push(i+1)
        }
        this.setState({
            renderCalendarArrAll:templateArr
        })
    }

    getSelectedWeek(){
        for(let i = 0;i<6;i++){
            let lastWeekDay = 7*i+7-new Date(this.props.year, this.props.month, 1).getDay();
            let days_per_month = new Array(31, 28 + this.isLeap(this.props.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            if(lastWeekDay>days_per_month[this.props.month]+7){
                break;
            }else{
                if(lastWeekDay>this.state.selectDate){
                    let tempArr = [];
                    for(let s = 6;s>-1;s--){
                        if(lastWeekDay-s>days_per_month[this.props.month]) continue;
                        tempArr.push(lastWeekDay-s)
                    }
                    this.setState({
                        renderCalendarArrWeek:tempArr
                    });
                    return;
                }


            }

        }
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
        justifyContent:'flex-start',
        height:width*0.05
    },
    pullDownImg:{
        // resizeMode:'contain',
        width:width*0.1,
        height:width*0.032
    }
});
