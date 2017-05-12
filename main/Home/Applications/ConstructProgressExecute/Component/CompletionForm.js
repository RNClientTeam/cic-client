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
import ChoiceDate from '../../../../Component/ChoiceDate'

const {width} = Dimensions.get('window');

export default class CompletionForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="完成情况表单"/>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.bold]}>设备检测</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前进度比例*</Text>
                            <View style={styles.blank}/>
                            <View>
                                <TextInput style={styles.input}/>
                            </View>
                            <View style={{flex: 0.1}}/>
                            <Text style={[styles.textColor]}>%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实际完成时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate/>
                        </View>
                        <View style={styles.textArea}>
                            <Text style={styles.labelColor}>当前完成情况*</Text>
                            <TextInput
                                style={{height: 0.22 * width,
                                    backgroundColor: '#f2f2f2', borderRadius: 5,
                                    marginTop: 0.02 * width}}
                                multiline = {true}
                                placeholder="在此输入"/>
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

    submit() {

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
    blank: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.12 * width,
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        backgroundColor: 'white'
    },
    input: {
        height: 0.08 * width,
        width: 0.2 * width,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#216fd0',
        textAlign: 'center'
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
    textArea: {
        padding: 0.02 * width,
        height: 0.36 * width,
        backgroundColor: 'white'
    },
    bold: {
        fontWeight: 'bold'
    },
    textColor: {
        color: '#216fd0'
    },
    labelColor: {
        color: '#5476a1'
    }
});