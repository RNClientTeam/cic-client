/**
 * Created by zhubin on 17/5/10.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

import StatusBar from '../../../../Component/StatusBar'

const {width} = Dimensions.get('window');

export default class MyPlanDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新建工作任务"/>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>工作任务</Text>
                            <View style={styles.blank}/>
                            <Text>配电设备检测</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务责任人</Text>
                            <View style={styles.blank}/>
                            <Text>张三></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前状态</Text>
                            <View style={styles.blank}/>
                            <Text>新建任务</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务性质</Text>
                            <View style={styles.blank}/>
                            <Text>一检></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>标准工期</Text>
                            <View style={styles.blank}/>
                            <Text>5天</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实施人员</Text>
                            <View style={styles.blank}/>
                            <Text>张三></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>表达状态</Text>
                            <View style={styles.blank}/>
                            <Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-05-01</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-05-07</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.save()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    save() {

    }
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
        height: 0.12 * width,
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1
    },
    blank: {
        flex: 1
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
    labelColor: {
        color: '#5476a1'
    }
});