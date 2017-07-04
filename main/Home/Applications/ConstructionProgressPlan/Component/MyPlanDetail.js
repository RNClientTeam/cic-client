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
    Image,
    TextInput,
} from 'react-native';
import Organization from '../../../../Organization/Organization';
import StatusBar from '../../../../Component/StatusBar';
import ChoiceDate from '../../../../Component/ChoiceDate';

const {width} = Dimensions.get('window');

export default class MyPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.id ? '编辑工作任务' : '新建工作任务',
            rwmc: '',
            rwxz: '',
            zrrmc: '请选择>',
            ssrymc: '请选择>',
            currentStatus: '新建任务', // 当前状态
            formStatus: '新建', // 表单状态
        };
    }

    componentDidMount() {
        if (this.props.id) {
            this.getDetail(this.props.id);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title={this.state.title}/>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>工作任务</Text>
                            <TextInput value={this.state.rwmc}
                                       onChangeText={(value) => this.setState({rwmc: value})}
                                       style={styles.inputStyle}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务责任人</Text>
                            <Text style={{padding:5, paddingRight:0, flex: 1, textAlign: 'right'}}
                                  onPress={() => this.goPersonSelector()}>{this.state.zrrmc}></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>当前状态</Text>
                            <TextInput value={this.state.rwztmc}
                                       onChangeText={(value) => this.setState({rwztmc: value})}
                                       style={styles.inputStyle}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务性质</Text>
                            <TextInput value={this.state.rwxzmc}
                                       onChangeText={(value) => this.setState({rwxzmc: value})}
                                       style={styles.inputStyle}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>标准工期</Text>
                            <TextInput value={this.state.bzgq}
                                       onChangeText={(value) => this.setState({bzgq: value})}
                                       style={styles.inputStyle}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实施人员</Text>
                            <View style={styles.blank}/>
                            <Text onPress={() => this.multiSelector()}>
                                {this.state.ssrymc}>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>表单状态</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.formStatus}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate showDate={this.state.jhkssj}
                                        changeDate={(date)=>{this.setState({jhkssj: date});}}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate showDate={this.state.jhjssj}
                                        changeDate={(date)=>{this.setState({jhjssj: date});}}/>
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
        alert(this.state.rwmc);
    }
    goPersonSelector() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: (bmid ,name, id) => this.getInfo(bmid ,name, id),
            }
        })
    }

    multiSelector() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                type: 'emp',
                select: (items) => this.getEmps(items),
            }
        })
    }

    getEmps(emps) {
        console.log(emps);
        if (emps && emps.length) {
            let ssrymc = emps.map((item) => item.name).join(',');
            let ssry = emps.map((item) => item.id).join(',');
            this.setState({
                ssrymc,
                ssry
            })
        }
    }

    getInfo(zrbm, name, id) {
        this.setState({
            zrbm,
            zrr: id,
            zrrmc: name
        });
    }
    getDetail(id) {
        axios.get('/psmSgjdjh/sgjhJhrwDetail', {
            params: {
                userID: GLOBAL_USERID,
                id: id
            }
        }).then((data) => {
            console.log('rwDetail', data);
        })
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
    inputStyle: {
        height: 0.12 * width,
        flex: 1,
        textAlign: 'right',
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