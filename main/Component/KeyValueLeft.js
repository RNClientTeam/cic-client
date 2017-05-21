/**
 * Created by Nealyang on 2017/5/6.
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

export default class KeyValueLeft extends Component {
    render() {
        return (
            <View style={styles.keyValue}>
                <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>{this.props.propsKey}</Text>
                <Text style={styles.textStyle} numberOfLines={1}>{this.props.propsValue}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyValue: {
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    textStyle: {
        flex: 1,
        marginLeft:width*0.02,
    }
});