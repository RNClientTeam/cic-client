"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput
} from 'react-native';

export default class MyTextInput extends Component {
    render() {
        return(
            <View style={[styles.viewSty,this.props.style]}>
                {
                    this.props.leftImageSource &&
                    <Image source={this.props.leftImageSource}/>
                }
                <TextInput
                    style={{flex:1, marginLeft:8}}
                    placeholder={this.props.placeholder}
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChangeText={(text)=>this.props.onChangeText(text)}
                    value={this.props.text}
                    secureTextEntry={this.props.secureTextEntry}
                    clearButtonMode='while-editing'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flexDirection: 'row',
        alignItems:'center'
    }
})
