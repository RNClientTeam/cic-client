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
            <TouchableOpacity style={styles.earlierStageListCell} onPress={() => this.skipPage()}>
                <View style={styles.aboutProject}>
                    <Text style={{color:'#216fd0',fontSize:width*0.045}}>{this.props.data.period}</Text>
                    <View style={styles.blank}/>
                    <View style={styles.stateView}>
                        <Text style={styles.stateText}>{this.props.data.state}</Text>
                    </View>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.principal}</Text>
                    <Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.time}</Text>
                    <View style={styles.blank}/>
                    <TouchableOpacity onPress={()=>{this.props.setModalVisible()}} style={styles.editTouch}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                               style={styles.editImg} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    skipPage() {
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail'
        });
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
        height: width * 0.12,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor: '#fe9a25',
        width:width*0.17,
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center'
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03
    },
    blank: {
        flex: 1
    },
    editImg: {
        width: 22,
        height: 25
    }

});
