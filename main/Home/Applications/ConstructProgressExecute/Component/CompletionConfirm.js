/**
 * Created by zhubin on 17/5/12.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from '../../../../Component/StatusBar'

const {width} = Dimensions.get('window');

export default class CompletionConfirm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="设备检测"/>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务责任人</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>潘俊涛</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前状态</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>执行中</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务性质</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>设备检验</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>标准工期</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>1</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>进度比例</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>80%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实施人员</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>潘俊涛</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>表单状态</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>--</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>2017-01-07</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>2017-02-07</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>2017-01-07</Text>
                        </View>
                        <View style={styles.divide}/>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前完成情况</Text>
                        </View>
                        <View style={styles.textArea}>
                            <Text>描述文字</Text>
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

    submit() {}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    content: {
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.12 * width,
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    textArea: {
        padding: 0.02 * width,
        height: 0.36 * width
    },
    blank: {
        flex: 1
    },
    textColor: {
        color: '#216fd0'
    },
    labelColor: {
        color: '#5476a1'
    },
    divide: {
        height: 0.02 * width,
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
    }
});