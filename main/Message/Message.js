"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');
/**
 *测试日历
 */
import Calendar from './Component/Calendar'
import StatusBar from '../Component/StatusBar'
export default class Message extends Component {
    render() {
        return (
            <View style={styles.viewSty}>
                <StatusBar/>
                <Calendar/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1
    }
})