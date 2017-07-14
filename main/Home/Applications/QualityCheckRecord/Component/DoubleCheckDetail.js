/**
 * Created by zhubin on 17/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import KeyValueLeft from "../../../../Component/KeyValueLeft"
import LabelTextArea from "../../../../Component/LabelTextArea"
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'

const {width} = Dimensions.get('window');

export default class DoubleCheckDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <KeyValueLeft propsKey="检验任务" propsValue="质量检查计划1>"/>
                    <KeyValueLeft propsKey="工程工号" propsValue="CX_DS14034"/>
                    <KeyValueLeft propsKey="项目名称" propsValue="龙泽苑D区配电室改造工程"/>
                    <KeyValueLeft propsKey="工程子项名称" propsValue="项目实施计划任务"/>
                    <KeyValueLeft propsKey="工程节点" propsValue="施工进场"/>
                    <KeyValueLeft propsKey="检验时间" propsValue="2017-05-15"/>
                    <KeyValueLeft propsKey="检验人" propsValue="王娜"/>
                    <KeyValueLeft propsKey="问题类别" propsValue="施工安装问题"/>
                    <View style={styles.divide}/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>附件</Text>
                    </View>
                    <View style={styles.attachment}>
                        <View style={styles.attachmentLabel}>
                            <Text style={{color: '#666'}}>文件名.pdf</Text>
                        </View>
                        <View style={styles.attachmentContent}>
                            <View style={styles.square}>
                                <Text style={{fontSize: 0.1 * width, color: "#d2d2d2"}}>+</Text>
                            </View>
                        </View>
                    </View>
                    <LabelTextArea label="检查结果"/>
                    <View style={styles.divide}/>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get('/psmZljcjl/detail', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.id,
                callID: true
            }
        }).then(data => {
            this.setState({isLoading: false});
            if (data.code === 1) {
                // TODO
                data = {
                    "code": 1,
                    "data": {
                        "zxmc": "1号配电室装修",
                        "cfxxId": "8a8180d85702071c01570da666db03f5",
                        "twztmc": "新建任务",
                        "xmgh": "C112038-13005",
                        "xmmc": "昌平老旧小区配电改造(郝庄家园)",
                        "cjbm": "00000005000138c242a0d9",
                        "zrrmc": "",
                        "jhjssjt": "2017-01-20 00:00:00",
                        "jhkssjt": "2017-01-02 00:00:00",
                        "rwxz": 7,
                        "zrbm": "",
                        "id": "8a8180d8592e44ed015939cf2aa03b88",
                        "rwnr": "请市场部尽快协调进场时间",
                        "rwxzmc": "其它检验",
                        "zrr": "",
                        "gczxId": "8a8180d85702071c01570db2b28705b0",
                        "twzt": 0,
                        "ssbmmc": "",
                        "cjsjt": "2016-12-26 14:26:35",
                        "cjr": "00000009a00154c7ec8cda"
                    },
                    "message": "成功"
                }


            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            this.setState({isLoading: false});
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    divide: {
        height: 0.02 * width
    },
    row: {
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white'
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    attachmentContent: {
        paddingTop: 0.02 * width,
        paddingBottom: 0.02 * width
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelColor: {
        color: '#5476a1'
    }
});