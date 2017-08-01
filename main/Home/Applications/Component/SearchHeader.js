/**
 * Created by Nealyang on 2017/5/1.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
const {width} = Dimensions.get('window');

export default class EarlierStageListHeader extends Component {
    render() {
        return (
            <View style={styles.earlierStageListHeader}>
                <TextInput
                    onChangeText={(text)=>this.props.changeZxmc(text)}
                    style={styles.textInput} underlineColorAndroid="transparent"
                    placeholder={this.props.tag==='Ssjdjh'?'请输入负责人名称':'请输入项目名称'}/>
                <TouchableOpacity style={styles.imgViewStyle} onPress={()=>this.props.getData()}>
                    <Image style={styles.imgStyle} source={require('../../../../resource/imgs/home/earlierStage/search.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earlierStageListHeader:{
        backgroundColor:'transparent',
        width:width,
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
        height:width*0.11,
        flexDirection:'row',
        marginTop:width*0.02,
        marginBottom:width*0.02,
        zIndex:2,
    },
    textInput:{
        backgroundColor:'#fff',
        flex:11,
        borderWidth:1,
        borderColor:'#e2e2e2',
        height:width*0.1,
        paddingLeft: 0.02 * width
    },
    imgViewStyle:{
        backgroundColor:'#216fd0',
        flex:2,
        alignItems:'center',
        justifyContent:'center',
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
        height:width*0.1
    },
    imgStyle:{
        resizeMode:'contain',
        width:width*0.05
    }
});