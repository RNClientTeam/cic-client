/**
 * Created by zhubin on 17/5/12.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from '../../../../Component/StatusBar'
import Toast from 'react-native-simple-toast';
const {width} = Dimensions.get('window');
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

export default class TotalExecuteProfile extends Component {
    constructor(props) {
        super(props);
        this.inputJdbl = '';
        this.inputInfo = '';
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="总执行情况表单"/>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>项目总进度比例</Text>
                        <View style={styles.blank}/>
                        <View>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                onChangeText={(value) => this.inputJdbl = value}/>
                        </View>
                        <Text style={[styles.textColor, styles.leftMargin]}>%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>当前完成情况</Text>
                    </View>
                    <View style={styles.textArea}>
                        <TextInput style={{height: 0.2 * width}}
                                   multiline = {true}
                                   placeholder="请输入"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.inputInfo = text}/>
                    </View>
                </View>
                <View style={styles.blank}/>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    submit() {
        if (this.inputJdbl.length === 0) {
            Toast.show('请输入进度比例');
        } else if (!(/^\d+$/.test(this.inputJdbl)) || parseInt(this.inputJdbl)<0||parseInt(this.inputJdbl)>100||parseInt(this.inputJdbl)!==parseFloat(this.inputJdbl)) {
            Toast.show('请输入0~100的整数');
        } else if (this.inputInfo.length === 0) {
            Toast.show('请输入完成情况');
        } else {
            axios.post('/psmSgjdjh/saveZxqk', {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                wcqk: this.inputInfo,
                wcbl: this.inputJdbl,
                callID: true
            }).then((responseData) => {
                if (responseData.code === 1) {
                    Toast.show('添加成功');
                    let that = this;
                    this.props.refreshData();
                    let timer = setTimeout(function () {
                        that.props.navigator.pop();
                        clearTimeout(timer);
                    },1000);
                    RCTDeviceEventEmitter.emit('刷新施工进度进化执行');
                } else {
                    Toast.show(responseData.message);
                }
            }).catch((error) => {

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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.12 * width,
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    input: {
        height: 0.08 * width,
        width: 0.15 * width,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#216fd0',
        textAlign: 'center',
        padding:0
    },
    blank: {
        flex: 1
    },
    textArea: {
        padding: 0.02 * width,
        height: 0.25 * width
    },
    leftMargin: {
        marginLeft: 0.04 * width
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
    textColor: {
        color: '#216fd0'
    },
    labelColor: {
        color: '#5476a1'
    }
});
