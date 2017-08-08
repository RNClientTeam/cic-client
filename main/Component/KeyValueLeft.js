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
                <Text style={[styles.textKey,{color:'#5476a1'}]} numberOfLines={1}>{this.props.propsKey}</Text>
                <Text style={styles.textValue} numberOfLines={2}>{this.props.propsValue}</Text>
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
    textKey: {
        width: width * 0.4,
        marginLeft: 15
    },
    textValue: {
        width: width * 0.6 - 25
    }
});
