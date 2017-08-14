/**
 * Created by Nealyang on 2017/5/1.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width}  = Dimensions.get('window');
import DatePicker from 'react-native-datepicker'
import {getCurrentDate} from '../Util/Util'
export default class ChoiceDate extends Component{
    constructor(props){
        super(props);
        this.state={
            date:this.props.showDate
        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#fff'}}>
                <DatePicker
                    style={{width: 200, backgroundColor:'#fff'}}
                    date={this.state.date || this.props.showDate}
                    mode={this.props.dateTime?"datetime":"date"}
                    placeholder="请选择>"
                    disabled={this.props.disabled||false}
                    format={this.props.dateTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD"}
                    minDate="2000-05-01"
                    maxDate="2116-06-01"
                    confirmBtnText="确认"
                    cancelBtnText="取消"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            width:0,
                            height:0
                        },
                        dateInput: {
                            borderWidth:0,
                            height:width*0.08,
                            alignItems:'flex-end'
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date});this.props.changeDate(date)}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});
