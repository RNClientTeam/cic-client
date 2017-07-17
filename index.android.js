import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Entrance from './main/Entrance.js';

class cic_client extends Component {
    render() {
        return (
            <Entrance />
        );
    }
}

AppRegistry.registerComponent('cic_client', () => cic_client);
