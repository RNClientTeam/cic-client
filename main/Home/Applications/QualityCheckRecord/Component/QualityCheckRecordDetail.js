/**
 * Created by zhubin on 17/5/25.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import KeyValueRight from "../../../../Component/KeyValueRight"
import KeyTime from "../../../../Component/KeyTime"

const {width} = Dimensions.get('window');

export default class QualityCheckRecordDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查纪录编辑"/>
                <ScrollView>
                    <KeyValueRight propKey="检验任务" readOnly={true} defaultValue="质量检查计划1>"/>
                    <KeyValueRight propKey="工程工号" readOnly={true} defaultValue="CX_DS14034"/>
                    <KeyValueRight propKey="项目名称" readOnly={true} defaultValue="龙泽苑D区配电室改造工程"/>
                    <KeyValueRight propKey="当前状态" readOnly={true} defaultValue="执行中"/>
                    <KeyValueRight propKey="工程子项名称" readOnly={true} defaultValue="项目实施计划任务"/>
                    <KeyValueRight propKey="工程节点" readOnly={true} defaultValue="施工进场"/>
                    <KeyTime propKey="检验时间"/>
                    <KeyValueRight propKey="检验人" readOnly={true} defaultValue="王娜>"/>
                    <View style={styles.textArea}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>
                                检查结果
                            </Text>
                        </View>
                        <View style={styles.textContent}>
                            <TextInput
                                multiline = {true}
                                numberOfLines = {4}
                                placeholder="请填写"
                                style={{backgroundColor: 'white', height: 0.20 * width }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.actionPanel}>
                    <TouchableOpacity onPress={() => this.submit()}>
                        <View style={[styles.button, {backgroundColor: "#02c088"}] }>
                            <Text style={styles.buttonText}>保存并提交</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.submit()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    submit() {

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    actionPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        width: 0.4 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width*0.02,
        marginRight: width*0.02,
        marginBottom: width*0.01,
        marginTop: width*0.05,
        borderRadius: 5
    },
    row: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',

    },
    buttonText: {
        color: 'white'
    },
    labelColor: {
        color: '#5476a1'
    },
    textArea: {
        marginTop: 0.02 * width,
        backgroundColor: 'white'
    },
    textContent: {
        padding: 0.02 * width
    }
});