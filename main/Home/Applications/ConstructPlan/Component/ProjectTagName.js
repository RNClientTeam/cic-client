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
                <View style={[styles.textContainer, {width:(this.props.name.length*width*0.035+width*0.04)<width*0.8?(this.props.name.length*width*0.035+width*0.04):width*0.8}]}>
                    <Text style={{color:'#fff',fontSize:width*0.035}} numberOfLines={2}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contianerStyle:{
        width:width,
        marginTop:width*0.04,
        marginBottom:width*0.02
    },
    textContainer:{
        backgroundColor:'#216fd0',
        justifyContent:'center',
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        paddingHorizontal:width*0.02,
        paddingVertical: 5
    }
});
