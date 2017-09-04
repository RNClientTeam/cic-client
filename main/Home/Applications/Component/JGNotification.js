"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class JGNotification extends Component {
    render() {
        return (
            <Modal animationType={'fade'} visible={this.props.showNotification} transparent={true} onRequestClose={()=>{}}>
                <View style={styles.viewContainerStyle}>
                    <View style={styles.contentView}>
                        <View style={styles.titleView}>
                            <Text style={{color:'#1d1d1d',fontSize:16,fontWeight:'500'}}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.contentsView}>
                            <Text style={{color:'#1d1d1d',fontSize:14}}>
                                {this.props.content}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.insureButtonStyle} onPress={()=>this.props.hideNotification()}>
                            <Text style={{color:'#fff'}}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }


}

const styles = StyleSheet.create({
    viewContainerStyle:{
        backgroundColor:'rgba(0,0,0,0.3)',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    contentView:{
        width:width*0.9,
        backgroundColor:'#fff',
        minHeight:200,
        borderRadius:5,
    },
    titleView:{
        alignItems:'center',
        minHeight:width*0.1,
        justifyContent:'center'
    },
    contentsView:{
        paddingLeft:width*0.03
    },
    insureButtonStyle:{
        position:'absolute',
        bottom:10,
        left:width*0.35,
        backgroundColor:'#355fdd',
        padding:10,
        width:width*0.2,
        alignItems:'center',
        borderRadius:5
    }
});
