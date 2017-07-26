"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class ExamineAndApprove extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="审批" navigator={this.props.navigator}/>
                <View style={styles.itemStyle}>
                    <Text style={styles.keyText}>当前步骤</Text>
                    <Text style={{fontSize:15,color:'#3d3d3d'}}>主管领导</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.keyText}>当前操作</Text>
                    <Text style={{fontSize:15,color:'#999'}}>请选择></Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.keyText}>审批意见</Text>
                    <TextInput
                        style={styles.textInputSty}
                        multiline={true}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        placeholder="输入审批意见"/>
                </View>
                <View style={styles.footerBtn}>
                    <TouchableOpacity onPress={this.monitor.bind(this)} style={styles.btnSty}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/structure.png')} style={styles.img}/>
                        <Text style={styles.btnText}>流程监控</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.check.bind(this)} style={[styles.btnSty, {marginLeft:1}]}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/schedule.png')} style={styles.img}/>
                        <Text style={styles.btnText}>查看已完成步骤</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.bottomBtn} onPress={this.makeSure.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //监控流程
    monitor() {

    }

    //查看
    check() {

    }

    //确定按钮
    makeSure() {

    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    itemStyle: {
        width: width,
        height: 0.0735 * height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 1,
        backgroundColor: '#fff'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    footerView: {
        width: width,
        height: 0.2489*height,
        paddingHorizontal: 15,
        paddingTop: 18,
        paddingBottom: 15,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    textInputSty: {
        flex:1,
        backgroundColor:'#f1f1f1',
        borderRadius: 5,
        marginTop: 18,
        fontSize: 15,
        paddingLeft: 10,
    },
    footerBtn: {
        width: width,
        height: 0.091*height,
        flexDirection: 'row'
    },
    btnSty: {
        flex:1,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBtn: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 15,
        borderRadius: 5,
        backgroundColor: '#216fd0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.0675 * height
    },
    btnText: {
        fontSize: 15,
        color: '#216fd0',
        marginLeft: 6
    },
    img: {
        width: 18,
        height: 18
    }
})
