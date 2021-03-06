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
import BottomSaveButton from "./BottomSaveButton";
const {width}  = Dimensions.get('window');

export default class Remark extends Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={{color:'#5476a1'}}>{this.props.propKey}</Text>
                </View>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text)=>this.props.textChange(text)}
                    multiline={true}
                    autoFocus={true}
                    placeholder='请填写备注信息'
                    underlineColorAndroid="transparent"
                    textAlignVertical="top"
                    editable={this.props.remark === ''}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.42,
        backgroundColor:'#fff',
    },
    textView:{
        height:width*0.08,
        justifyContent:'center',
        paddingLeft:width*0.02
    },
    textInputStyle:{
        width:width*0.8,
        height:width*0.3,
        marginLeft:width*0.1,
        backgroundColor:"#f2f2f2",
        borderRadius:5,
        fontSize:14,
        marginTop:width*0.02
    }
});