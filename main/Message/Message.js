"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {width} = Dimensions.get('window');
/**
 *测试日历
 */
import Calendar from '../Home/Applications/ConstructPlan/Component/Calendar'
import StatusBar from '../Component/StatusBar'
export default class Message extends Component {
    render() {
        return (
            <View style={styles.viewSty}>
                <StatusBar notBack={true}/>
                <Calendar/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1,
    }
});
