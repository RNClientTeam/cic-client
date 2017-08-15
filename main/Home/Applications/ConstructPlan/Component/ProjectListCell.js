/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class ProjectListCell extends Component{
    constructor(props){
        super(props);
        this.state={
            isSelected:this.props.data.selected
        }
    }

    render(){
        return(
            <TouchableOpacity style={[styles.container,this.state.isSelected?{backgroundColor:'#f1f5fa'}:{backgroundColor:'#fff'}]}
                              onPress={()=>{this.props.choiceThisCell();this.setState({isSelected:!this.state.isSelected})}}>
                <View style={styles.leftView}>
                    <Text numberOfLines={1} style={styles.numberStyle}>{this.props.data.xmgh}</Text>
                    <Text numberOfLines={1}>{this.props.data.zxmc}</Text>
                </View>
                <View style={styles.imgView}>
                    <Image style={styles.imgStyle} source={this.state.isSelected?require('../../../../../resource/imgs/home/constuctPlan/choiced.png'):require('../../../../../resource/imgs/home/constuctPlan/unchoiced.png')}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:width*0.23,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
    },
    imgStyle:{
        width:width*0.05,
        height:width*0.05
    },
    leftView:{
        flex:8,
        justifyContent:'center'
    },
    imgView:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    numberStyle:{
        fontSize:width*0.047,
        color:"#216fd0",
        marginBottom:width*0.02
    }
});