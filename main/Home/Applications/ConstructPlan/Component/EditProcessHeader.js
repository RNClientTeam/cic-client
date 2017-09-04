/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');

export default class EditProcessHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={{fontWeight:'500'}}>项目名称</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{color:'#ababab'}}>{this.props.xmmc}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: width * 0.18,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    textView: {
        paddingLeft: width * 0.02,
        height:width*0.08,
        justifyContent:'center'
    }
});