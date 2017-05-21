/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class KeyPercentage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.keyStyle}>{this.props.propKey}</Text>
                <View style={styles.percentageView}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        keyboardType="number-pad"
                    />
                    <Text style={styles.keyStyle}>%</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.12,
        paddingLeft:width*0.02,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:width*0.02,
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    keyStyle:{
        color:'#5476a1'
    },
    percentageView:{
      flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        borderWidth:1,
        borderColor:'#5476a1',
        height:width*0.08,
        width:width*0.2,
        borderRadius:5,
        marginRight:width*0.02
    }
});