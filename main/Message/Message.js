"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Message extends Component {
    render() {
        return(
            <View style={styles.viewSty}>
                <Text>
                    Message
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
