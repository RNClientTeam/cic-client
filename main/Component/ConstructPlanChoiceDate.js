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
export default class ConstructPlanChoiceDate extends Component{

    constructor(props){
        super(props);
        this.state={
            date:getCurrentDate()
        }
    }

    render(){
        return(
            <View>
                <DatePicker
                    style={{width: 70}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM"
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
                            alignItems:'center'
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});