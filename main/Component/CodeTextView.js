/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    WebView,
    Text
} from 'react-native'
import StatusBar from "./StatusBar";
const {width}  = Dimensions.get('window');

export default class CodeTextView extends Component{

    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator}/>
                <Text>{this.props.content}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});
