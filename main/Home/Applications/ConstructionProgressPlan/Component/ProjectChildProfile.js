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
import toast from 'react-native-simple-toast'
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
        };
    }
    componentDidMount() {
        this.getGCZYGK();
        // let data = {
        //     code: 1,
        //     data: {
        //         zxmc: '配电室电气工程',
        //         yxsdsj: '2016-11-23',
        //         xmmc: '玄武医院配电工程',
        //         zrrmc: "李建春(配网工程部经理)",
        //         zwsdsj: "2016-11-23",
        //         jhsd: "未锁定",
        //         zgfjl: "ZNDQ2003",
        //         jhkssj: "2016-08-19",
        //         cbfw: "4台变压器",
        //         jqdhsdsj: "2016-11-23",
        //         xmbh: "CX_DS12068-13200",
        //         zgfjlmc: "潘俊涛",
        //         zrbmmc: "配网工程部"
        //     },
        //     message: '成功'
        // };
        // data = data.data;
        // this.setState({
        //     dataSource: [
        //         {key: '项目名称', value: data.xmmc},
        //         {key: '工程子项锁定', value: data.jhsd},
        //         {key: '工程子项名称', value: data.zxmc},
        //         {key: '最晚送电时间', value: data.zwsdsj},
        //         {key: '责任部门', value: data.zrbm},
        //         {key: '子项负责人', value: data.zrr},
        //         {key: '计划开始时间', value: data.jhkssj},
        //         {key: '计划结束时间', value: data.jhjssj},
        //     ],
        //     cbfw: data.cbfw //承包范围
        // });
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
                    zgfjlmc: data.zgfjlmc, // 指定工程主管(副)经理
                    cbfw: data.cbfw || '无', //承包范围
                    zrrmc: data.zrrmc, // 责任人名称
                    zrbmmc: data.zrbmmc, // 责任部门名称
                    jhkssj: data.jhkssj, // 计划开始时间
                    jhjssj: data.jhjssj, // 计划结束时间
                })
            } else {
                toast.show(responseData.message);
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
                // if (dataSource[i].key === '子项负责人') {
                //     row.push(
                //         <View style={styles.row} key={i}>
                //             <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                //             <Text
                //                 style={{ flex: 1, textAlign: 'right' }}
                //                 onPress={() => this.goPersonSelector()}>
                //                 {this.state.zrrmc}
                //             </Text>
                //         </View>
                //     )
                // } else if (dataSource[i].key === '责任部门') {
                //     row.push(
                //         <View style={styles.row} key={i}>
                //             <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                //             <View style={styles.blank} />
                //             <Text>{this.state.zrbmmc}</Text>
                //         </View>
                //     )
                // }
                // else {
                //     row.push(this.renderRow(dataSource[i], i));
                // }
                switch (dataSource[i].key) {
                    case '指定工程主管(副)经理':
                        row.push(
                            <View style={styles.row} key={i}>
                                <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                                <Text
                                    style={{ flex: 1, textAlign: 'right' }}
                                    onPress={() => this.goPersonSelector()}>
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
                                <ChoiceDate
                                    showDate={this.state.jhkssj}
                                    changeDate={(date) => { this.setState({ jhkssj: date }); }} />
                            </View>
                        );
                        break;
                    case '计划结束时间':
                        row.push(
                            <View style={styles.row} key={i}>
                                <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                                <View style={styles.blank} />
                                <ChoiceDate
                                    showDate={this.state.jhjssj}
                                    changeDate={(date) => { this.setState({ jhjssj: date }); }} />
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
                            <View style={styles.textArea}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder="请填写"
                                    style={{ backgroundColor: 'white', height: 0.20 * width }}
                                    value={this.state.cbfw}
                                    onChangeText={(value) => this.setState({cbfw: value})}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.divide} />
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认保存</Text>
                    </View>
                </TouchableOpacity>
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
        }
        axios.post('/psmSgjdjh/updateZgfjl', data)
            .then(data => {
                if (data.code === 1) {
                    toast.show('保存成功!');
                } else {
                    toast.show(data.message);
                }
            })
            .catch(err => {
                if (err) {
                    toast.show('服务端异常');
                }
            })
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
