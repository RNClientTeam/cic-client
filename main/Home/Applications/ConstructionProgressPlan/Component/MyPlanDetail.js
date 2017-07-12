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
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';

const {width} = Dimensions.get('window');

export default class MyPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.id ? '编辑工作任务' : '新建工作任务',
            rwmc: '',
            rwxz: '',
            rwxzmc: '请选择>',
            zrrmc: '请选择>',
            ssrymc: '请选择>',
        };
    }

    componentDidMount() {
        // 获取任务性质列表
        this.getRWXZList();
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
                                  onPress={() => this.goPersonSelector()}>
                                {this.state.zrrmc}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>任务性质</Text>
                            {/*<TextInput value={this.state.rwxzmc}
                                       onChangeText={(value) => this.setState({rwxzmc: value})}
                                       style={styles.inputStyle}/>*/}
                            <ModalDropdown
                                options={this.state.rwxzList}
                                animated={true}
                                defaultValue={this.state.rwxzmc}
                                style={{flex:1, alignItems:'flex-end'}}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({rwxz: this.state.rwxzIdList[a]});
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>标准工期</Text>
                            <TextInput value={this.state.bzgq}
                                       onChangeText={(value) => this.setState({bzgq: value})}
                                       style={styles.inputStyle}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>实施人员</Text>
                            <Text style={{flex: 1, textAlign: 'right'}} onPress={() => this.multiSelector()}>
                                {this.state.ssrymc}
                            </Text>
                        </View>
                        {/*<View style={styles.row}>*/}
                            {/*<Text style={[styles.labelColor]}>表单状态</Text>*/}
                            {/*<View style={styles.blank}/>*/}
                            {/*<Text>{this.state.formStatus}</Text>*/}
                        {/*</View>*/}
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
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    save() {
        let data = {
            userID: GLOBAL_USERID,
            gczxId: this.props.gczxId,
            cfxxId: this.props.cfxxId,
            rwmc: this.state.rwmc,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            rwxz: this.state.rwxz,
            bzgq: this.state.bzgq,
            ssry: this.state.ssry,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            callID: true,
        };
        axios.post('/psmSgjdjh/addSgjhJhrw', data)
            .then(data => {
                console.log('--------data', data);
                if (data.code === 1) {
                    Toast.show('保存成功!');
                } else {
                    Toast.show(data.message);
                }
            })
            .catch(err => {
                if (err) {
                    Toast.show('服务端异常');
                }
            })
    }

    update() {
        let data = {
            userID: GLOBAL_USERID,
            id: this.props.id,
            rwmc: this.state.rwmc,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            rwxz: this.state.rwxz,
            bzgq: this.state.bzgq,
            ssry: this.state.ssry,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            callID: true,
        };
        axios.post('/psmSgjdjh/updateSgjhJhrw', data)
            .then(data => {
                if (data.code === 1) {
                    Toast.show('保存成功!');
                } else {
                    Toast.show(data.message);
                }
            })
            .catch(err => {
                if (err) {
                    Toast.show('服务端异常');
                }
            })
    }

    submit() {
        if (this.props.id) {
            this.update();
        } else {
            this.save();
        }
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
        }).then(responseData => {
            this.setState(
                {
                    rwmc: responseData.data.rwmc,
                    rwxz: responseData.data.rwxz,
                    rwxzmc: responseData.data.rwxzmc || '请选择>',
                    zrr: responseData.data.zrr,
                    zrrmc: responseData.data.zrrmc || '请选择>',
                    ssry: responseData.data.ssry,
                    ssrymc: responseData.data.ssrymc || '请选择>',
                    bzgq: responseData.data.bzgq,
                    jhkssj: responseData.data.jhkssj,
                    jhjssj: responseData.data.jhjssj,
                }
            );
        })
    }
    // 获取任务性质(rwxz)
    getRWXZList() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_SGRWXZ',
                callID: true
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                let rwxzList = [], rwxzIdList = [];
                for (let i = 0; i < responseData.data.length; i++) {
                    rwxzList.push(responseData.data[i].name);
                    rwxzIdList.push(responseData.data[i].code);
                }
                this.setState({
                    rwxzList,
                    rwxzIdList,
                })
            }
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
    },
    modalDropDownText: {
        fontSize: width * 0.035,
        textAlign: 'right'
    },
    dropdownStyle: {
        width: width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});