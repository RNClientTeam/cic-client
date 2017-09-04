/**
 * Created by zhubin on 17/5/9.
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

import MyPlanDetail from './MyPlanDetail'

const {width} = Dimensions.get('window');


export default class MyPlanCell extends Component {
    render() {
        return (
            <View style={styles.earlierStageListCell}>
                <View style={styles.aboutProject}>
                    <Text style={{color:'#216fd0',fontSize:width*0.04}}>
                        {this.props.data.rwmc}
                    </Text>
                    <View style={[styles.stateView, {backgroundColor: this.props.stateBg || '#fe9a25'}]}>
                        <Text style={styles.stateText}>{this.props.data.rwztmc}</Text>
                    </View>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.zrrmc}</Text>
                    <Text style={[{width: width * 0.5}, styles.textStyle]}>
                        {this.props.data.jhkssj + (this.props.data.jhjssj ? ' / ' + this.props.data.jhjssj : '')}
                    </Text>
                    <View style={styles.blank}/>
                    <TouchableOpacity
                        onPress={ () => this.props.setModalVisible(this.props.data.id) }
                        style={styles.editTouch}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                               style={styles.editImg} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        minHeight: width * 0.12,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        paddingTop: width * 0.03,
        paddingBottom: width * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.12,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    projectName: {
        height: width * 0.1,
        lineHeight: 21
    },
    textStyle: {
        color:'#4f74a3'
    },
    stateView: {
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03
    },
    blank: {
        flex: 1,
    },
    editImg: {
        width: 22,
        height: 25
    }

});
