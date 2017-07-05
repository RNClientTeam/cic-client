/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class ProjectTagName extends Component{
    render(){
        return(
            <View style={styles.contianerStyle}>
                <View style={[styles.textContainer,{width:((this.props.name&&this.props.name.length)*width*0.039+width*0.02)}]}>
                    <Text style={{color:'#fff',fontSize:width*0.035}} >{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contianerStyle:{
        width:width,
        height:width*0.06,
        marginTop:width*0.04,
        marginBottom:width*0.02
    },
    textContainer:{
        height:width*0.06,
        backgroundColor:'#216fd0',
        justifyContent:'center',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        paddingLeft:width*0.02
    }
});