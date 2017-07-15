import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Loading from "../../../../Component/Loading.js";
import Toast from 'react-native-simple-toast'
const {width} = Dimensions.get('window');
import KeyValueLeft from './KeyValueLeft.js';

export default class DoubleCheckDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: null
        }
    }

    componentDidMount() {
        console.log(this.props.data);
        this.setState({isLoading:true});
        axios.get('/psmAqjcjh/init4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.data.aqjcjhId,
                callID: true
            }
        }).then((res) => {
            this.setState({isLoading:false});
            // if (res.code === 1) {
            //     this.setState({data: res.data});
            // } else {
            //     Toast.show(res.message);
            // }
            this.setState({
                data: {
                    "jcbm": "00000005100138c242a0d9",
                    "zxmc": "配电室电气工程",
                    "fcsj": "",
                    "xmmc": "宣武医院（杉浩集团）配电工程",
                    "aqjcjhId": "8a8180d85726ecdb01573abd0aa93cc0",
                    "jcsj": "2016-12-12",
                    "fcr": "",
                    "fcfj": "1214134",
                    "id": "000000020015ca96c5a4a",
                    "jcr": "ZNDQ2000",
                    "wtlbmc": "正常",
                    "aqjcjhmc": "aaa",
                    "fcrmc": "",
                    "gczxId": "8a8180d856b8094b0156d8fdae6f299b",
                    "jcfj": "213214",
                    "fcjg": "一切正常",
                    "xmbh": "CX_DS12068-13200",
                    "sfxczg": 0,
                    "jcrmc": "时永强",
                    "wtlb": "1"
                }
            })
        }).catch((error) => {
            this.setState({isLoading:false});
        });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <KeyValueLeft propsKey="检验任务" propsValue={(this.state.data&&this.state.data.aqjcjhmc)||''}/>
                    <KeyValueLeft propsKey="工程工号" propsValue={(this.state.data&&this.state.data.xmbh)||''}/>
                    <KeyValueLeft propsKey="项目名称" propsValue={(this.state.data&&this.state.data.xmmc)||''}/>
                    <KeyValueLeft propsKey="工程子项名称" propsValue={(this.state.data&&this.state.data.zxmc)||''}/>
                    <KeyValueLeft propsKey="问题类别" propsValue={(this.state.data&&this.state.wtlb)||''}/>
                    <KeyValueLeft propsKey="检验时间" propsValue={(this.state.data&&this.state.data.jcsj)||''}/>
                    <KeyValueLeft propsKey="检验人" propsValue={(this.state.data&&this.state.data.jcrmc)||''}/>
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
                    <View style={styles.divide}/>
                    <View style={styles.bottomRow}>
                        <Text style={styles.labelColor}>检查结果</Text>
                    </View>
                    <View style={styles.textContent}>
                        <Text>{this.state.data&&this.state.data.fcjg||''}</Text>
                    </View>
                    <View style={styles.divide}/>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
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
    },
    bottomRow: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        backgroundColor: 'white'

    },
    textContent: {
        paddingHorizontal: 0.02 * width,
        backgroundColor:'white',
        justifyContent: 'center',
        height: 0.12*width
    }
});
