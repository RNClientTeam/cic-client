/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');

export default class KeySelect extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.keyStyle}>{this.props.propKey}</Text>
                <Text style={styles.selectStyle}>请选择 ></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.12,
        paddingLeft:width*0.02,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:width*0.02,
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    keyStyle:{
        color:'#5476a1'
    },
    selectStyle:{
        color:'#9c9c9c'
    }
});