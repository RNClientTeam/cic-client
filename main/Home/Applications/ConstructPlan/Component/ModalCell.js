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
const {width}  = Dimensions.get('window');

export default class ModalCell extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.moreOperationsCell} >
                <Image style={styles.imgStyle}
                       source={require('../../../../../resource/imgs/home/constuctPlan/editComplete.png')}/>
                <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>填报进展</Text>
            </TouchableOpacity>
        )
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
