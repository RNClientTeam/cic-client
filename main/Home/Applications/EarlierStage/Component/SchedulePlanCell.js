/**
 * Created by fan on 2017/05/02.
 * 前期进度计划详情页 - 进度计划cell
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

export default class SchedulePlanCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                <View style={styles.aboutProject}>
                    <View style={styles.numState}>
                        <Text style={{color:'#216fd0',fontSize:width*0.045}}>{this.props.data.number}</Text>
                        <View style={styles.stateView}>
                            <Text style={styles.stateText}>{this.props.data.state}</Text>
                        </View>
                    </View>
                    <Text style={styles.projectName}>{this.props.data.planName}</Text>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.principal}</Text>
                    <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.department}</Text>
                    <Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.schedule}</Text>
                    <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.time}</Text>
                    <TouchableOpacity onPress={this.editPress.bind(this)} style={styles.editTouch}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                            style={styles.editImg} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    skipPage() {

    }

    editPress() {

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
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.1,
        alignItems: 'center',
    },
    projectName: {
        height: width * 0.1,
        lineHeight: 21
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color:'#4f74a3'
    },
    stateView: {
        backgroundColor: '#fe9a25',
        width:width*0.12,
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03},
    editTouch: {
        position: 'absolute',
        top: 22,
        right: 18,
    },
    editImg: {
        width: 22,
        height: 25
    }

});
