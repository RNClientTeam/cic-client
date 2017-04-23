"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput
} from 'react-native';

export default class MyTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

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
                    onChangeText={(text)=>this.setState({text})}
                    value={this.state.text}
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
