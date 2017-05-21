/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import EditProcess from "../EditProcess";
import EnsureComplete from "../EnsureComplete";
const {width}  = Dimensions.get('window');

export default class ModalCell extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                <Image style={styles.imgStyle}
                       source={this.props.src}/>
                <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }

    skipPage(){
        this.props.hiddenModal()
        if(this.props.name === '填报进展'){
            this.props.navigator.push({
                name:'EditProcess',
                component:EditProcess
            })
        }else if(this.props.name === '确认完成'){
            this.props.navigator.push({
                name:'EnsureComplete',
                component:EnsureComplete
            })
        }
    }
}

const styles = StyleSheet.create({
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection:'row',
        height:width*0.14,
        alignItems:'center',
        borderColor:'#ddd',
        borderBottomWidth:1
    },
    imgStyle: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});
