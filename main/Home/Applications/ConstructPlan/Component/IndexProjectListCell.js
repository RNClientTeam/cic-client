/**
 * Created by Nealyang on 2017/5/16.
 */
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
const {width}  = Dimensions.get('window');

export default class IndexProjectListCell extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.containerStyle}>
                <View style={styles.topView}
                >
                    <Text style={styles.topText}> 任务一</Text>
                    <View style={styles.stateStyle}>
                        <Text style={{color:'#fff',fontSize:width*0.036}}>执行中</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>驾驶轮</Text>
                    <Text style={styles.bottomText}>进度10%</Text>
                    <Text style={styles.bottomText}>2017-09-11-2017-01-11</Text>
                    <TouchableOpacity>
                        <Image style={styles.editImg} source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#fff',
        width:width*0.96,
        marginLeft:width*0.02,
        marginTop:width*0.03,
        marginBottom:width*0.03
    },
    topText:{
        color:'#216fd0'
    },
    topView:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:width*0.1,
        alignItems:'center',
        padding:width*0.02
    },
    bottomView:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f6f9fa',
        alignItems:'center',
        padding:width*0.02,
        height:width*0.14
    },
    bottomText:{
        color:'#4f74a3',
        fontSize:width*0.033
    },
    editImg:{
        width:width*0.06,
        height:width*0.06
    },
    stateStyle:{
        width:width*0.14,
        height:width*0.05,
        backgroundColor:'#fe9a25',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    }
});