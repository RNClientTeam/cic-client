/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import ChoiceDate from "./ChoiceDate";
const {width}  = Dimensions.get('window');

export default class KeyTime extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:'#5476a1'}}>{this.props.propKey}</Text>
                <ChoiceDate dateTime={this.props.onlyDate?false:true} changeDate={(date)=>this.props.changeDate(date)} showDate={this.props.showDate}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.12,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingRight:width*0.02
    }
});