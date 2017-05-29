/**
 * Created by zhubin on 17/5/29.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import KeyValueLeft from "../../../../Component/KeyValueLeft"

const {width} = Dimensions.get('window');

export default class SecurityApproval extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="项目安全检查记录审核"/>
                <ScrollView>
                    <KeyValueLeft propKey="检查任务" propValue="质量检查任务1"/>
                    <KeyValueLeft propKey="项目编号" propValue="CX-DS140188-1032"/>
                    <KeyValueLeft propKey="项目名称" propValue="十三陵基地配电增容"/>
                    <KeyValueLeft propKey="工程子项名称" propValue="工程子项1"/>
                    <KeyValueLeft propKey="工程节点" propValue="施工进场"/>
                    <KeyValueLeft propKey="检查时间" propValue="2017/05/30"/>
                    <KeyValueLeft propKey="检查人" propValue="朱彬"/>
                    <KeyValueLeft propKey="问题类别" propValue="施工安装问题"/>
                    <KeyValueLeft propKey="检查结果" propValue="施工安装存在问题"/>
                    <View style={styles.divide}/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>附件</Text>
                    </View>
                    <View style={styles.attachment}>
                        <View style={styles.attachmentLabel}>
                            <Text style={{color: '#666'}}>文件名.pdf</Text>
                        </View>
                        <View style={styles.attachmentContent}>
                            <View style={styles.square}>
                                <Text style={{fontSize: 0.1 * width, color: "#d2d2d2"}}>+</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        marginTop: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    row: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    divide: {
        height: 0.02 * width
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white'
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    attachmentContent: {
        paddingTop: 0.02 * width,
        paddingBottom: 0.02 * width
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    }
});