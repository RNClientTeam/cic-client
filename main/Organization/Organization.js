"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Organization extends Component {
    render() {
        return(
            <View style={styles.viewSty}>
                <Text>
                    Organization
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
