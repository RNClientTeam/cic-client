'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import AddShareData from "./AddShareData";
const {width}  = Dimensions.get('window');

export default class HomeHeader extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.shareDataAdd} onPress={this.skipPage.bind(this)}>
                <Image style={styles.imgStyle} source={require('../../../../../resource/imgs/home/earlierStage/addData.png')}/>
                <Text style={styles.textStyle}>添加共享资料</Text>
            </TouchableOpacity>
        )
    }

    skipPage(){
        this.props.navigator.push({
            name:'AddShareData',
            component:AddShareData
        })
    }
}

const styles = StyleSheet.create({
    shareDataAdd:{
        width:width,
        height:width * 0.12,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor: 'white'
    },
    imgStyle:{
        width:width*0.07,
        height:width*0.07
    },
    textStyle:{
        color:'#216fd0',
        fontSize:width*0.035,
        marginLeft:width*0.02
    }
});