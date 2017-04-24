"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput
} from 'react-native';

import GesturePassword from 'react-native-gesture-password';
var Password1 = '1235789';

export default class GestureLogin extends Component {
    constructor() {
        super();
        this.state = {
            status: 'normal',
            message: 'Please input your password.'
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onEnd(password) {
        if (password == Password1) {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    render() {
        return(
            <GesturePassword
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}/>
        );
    }
}

const styles = StyleSheet.create({

})
