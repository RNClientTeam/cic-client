/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class BottomSaveButton extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.sureButton}>
                <View style={styles.sureButtonView}>
                    <Text style={{color: "#fff"}}>保存</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    sureButton:{
        marginTop:width*0.03,
        marginBottom:width*0.03,
        height:width*0.13,
        alignItems:'center',
        justifyContent:'center'
    },
    sureButtonView:{
        height:width*0.1,
        width:width*0.8,
        backgroundColor:'#216fd0',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    }
});