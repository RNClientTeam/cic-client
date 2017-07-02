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
import Toast from 'react-native-simple-toast';
const {width} = Dimensions.get('window');

export default class CompletionConfirm extends Component {
    constructor(props) {
        super(props);
        this.state={
            jhkssj: '',     //计划开始时间
            jhjssj: '',     //计划结束时间
            sjkssj: '',     //实际开始时间
            sjjssj: '',     //实际结束时间
            zrrmc: '',      //责任人名称
            rwmc: '',       //任务名称
            rwxzmc: '',     //任务性质名称
            rwztmc: '',     //任务状态名称
            bzgq: '',       //标准工期
            ssrymc: '',     //施工人员名称
            wcqk: '',       //完成情况
            wcbl: '',       //完成比例
        }
    }

    componentDidMount() {
        axios.get('/psmSgjdjh/sgjhJhrwDetail4Qrwc', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.rwid,
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    jhkssj: res.data.jhkssj,
                    jhjssj: res.data.jhjssj,
                    sjkssj: res.data.sjkssj,
                    sjjssj: res.data.sjjssj,
                    zrrmc: res.data.zrrmc,
                    rwmc: res.data.rwmc,
                    rwxzmc: res.data.rwxzmc,
                    rwztmc: res.data.rwztmc
                    bzgq: res.data.bzgq,
                    ssrymc: res.data.ssrymc,
                    wcqk: res.data.wcqk,
                    wcbl: res.data.wcbl
                });
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="设备检测"/>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务责任人</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.zrrmc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前状态</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.rwztmc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务性质</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.rwxzmc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>标准工期</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.bzgq}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>进度比例</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.wcbl||'0'}%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实施人员</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.ssrymc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>表单状态</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>--</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.jhkssj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.jhjssj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.textColor]}>{this.state.sjkssj}</Text>
                        </View>
                        <View style={styles.divide}/>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前完成情况</Text>
                        </View>
                        <View style={styles.textArea}>
                            <Text>{this.state.wcqk}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomDivide}/>
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
        axios.post('/psmSgjdjh/updateSgrwToWc', {
            userID: GLOBAL_USERID,
            id: this.props.rwid,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                Toast.show('保存成功');
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

        });
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
        position: 'absolute',
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        width: 0.9 * width,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0.05 * width,
        bottom: 0.05 * width,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    bottomDivide: {
        height: 0.22 * width
    }
});
