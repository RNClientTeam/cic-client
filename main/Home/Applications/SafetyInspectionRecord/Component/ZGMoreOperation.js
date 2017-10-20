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
import AccomplishProgress from "./AccomplishProgress";

const {width} = Dimensions.get('window');
export default class ZGMoreOperation extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={() => {
                this.props.closeModal()
            }}>
                <View style={styles.containerView}>
                    {this.props.auth.editzgrw ?
                        <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this,'编辑')}>
                            <Image style={styles.imgStyle}
                                   source={require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png')}/>
                            <Text style={{color: '#6b6b6b', fontSize: width * 0.037}}>编辑</Text>
                        </TouchableOpacity> : null}
                    {
                        this.props.auth.tbzgqk ?
                            <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this,'填报完成情况')}>
                                <Image style={styles.imgStyle}
                                       source={require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png')}/>
                                <Text style={{color: '#6b6b6b', fontSize: width * 0.037}}>填报完成情况</Text>
                            </TouchableOpacity>
                            : null
                    }

                </View>
            </TouchableOpacity>
        )
    }

    skipPage(tag) {
        this.props.closeModal();
        this.props.navigator.push({
            name: "",
            component: AccomplishProgress,
            params: {
                type: tag,
                id: this.props.operateItem.id
            }
        })
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
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: width * 0.2,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: width * 0.29,
        backgroundColor: 'red',
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: width * 0.14,
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1
    },
    imgStyle: {
        width: width * 0.1,
        height: width * 0.1,
        marginLeft: width * 0.04,
        marginRight: width * 0.04
    }
});
