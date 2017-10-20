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
import StatusBar from '../../../../Component/StatusBar.js';
import ChoiceDate from '../../../../Component/ChoiceDate.js';
import Toast from 'react-native-simple-toast';
const {width} = Dimensions.get('window');

export default class CompletionForm extends Component {
    constructor(props) {
        super(props);
        this.inputPercent='';
        this.inputInfo = '';
        this.state = {
            startTime: '',
            endTime: '',
            showEndTime: false
        }
    }

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
                                <TextInput style={styles.input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(value) => {
                                        this.inputPercent=value;
                                        if (value == 100 ){
                                            this.setState({showEndTime: true});
                                        } else if (this.state.showEndTime) {
                                            this.setState({showEndTime: false});
                                        }
                                    }}/>
                            </View>
                            <View style={{flex: 0.1}}/>
                            <Text style={[styles.textColor]}>%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate showDate={this.state.startTime} changeDate={(date)=>{this.setState({startTime:date})}}/>
                        </View>
                        {
                            this.state.showEndTime &&
                            <View style={styles.row}>
                                <Text style={[styles.labelColor]}>实际完成时间</Text>
                                <View style={styles.blank}/>
                                <ChoiceDate showDate={this.state.endTime} changeDate={(date)=>{this.setState({endTime:date})}}/>
                            </View>
                        }
                        <View style={styles.textArea}>
                            <Text style={styles.labelColor}>当前完成情况*</Text>
                            <TextInput
                                style={{height: 0.22 * width,
                                    backgroundColor: '#f2f2f2', borderRadius: 5,
                                    marginTop: 0.02 * width}}
                                    multiline = {true}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(value) => {this.inputInfo = value;}}
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
        if (this.inputPercent.length === 0 || parseInt(this.inputPercent) < 0 || parseInt(this.inputPercent) > 100 || parseInt(this.inputPercent) !== parseFloat(this.inputPercent)) {
            Toast.show('请输入0~100的整数');
        } else if (this.state.startTime.length === 0) {
            Toast.show('请选择实际开始时间');
        } else if (this.state.endTime.length === 0 && this.state.showEndTime) {
            Toast.show('请选择实际结束时间');
        } else if (this.inputInfo.length === 0) {
            Toast.show('请输入完成情况');
        } else {
            axios.post('/psmSgjdjh/addSgrwWcqk', {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                id: this.props.rwid,
                wcqk: this.inputInfo,
                wcbl: this.inputPercent,
                sjkssj: this.state.startTime,
                sjjssj: this.state.endTime,
                callID: true
            }).then((res) => {
                console.log(res);
                if (res.code === 1) {
                    Toast.show('提交成功');
                    const self = this;
                    let timer = setTimeout(() => {
                        self.props.navigator.pop();
                        self.props.reloadInfo();
                        clearTimeout(timer);
                    }, 1000);
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
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
        textAlign: 'center',
        padding: 0
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
