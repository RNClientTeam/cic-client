/**
 * Created by fan on 2017/5/18.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import MoreOperationsCell from "./MoreOperationsCell";
const {width} = Dimensions.get('window');
export default class MoreOperation extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.containerView}>
                    <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                        <Image style={styles.imgStyle}
                               source={require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png')}/>
                        <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>填报结果</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                        <Image style={styles.imgStyle}
                               source={require('../../../../../resource/imgs/home/applications/effectiveAction.png')}/>
                        <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>生效</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                        <Image style={styles.imgStyle}
                               source={require('../../../../../resource/imgs/home/applications/stopAction.png')}/>
                        <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>删除</Text>
                    </TouchableOpacity>
                </View>
                {/*
                 <View style={styles.buttonView}>
                 <TouchableOpacity style={[styles.button,{backgroundColor:'#fb5560'}]}>
                 <Text style={{color:'#fff'}}>删除</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={[styles.button, {backgroundColor:'#3999fd'}]}>
                 <Text style={{color:'#fff'}}>修改</Text>
                 </TouchableOpacity>
                 </View>
                 */}
            </TouchableOpacity>
        )
    }

    skipPage(){
        this.props.closeModal();
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end'
    },
    containerView: {
        width: width,
        backgroundColor: '#fff'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    button:{
        width:width*0.29,
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
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
