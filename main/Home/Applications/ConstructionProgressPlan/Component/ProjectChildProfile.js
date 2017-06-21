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

const {width, height} = Dimensions.get('window');

export default class ProjectChildProfile extends Component {
     constructor(props) {
         super(props);
         this.state = {
             dataSource: [],
             cbfw: ''
         };
     }
     componentDidMount() {
        axios.get('psmSsJdjh/gczxgk', {
            parmas: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                callID: getTimestamp()
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                let data = responseData.data.data;
                this.setState({
                    dataSource: [
                        {key: '项目名称', value: data.xmmc},
                        {key: '工程子项锁定', value: '未锁定'},
                        {key: '工程子项名称', value: data.zxmc},
                        {key: '最晚送电时间', value: data.zwsdsj},
                        {key: '责任部门', value: data.zrbm},
                        {key: '子项负责人', value: data.zrr},
                        {key: '计划开始时间', value: data.jhkssj},
                        {key: '计划结束时间', value: data.jhjssj},
                    ],
                    cbfw: data.cbfw //承包范围
                })
            } else {
                toast.show(responseData.message);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    renderRow(item) {
        return (
            <View style={styles.row}>
                <Text style={[styles.labelColor]}>{item.key}</Text>
                <View style={styles.blank}/>
                <Text>{item.value}</Text>
            </View>
        )
    }

    renderRows(dataSource) {
        if (dataSource && dataSource.length) {
            let row = [];
            for (let i = 0, l = dataSource.length; i < l; i++) {
                row.push(dataSource[i]);
            }
            return row
        }
        return <View/>
    }
    
    render() {
        return (
            <View style={styles.viewSty}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>项目名称</Text>
                    <View style={styles.blank}/>
                    <Text>电缆铺设计划</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>工程子项锁定</Text>
                    <View style={styles.blank}/>
                    <Text>未锁定</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>工程子项名称</Text>
                    <View style={styles.blank}/>
                    <Text>改造技术调查</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>指定工程主管(副)经理</Text>
                    <View style={styles.blank}/>
                    <Text style={styles.contentColor}>请选择></Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>最晚送电时间</Text>
                    <View style={styles.blank}/>
                    <Text>意向送电: 2017-02-15</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>责任部门</Text>
                    <View style={styles.blank}/>
                    <Text>九恒第一市场部</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>子项负责人</Text>
                    <View style={styles.blank}/>
                    <Text>朱彬</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>计划开始时间</Text>
                    <View style={styles.blank}/>
                    <ChoiceDate/>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.labelColor]}>计划结束时间</Text>
                    <View style={styles.blank}/>
                    <ChoiceDate/>
                </View>
                <View style={styles.divide}/>
                <View>
                    <View style={styles.labelRow}>
                        <Text style={[styles.labelColor]}>承包范围</Text>
                    </View>
                    <View style={styles.textArea}>
                        <TextInput
                            multiline = {true}
                            numberOfLines = {4}
                            placeholder="请填写"
                            style={{backgroundColor: 'white', height: 0.20 * width }}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
            <View style={styles.divide}/>
            <TouchableOpacity onPress={this.submit.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>提交</Text>
                </View>
            </TouchableOpacity>
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
