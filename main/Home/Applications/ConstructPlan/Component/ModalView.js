/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import ModalCell from "./ModalCell";
const {width, height} = Dimensions.get('window');

export default class ModalView extends Component {
    render() {
        return (
            <View style={styles.modalView}>

                <ModalCell/>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.button,{backgroundColor:'#fb5560'}]}>
                        <Text style={{color:'#fff'}}>停工</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'#3999fd'}]}>
                        <Text style={{color:'#fff'}}>复工</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalView:{
        width:width,
        height:height,
        justifyContent:'flex-end',
        backgroundColor: 'rgba(0, 0, 0,0.75)'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    button:{
        width:width*0.29,
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    }
});