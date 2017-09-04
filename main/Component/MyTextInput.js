"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions
} from 'react-native';

var {height} = Dimensions.get('window');

export default class MyTextInput extends Component {
    render() {
        return(
            <View style={[styles.viewSty,this.props.style]}>
                <View style={styles.imgView}>
                    <Image source={this.props.leftImageSource} style={styles.img}/>
                </View>
                <TextInput
                    style={styles.textSty}
                    placeholder={this.props.placeholder}
                    autoCorrect={false}
                    defaultValue={this.props.defaultValue||''}
                    autoCapitalize="none"
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
    },
    imgView: {
        borderRightWidth: 1,
        borderRightColor: '#dadada',
        width: height*0.0705,
        height: height*0.0705,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 18,
        height: 22,
        marginHorizontal: 10
    },
    textSty: {
        flex:1,
        paddingLeft:10
    }
})
