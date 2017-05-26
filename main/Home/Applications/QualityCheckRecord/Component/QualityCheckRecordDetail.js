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
    TextInput,
    Switch
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import KeyValueRight from "../../../../Component/KeyValueRight"
import KeyTime from "../../../../Component/KeyTime"
import LabelTextArea from "../../../../Component/LabelTextArea"

const {width} = Dimensions.get('window');

export default class QualityCheckRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinished: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查纪录编辑"/>
                <ScrollView>
                    <KeyValueRight propKey="检验任务" readOnly={true} defaultValue="质量检查计划1>"/>
                    <KeyValueRight propKey="工程工号" readOnly={true} defaultValue="CX_DS14034"/>
                    <KeyValueRight propKey="项目名称" readOnly={true} defaultValue="龙泽苑D区配电室改造工程"/>
                    <KeyValueRight propKey="工程子项名称" readOnly={true} defaultValue="项目实施计划任务"/>
                    <KeyValueRight propKey="工程节点" readOnly={true} defaultValue="施工进场"/>
                    <KeyTime propKey="检验时间"/>
                    <KeyValueRight propKey="检验人" readOnly={true} defaultValue="王娜>"/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>附件</Text>
                        <View style={styles.blank}/>
                        <Image style={styles.icon} source={require('../../../../../resource/imgs/home/attachment.png')}/>
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
                    <LabelTextArea label="整改要求"/>
                    <View style={styles.divide}/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            是否已现场整改
                        </Text>
                        <View style={styles.blank}/>
                        <Switch onValueChange={(value) => this.toggle(value)}
                                value={this.state.isFinished}/>
                    </View>
                    <View style={styles.divide}/>
                    <KeyTime propKey="创建时间"/>
                    <KeyValueRight propKey="创建人" readOnly={true} defaultValue="王蒙"/>

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
    toggle(value) {
        this.setState({isFinished: value})
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
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    blank: {
        flex: 1
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
    },
    divide: {
        height: 0.02 * width
    },
    icon: {
        width:width * 0.05,
        height:width * 0.05
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