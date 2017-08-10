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
import KeyValueRight from "../../../../Component/KeyValueRight"
import KeyTime from "../../../../Component/KeyTime"
import LabelTextArea from "../../../../Component/LabelTextArea"
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
import Organization from '../../../../Organization/Organization.js';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Toast from 'react-native-simple-toast';
import {getRandomId} from '../../../../Util/Util.js';
const {width, height} = Dimensions.get('window');

export default class DoubleCheckRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fcsj: '',
            fcr: '',
            fcrmc: '',
            fcjg: '',
            fcfj: '',
            fcbm: '',
            id: ''
        }
    }

    componentDidMount() {
        axios.get('/psmZljcjl/detail', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.fromList?this.props.data.id:'',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    fcsj: res.data.fcsj,
                    fcr: res.data.fcr,
                    fcrmc: res.data.fcrmc,
                    fcjg: res.data.fcjg,
                    fcfj: res.data.fcfj||getRandomId(),
                    id: res.data.id
                });
            }
        }).catch((error) => {

        });
    }

    gotoOrganization() {
        if (this.props.fcjl || this.props.fromList) {
            this.props.navigator.push({
                name: 'Organization',
                component: Organization,
                params: {
                    getInfo: this.getInfo.bind(this)
                }
            });
        }
    }

    //获取检验人：部门id  姓名  id
    getInfo(bmid, name, id) {
        this.setState({
            fcr: id,
            fcrmc: name,
            fcbm: bmid
        });
    }

    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor:'white', paddingTop: 5}}>
                <View style={styles.keyValue}>
                    <Text style={styles.textStyle} numberOfLines={1}>复查时间</Text>
                    <ChoiceDate showDate={this.state.fcsj||''}
                        disabled={!this.props.fromList&&!this.props.fcjl}
                        changeDate={(date)=>{this.setState({fcsj:date});}}/>
                </View>
                <TouchableOpacity onPress={this.gotoOrganization.bind(this)}>
                    <View style={styles.keyValue}>
                        <Text style={styles.textStyle} numberOfLines={1}>复查人</Text>
                        <Text style={styles.contentText} numberOfLines={1}>{this.state.fcrmc||''}</Text>
                    </View>
                </TouchableOpacity>
                <LabelTextArea label="整改复查结果"
                    value={this.state.fcjg}
                    editable={this.props.fromList||this.props.fcjl}
                    onTextChange={(text) => {this.setState({fcjg:text});}}/>
                <View style={styles.divide}/>
                <ChoiceFileComponent
                    readOnly={!this.props.fromList&&!this.props.fcjl}
                    isAttach="0"
                    resourceId={this.state.fcfj}
                    businessModule='zljcjl'/>
                {
                    (this.props.fromList || this.props.fcjl) &&
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={this.save.bind(this)}>
                            <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                                <Text style={styles.btnText}>保存</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        )
    }

    //保存
    save() {
        if (this.state.fcsj.length === 0) {
            Toast.show('请选择复查时间');
        } else if (this.state.fcrmc.length === 0) {
            Toast.show('请选择复查人');
        } else if (this.state.fcjg.length === 0) {
            Toast.show('请填写复查结果');
        } else {
            axios.post('/psmZljcjl/saveZljcjl4fc', {
                userID: GLOBAL_USERID,
                id: this.state.id,
                fcr: this.state.fcr,
                fcsj: this.state.fcsj,
                fcjg: this.state.fcjg,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    Toast.show('保存成功');
                    this.props.navigator.pop();
                    this.props.reloadInfo();
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
    }
}

const styles = StyleSheet.create({
    divide: {
        height: 0.02 * width
    },
    keyValue: {
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
        paddingRight:15
    },
    textStyle: {
        width: width*0.35,
        marginLeft:width*0.02,
    },
    contentText: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14
    },
    bottomView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnView: {
        height: 0.05 * height,
        width: width - 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    }
});
