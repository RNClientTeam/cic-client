"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeyTime from "../../../../Component/KeyTime";
import KeyPercentage from "../../../../Component/KeyPercentage";
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'
import KeyValueRight from "../../../../Component/KeyValueRight";

export default class CompletionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            jhmc: '',
            wcbl: '',
            sjqdsj: '',
            sjwcsj: '',
            wcbz: '',
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="确认完成" navigator={this.props.navigator}/>
                <KeyValueRight propKey="工作计划名称" readOnly={true} defaultValue={this.props.jhmc}/>
                <KeyPercentage readOnly={true} propKey="当前进度" value={this.state.wcbl}
                               textChange={(value) => this.setState({wcbl: value})}/>
                <KeyValueRight propKey="实际开始时间" defaultValue={this.state.sjqdsj} readOnly={true}/>
                {parseInt(this.state.wcbl) == 100 ?
                    <KeyValueRight propKey="实际完成时间" defaultValue={this.state.sjwcsj} readOnly={true}/>
                    : null}

                <View style={styles.lastItem}>
                    <Text style={styles.textKeySty}>当前完成情况*</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder="在此输入"
                        multiline={true}
                        onChangeText={(value) => {
                            this.setState({
                                wcbz: value
                            })
                        }}
                        value={this.state.wcbz}
                        editable={false}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                </View>
                {
                    parseInt(this.state.wcbl) === 100 ?
                        <TouchableOpacity style={styles.btnView} onPress={this.clickBtn.bind(this)}>
                            <Text style={{fontSize: 15, color: '#fff'}}>
                                确认提交
                            </Text>
                        </TouchableOpacity> : null
                }

                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    clickBtn() {
        if (parseInt(this.state.wcbl) === 100) {
            if (this.state.wcbl === '') {
                toast.show('请填写完成比例');
            } else if (this.state.sjqdsj === '') {
                toast.show('请填写开始时间')
            } else if (parseInt(this.state.wcbl) === 100 && this.state.sjwcsj === '') {
                toast.show('请填写完成时间')
            } else {
                this.setState({
                    isLoading: true
                });
                axios.post('/psmBmjh/updateQrwc', {
                    userID: GLOBAL_USERID,
                    jhid: this.props.id,
                    sjwcsj: this.state.sjwcsj,
                    callID: true
                }).then(data => {
                    this.setState({
                        isLoading: false
                    });
                    if (data.code === 1) {
                        toast.show('提交成功');
                        let that = this;
                        setTimeout(function () {
                            that.props.navigator.pop();
                            this.props.reload();
                        })
                    } else {
                        toast.show(data.message);
                    }
                }).catch(err => {
                    this.setState({
                        isLoading: false
                    });
                    toast.show('服务端异常');
                })
            }
        } else {
            toast.show('完成比例不是100%，不可确认完成');
        }

    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        axios.get('/psmBmjh/detail', {
            params: {
                jhId: this.props.id,
                userID: GLOBAL_USERID,
                callID: true
            }
        }).then(data => {
            this.setState({
                isLoading: false
            });
            if (data.code === 1) {
                data = data.data;
                this.setState({
                    jhmc: data.jhmc,
                    sjqdsj: data.sjqdsj || data.qdsj,
                    sjwcsj: data.sjwcsj || data.wcsj,
                    wcbl: data.wcbl + '',
                    wcbz: data.wcbz
                })
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        flexDirection: 'row',
        width: width,
        height: 0.0735 * height,
        alignItems: 'center',
        paddingLeft: width * 0.02,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        marginBottom: 1
    },
    btnView: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#216fd0'
    },
    textKeySty: {
        color: '#5476a1',
        fontSize: 15
    },
    textValueSty: {
        fontSize: 15,
        color: '#999'
    },
    lastItem: {
        width: width,
        height: 0.27 * height,
        backgroundColor: '#fff',
        paddingLeft: width * 0.02,
        paddingTop: 16,
        paddingBottom: 28,
        justifyContent: 'space-between'
    },
    textInput: {
        width: width - 40,
        height: 0.15 * height,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15
    }
});
