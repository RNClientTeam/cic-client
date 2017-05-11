/**
 * Created by zhubin on 17/5/12.
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

const {width} = Dimensions.get('window');

export default class MoreActionsModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.goConfirm()}}>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/modification.png')}/>
                            <Text>填报完成情况</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.confirm()}}>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/approvalIcon.png')}/>
                            <Text>确认完成</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    goConfirm() {

    }
    confirm() {

    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end'
    },
    container: {
        backgroundColor: 'white'
    },
    actionRow: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        height: 0.12 * width,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
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
    img: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});