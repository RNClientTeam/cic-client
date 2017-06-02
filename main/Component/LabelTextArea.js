/**
 * Created by zhubin on 17/5/26.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput
} from 'react-native'

const {width} = Dimensions.get('window');

export default class LabelTextArea extends Component {
    render() {
        return (
            <View style={styles.textArea}>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>
                        {this.props.label}
                    </Text>
                </View>
                <View style={styles.textContent}>
                    <TextInput
                        multiline = {true}
                        numberOfLines = {4}
                        placeholder="请填写"
                        style={{height: 0.20 * width }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',

    },
    labelColor: {
        color: '#5476a1'
    },
    textArea: {
        backgroundColor: 'white'
    },
    textContent: {
        padding: 0.02 * width
    }
});