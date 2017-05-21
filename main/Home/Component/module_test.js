'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class AddQualityCehck extends Component{
    render(){
        return(
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});