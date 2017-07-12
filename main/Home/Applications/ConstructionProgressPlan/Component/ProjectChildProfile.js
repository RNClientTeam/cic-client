/**
 * Created by zhubin on 17/5/9.
 */
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView
} from 'react-native'
import { getTimestamp } from '../../../../Util/Util'
import Toast from 'react-native-simple-toast'
import ChoiceDate from "../../../../Component/ChoiceDate"
import Organization from '../../../../Organization/Organization';

const { width, height } = Dimensions.get('window');

export default class ProjectChildProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            cbfw: '',
            zrrmc: '请选择>',
            authority: {},
        };
    }
    componentDidMount() {
        this.getGCZYGK();
        this.getAuthority('1111');
    }

    // 获取工程子项概况
    getGCZYGK() {
        axios.get('/psmSgjdjh/gczxgk', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                callID: getTimestamp()
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                let data = responseData.data;
                this.setState({
                    dataSource: [
                        { key: '项目名称', value: data.xmmc },
                        { key: '工程子项锁定', value: data.jhsd },
                        { key: '工程子项名称', value: data.zxmc },
                        { key: '最晚送电时间', value: data.zwsdsj },
                        { key: '责任部门', value: data.zrbmmc },
                        { key: '子项负责人', value: data.zrrmc },
                        { key: '计划开始时间', value: data.jhkssj },
                        { key: '计划结束时间', value: data.jhjssj },
                        { key: '指定工程主管(副)经理', value: data.zgfjlmc }
                    ],
                    zgfjl: data.zgfjl, // 指定工程主管(副)经理id
                    zgfjlmc: data.zgfjlmc, // 指定工程主管(副)经理
                    cbfw: data.cbfw || '无', //承包范围
                    zrrmc: data.zrrmc, // 责任人名称
                    zrbmmc: data.zrbmmc, // 责任部门名称
                    jhkssj: data.jhkssj, // 计划开始时间
                    jhjssj: data.jhjssj, // 计划结束时间
                })
            } else {
                Toast.show(responseData.message);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    renderRow(item, index) {
        return (
            <View style={styles.row} key={index}>
                <Text style={[styles.labelColor]}>{item.key}</Text>
                <View style={styles.blank} />
                <Text>{item.value}</Text>
            </View>
        )
    }

    renderRows(dataSource) {
        if (dataSource && dataSource.length) {
            let row = [];
            for (let i = 0, l = dataSource.length; i < l; i++) {
                switch (dataSource[i].key) {
                    case '指定工程主管(副)经理':
                        row.push(
                            <View style={styles.row} key={i}>
                                <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                                <Text
                                    style={{ flex: 1, textAlign: 'right' }}
                                    onPress={() => this.state.authority.zdzgfjl && this.goPersonSelector()}>
                                    {this.state.zgfjlmc}
                                </Text>
                            </View>
                        );
                        break;
                    case '计划开始时间':
                        row.push(
                            <View style={styles.row} key={i}>
                                <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                                <View style={styles.blank} />
                                {this.state.authority.zdzgfjl ?
                                    <ChoiceDate
                                        showDate={this.state.jhkssj}
                                        changeDate={(date) => {
                                        this.state.authority.zdzgfjl && this.setState({ jhkssj: date });
                                    }} />:
                                    <Text>{this.state.jhkssj}</Text>
                                }
                            </View>
                        );
                        break;
                    case '计划结束时间':
                        row.push(
                            <View style={styles.row} key={i}>
                                <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                                <View style={styles.blank} />
                                {this.state.authority.zdzgfjl ?
                                    <ChoiceDate
                                        showDate={this.state.jhjssj}
                                        changeDate={(date) => {
                                        this.state.authority.zdzgfjl && this.setState({ jhjssj: date });
                                    }} />:
                                    <Text>{this.state.jhjssj}</Text>
                                }
                            </View>
                        );
                        break;
                    default:
                        row.push(this.renderRow(dataSource[i], i));
                }
            }
            return row
        }
        return <View />
    }

    goPersonSelector() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: (bmid, name, id, zrbmmc) => this.getInfo(bmid, name, id, zrbmmc),
            }
        })
    }
    // params 部门id, 责任人名字, 责任人id
    getInfo(zrbm, name, id) {
        this.setState({
            zrbm,
            zgfjl: id,
            zgfjlmc: name,
        });
    }

    render() {
        return (
            <View style={styles.viewSty}>
                <ScrollView>
                    <View style={styles.container}>
                        {this.renderRows(this.state.dataSource)}
                        <View style={styles.divide} />
                        <View>
                            <View style={styles.labelRow}>
                                <Text style={[styles.labelColor]}>承包范围</Text>
                            </View>
                            {this.state.authority.zdzgfjl ?
                                <View style={styles.textArea}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="请填写"
                                        style={{ backgroundColor: 'white', height: 0.20 * width }}
                                        value={this.state.cbfw}
                                        onChangeText={(value) => {
                                        this.setState({cbfw: value});
                                    }}
                                        editable={true}
                                    />
                                </View>:
                                <View style={styles.textArea}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="请填写"
                                        style={{ backgroundColor: 'white', height: 0.20 * width }}
                                        value={this.state.cbfw}
                                        editable={false}
                                    />
                                </View>}

                        </View>
                    </View>
                </ScrollView>
                <View style={styles.divide} />
                {this.state.authority.zdzgfjl ?
                    <TouchableOpacity onPress={() => this.submit()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>确认保存</Text>
                        </View>
                    </TouchableOpacity>:
                    <View/>
                }
            </View>
        )
    }
    submit() {
        let data = {
            userID: global.GLOBAL_USERID,
            gczxId: this.props.gczxId,
            zgfjl: this.state.zgfjl,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            cbfw: this.state.cbfw,
        };
        axios.post('/psmSgjdjh/updateZgfjl', data)
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

    // 获取权限
    getAuthority(rwid = '') {
        axios.get('/psmSgjdjh/operationAuthority4bz', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                sgrwId: rwid,
                belongTo: 1, // 1,'工程子项概况'
                callID: true,
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                this.setState({
                    authority: responseData.data,
                    // authority: {zdzgfjl: true}
                })
            } else {
                Toast.show(responseData.data);
            }
        }).catch( error => {
            if (error) {
                Toast.show('服务端异常');
            }
        } )
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1
    },
    container: {
        backgroundColor: 'white',
        marginTop: 0.02 * width
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.12 * width,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    blank: {
        flex: 1
    },
    labelColor: {
        color: '#666'
    },
    contentColor: {
        color: '#999'
    },
    divide: {
        height: 0.02 * width,
        backgroundColor: '#f2f2f2',
    },
    labelRow: {
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    textArea: {
        padding: 0.02 * width,
        height: 0.25 * width
    },
    button: {
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1
    },
    buttonText: {
        color: '#216fd0'
    },
});
