/**
 * Created by zhubin on 17/6/1.
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
import KeyValueRight from "../../../../Component/KeyValueRight"
import LabelTextArea from "../../../../Component/LabelTextArea"

const {width} = Dimensions.get('window');

export default class AddModification extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新增整改任务"/>
                <ScrollView>
                    <KeyValueRight propKey="问题类别" readOnly={true} defaultValue="质量检查计划1>"/>
                    <KeyValueRight propKey="整改责任人" readOnly={true} defaultValue="CX_DS14034"/>
                    <KeyValueRight propKey="要求完成时间" readOnly={true} defaultValue="龙泽苑D区配电室改造工程"/>
                    <View style={styles.divide}/>
                    <LabelTextArea label="检查结果"/>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    divide: {
        height: 0.02 * width
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
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        marginBottom: width * 0.02,
        marginTop: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});