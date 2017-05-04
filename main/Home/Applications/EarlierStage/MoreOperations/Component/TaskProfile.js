/**
 * Created by zhubin on 17/5/4.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const {width, height}  = Dimensions.get('window');

export default class TaskProfile extends Component {
    render() {
        return (
            <View style={styles.viewSty}>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.label}>责任人</Text>
                        <Text>蔡营</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>当前状态</Text>
                        <Text>执行中</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>计划开始时间</Text>
                        <Text>2017-02-16</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>计划完成时间</Text>
                        <Text>2017-02-16</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>实际开始时间</Text>
                        <Text>2017-02-16</Text>
                    </View>
                    <View style={{height: width*0.02, backgroundColor: '#f2f2f2'}}/>
                    <View style={styles.row}>
                        <Text style={{color: '#5476a1'}}>主要工作内容详细说明</Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text>无</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    content: {
        backgroundColor: '#fdfdfd',
        marginTop: 0.02*width
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    label: {
        color: '#5476a1',
        width: 0.3*width,
    },
    textArea: {
        height: height*0.15,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
    }
});