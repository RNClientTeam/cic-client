/**
 * Created by zhubin on 17/5/10.
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
                    <TouchableOpacity>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/createItem.png')}/>
                            <Text>新建</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/modification.png')}/>
                            <Text>修改</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/approvalIcon.png')}/>
                            <Text>提交审核</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={[styles.button,{backgroundColor:'#fb5560'}]}>
                            <Text style={{color:'#fff'}}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor:'#3999fd'}]}>
                            <Text style={{color:'#fff'}}>生效</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
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