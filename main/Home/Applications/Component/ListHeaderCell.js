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
const {width}  = Dimensions.get('window');

export default class ListHeaderCell extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontWeight:'500',fontSize:width*0.04}}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.12,
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    }
});
