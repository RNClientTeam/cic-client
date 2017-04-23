"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class User extends Component {
    render() {
        return(
            <View style={styles.viewSty}>
                <Text>
                    User
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
