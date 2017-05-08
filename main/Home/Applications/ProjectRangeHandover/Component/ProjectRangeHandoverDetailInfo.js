/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width}  = Dimensions.get('window');

export default class ProjectRangeHandoverDetailInfo extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="分享工程"/>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        临时低压柜安装
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        临时低压柜安装
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        临时低压柜安装
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        临时低压柜安装
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    textContainer:{
        height:width*0.12,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingLeft:width*0.02,
        justifyContent:'center'
    },
    textStyle:{

    }
});