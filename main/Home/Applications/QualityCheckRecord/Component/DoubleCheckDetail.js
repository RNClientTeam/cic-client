/**
 * Created by zhubin on 17/6/2.
 */
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
import KeyValueLeft from "../../../../Component/KeyValueLeft"
import LabelTextArea from "../../../../Component/LabelTextArea"

const {width} = Dimensions.get('window');

export default class DoubleCheckDetail extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <KeyValueLeft propKey="检验任务" propValue="质量检查计划1>"/>
                    <KeyValueLeft propKey="工程工号" propValue="CX_DS14034"/>
                    <KeyValueLeft propKey="项目名称" propValue="龙泽苑D区配电室改造工程"/>
                    <KeyValueLeft propKey="工程子项名称" propValue="项目实施计划任务"/>
                    <KeyValueLeft propKey="工程节点" propValue="施工进场"/>
                    <KeyValueLeft propKey="检验时间" propValue="2017-05-15"/>
                    <KeyValueLeft propKey="检验人" propValue="王娜"/>
                    <KeyValueLeft propKey="问题类别" propValue="施工安装问题"/>
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
                    <LabelTextArea label="检查结果"/>
                    <View style={styles.divide}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    divide: {
        height: 0.02 * width
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
    },
    labelColor: {
        color: '#5476a1'
    }
});