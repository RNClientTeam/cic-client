/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
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

import ChoiceDate from "../../../../Component/ChoiceDate"

const {width} = Dimensions.get('window');

export default class ProjectChildProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zxmc: '',       //工程子项名称
            xmbh: '',       //项目编号
            xmmc: '',       //项目名称
            zrr: '',        //责任人
            zrbm: '',       //责任部门
            jhkssj: '',     //计划开始时间
            jhjssj: '',     //计划结束时间
            yxsdsj: '',     //意向送电时间
            zwsdsj: '',     //最晚送点时间
            jqdhsdsj: '',   //局启动会确定送电时间
            htgqkssj: '',   //合同工期开始时间
            htgqjssj: '',   //合同工期结束时间
            cbfw: '',       //承包范围
        }
    }

    componentDidMount() {
        axios.get('/psmSsjdjh/gczxgk', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.rowData.gczxId,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                let data = responseData.data;
                this.setState({
                    zxmc: data.zxmc,
                    xmbh: data.xmbh,
                    xmmc: data.xmmc,
                    zrr: data.zrr,
                    zrbm: data.zrbm,
                    jhkssj: data.jhkssj,
                    jhjssj: data.jhjssj,
                    yxsdsj: data.yxsdsj,
                    zwsdsj: data.zwsdsj,
                    jqdhsdsj: data.jqdhsdsj,
                    htgqkssj: data.htgqkssj,
                    htgqjssj: data.htgqjssj,
                    cbfw: data.cbfw
                });
            }
        }).catch((error) => {

        });
    }

    render() {
        return (
            <View style={styles.viewSty}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>项目名称</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.xmmc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>工程子项锁定</Text>
                            <View style={styles.blank}/>
                            <Text>未锁定</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>工程子项名称</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.zxmc}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>指定工程主管(副)经理</Text>
                            <View style={styles.blank}/>
                            <Text>{this.props.rowData.zrr}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>意向送电时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.yxsdsj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>最晚送电时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.zwsdsj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>责任部门</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.zrbm}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>子项负责人</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.zrr}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.jhkssj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.labelColor]}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.jhjssj}</Text>
                        </View>
                        <View style={styles.divide}/>
                        <View>
                            <View style={styles.labelRow}>
                                <Text style={[styles.labelColor]}>承包范围</Text>
                            </View>
                            <View style={styles.textArea}>
                                <Text>{this.state.cbfw}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    submit() {}
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
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
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
        backgroundColor:'#f2f2f2',
    },
    labelRow: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
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
