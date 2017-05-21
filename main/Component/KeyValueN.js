/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput
} from 'react-native'
import MyTextInput from "./MyTextInput";
const {width}  = Dimensions.get('window');

export default class KeyValueN extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{color:'#5476a1'}}>{this.props.propKey}</Text>
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='请填写'
                        underlineColorAndroid="transparent"
                        textAlignVertical="top"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.24,
        paddingRight:width*0.02,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    textContainer:{
        paddingLeft:width*0.02,
        height:width*0.12,
        justifyContent:'center'
    },
    textInput:{
        backgroundColor:'#fff',
        height:width*0.11,
        fontSize:14,

    }
});