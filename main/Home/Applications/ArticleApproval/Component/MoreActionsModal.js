/**
 * Created by zhubin on 17/5/15.
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
                    <TouchableOpacity onPress={() => {this.create()}}>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/createItem.png')}/>
                            <Text>预览文件</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.actionRow}>
                            <Image style={styles.img}
                                   source={require('../../../../../resource/imgs/home/applications/approvalIcon.png')}/>
                            <Text>提交审核</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    create() {
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
    img: {
        width:width * 0.1,
        height:width * 0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});