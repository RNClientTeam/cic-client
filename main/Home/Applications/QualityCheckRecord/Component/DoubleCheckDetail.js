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
            isLoading: false,

        }
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <KeyValueLeft propsKey="检验任务" propsValue={(this.state.data&&this.state.data.rwnr)||''}/>
                    <KeyValueLeft propsKey="工程工号" propsValue={(this.state.data&&this.state.data.xmgh)||''}/>
                    <KeyValueLeft propsKey="项目名称" propsValue={(this.state.data&&this.state.data.xmmc)||''}/>
                    <KeyValueLeft propsKey="工程子项名称" propsValue={(this.state.data&&this.state.data.zxmc)||''}/>
                    <KeyValueLeft propsKey="工程节点" propsValue={(this.state.data&&this.state.data.gcjd)||''}/>
                    <KeyValueLeft propsKey="检验时间" propsValue={(this.state.data&&this.state.data.jcsj)||''}/>
                    <KeyValueLeft propsKey="检验人" propsValue={(this.state.data&&this.state.data.jcr)||''}/>
                    <KeyValueLeft propsKey="问题类别" propsValue={(this.state.data&&this.state.wtlb)||''}/>
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
                        "code": 1,
                        "data": {
                            "zxmc": "附属设施施工",
                            "xmgh": "JZ_JY15011-16004",
                            "xmmc": "规划九路电力沟道工程（注浆专业）",
                            "cjsj": "2017-06-08 16:54:43",
                            "jcsj": "2017-06-08 00:00:00",
                            "RN": 1,
                            "dqzt": 20,
                            "rwxz": 5,
                            "jcr": "刘栓",
                            "id": "8a8181a25c85d8dc015c86e9ba0f0135",
                            "gcjd": "设备厂验",
                            "dqztmc": "审批中",
                            "rwnr": "123",
                            "nodeId": "0",
                            "zxid": "8a8180d8573fd03c01574138cda03ded",
                            "sfxczg": 0,
                            "twzt": 100,
                            "sfdb": "0",
                            "cjr": "ZNDQ2053",
                            "wtlb": "设备问题,施工安装问题"

                        },
                        "message": "成功"
                    },
                    "message": "成功"
                };
                data = data.data.data;
                this.setState({
                    data
                },function () {
                    console.log(this.state.data)
                })

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