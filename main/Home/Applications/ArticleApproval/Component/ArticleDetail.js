/**
 * Created by zhubin on 17/5/16.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import StatusBar from '../../../../Component/StatusBar'
import KeyValueLeft from "../../../../Component/KeyValueLeft";
import toast from 'react-native-simple-toast'
import CheckFlowInfo from "../../SafetyInspectionRecord/Component/CheckFlowInfo";
const {width} = Dimensions.get('window');

export default class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gwlb: '',
            gwzyx: '',
            gwxz: '',
            bmmc: '',
            cjsj: '',
            gwsx: '',
            gwmj: '',
            sffb: '',
            yzmc: '',
            yzsl: '',
            fwtype: '',
            nr: '',
            id: '',
            gwmc:''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="公文详情"/>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            {this.state.gwmc}
                        </Text>
                    </View>
                    <KeyValueLeft propsKey="公文类别" propsValue={this.state.gwlb}/>
                    <KeyValueLeft propsKey="公文重要性" propsValue={this.state.gwzyx}/>
                    <KeyValueLeft propsKey="公文性质" propsValue={this.state.gwxz}/>
                    <KeyValueLeft propsKey="拟稿部门" propsValue={this.state.bmmc}/>
                    <KeyValueLeft propsKey="拟发时间" propsValue={this.state.cjsj}/>
                    <KeyValueLeft propsKey="时限" propsValue={this.state.gwsx}/>
                    <KeyValueLeft propsKey="密级" propsValue={this.state.gwmj}/>
                    <KeyValueLeft propsKey="是否发布" propsValue={this.state.sffb}/>
                    <KeyValueLeft propsKey="印章名称" propsValue={this.state.yzmc}/>
                    <KeyValueLeft propsKey="印章数量" propsValue={this.state.yzsl}/>
                    <KeyValueLeft propsKey="发放范围" propsValue={this.state.fwtype}/>
                    <View style={styles.horizonPadding}/>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            公文内容
                        </Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text>{this.state.nr}</Text>
                    </View>
                </ScrollView>
                {this.props.tag === 'jpush' ?
                    <TouchableOpacity style={styles.submitButton} onPress={this.submit.bind(this)}>
                        <Text style={{color: '#fff'}}>提交审核</Text>
                    </TouchableOpacity> : null}
            </View>
        )
    }

    componentDidMount() {
        let id = this.props.tag === 'jpush' ? this.props.id : this.props.data.id;
        axios.get('/gwgllc/detail', {
            params: {
                id: id,
                userID: GLOBAL_USERID,
                callID: true
            }
        }).then(data => {
            if (data.code === 1) {
                this.setState({
                    gwlb: data.data.gwlb,
                    gwzyx: data.data.gwzyx,
                    gwxz: data.data.gwxz,
                    bmmc: data.data.bmmc,
                    cjsj: data.data.cjsj,
                    gwsx: data.data.gwsx,
                    gwmj: data.data.gwmj,
                    sffb: data.data.sffb,
                    yzmc: data.data.yzmc,
                    yzsl: data.data.yzsl,
                    fwtype: data.data.fwtype,
                    nr: data.data.nr,
                    id: data.data.id,
                    gwmc:data.data.gwmc
                })
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常')
        })
    }

    submit() {
        this.props.navigator.push({
            name:"CheckFlowInfo",
            component:CheckFlowInfo,
            params:{
                resID:this.state.id,
                wfName:'cicosgw'
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    row: {
        backgroundColor: 'white',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        height: 0.12 * width,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textArea: {
        height: 0.36 * width,
        padding: 0.02 * width,
        backgroundColor: 'white'
    },
    verticalPadding: {
        width: 0.2 * width
    },
    horizonPadding: {
        height: 0.02 * width
    },
    bold: {
        fontWeight: 'bold'
    },
    labelColor: {
        color: '#5476a1'
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: width * 0.12,
        backgroundColor: '#216fd0',
        bottom: width * 0.02,
        borderRadius: 5,
        marginTop: 10
    }
});