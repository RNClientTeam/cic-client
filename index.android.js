import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class cic_client extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          首页
          
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('cic_client', () => cic_client);
