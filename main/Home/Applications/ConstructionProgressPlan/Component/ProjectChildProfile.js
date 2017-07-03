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
import {getTimestamp} from '../../../../Util/Util'
import toast from 'react-native-simple-toast'
import ChoiceDate from "../../../../Component/ChoiceDate"
import Organization from '../../../../Organization/Organization';

const {width, height} = Dimensions.get('window');

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
                        {key: '项目名称', value: data.xmmc},
                        {key: '工程子项锁定', value: data.jhsd},
                        {key: '工程子项名称', value: data.zxmc},
                        {key: '最晚送电时间', value: data.zwsdsj},
                        {key: '责任部门', value: data.zrbmmc},
                        {key: '子项负责人', value: data.zrrmc},
                        {key: '计划开始时间', value: data.jhkssj},
                        {key: '计划结束时间', value: data.jhjssj},
                    ],
                    cbfw: data.cbfw || '无', //承包范围
                    zrrmc: data.zrrmc, // 责任人名称
                    zrbmmc: data.zrbmmc, // 责任部门名称
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
                <View style={styles.blank}/>
                <Text>{item.value}</Text>
            </View>
        )
    }

    renderRows(dataSource) {
        if (dataSource && dataSource.length) {
            let row = [];
            for (let i = 0, l = dataSource.length; i < l; i++) {
                if (dataSource[i].key === '子项负责人') {
                    row.push (
                        <View style={styles.row} key={i}>
                            <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                            <Text
                                style={{flex: 1, textAlign: 'right'}}
                                onPress={() => this.goPersonSelector()}>
                                {this.state.zrrmc}
                            </Text>
                        </View>
                    )
                } else if (dataSource[i].key === '责任部门') {
                    row.push (
                        <View style={styles.row} key={i}>
                            <Text style={[styles.labelColor]}>{dataSource[i].key}</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.zrbmmc}</Text>
                        </View>
                    )
                }
                else {
                    row.push(this.renderRow(dataSource[i], i));
                }
            }
            return row
        }
        return <View/>
    }

    goPersonSelector() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: (bmid ,name, id, zrbmmc) => this.getInfo(bmid ,name, id, zrbmmc),
            }
        })
    }
    // params 部门id, 责任人名字, 责任人ID, 责任部门名称
    getInfo(zrbm, name, id, zrbmmc) {
        this.setState({
            zrbm,
            zrr: id,
            zrrmc: name,
            zrbmmc,
        });
    }
    
    render() {
        return (
            <View style={styles.viewSty}>
            <ScrollView>
            <View style={styles.container}>
                {this.renderRows(this.state.dataSource)}
                {
                    /**
                     * <View style={styles.row}>
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
                     */
                }
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
                            value={this.state.cbfw}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
            <View style={styles.divide}/>
            <TouchableOpacity onPress={this.submit.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>确认保存</Text>
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
