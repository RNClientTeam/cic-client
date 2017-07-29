"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Switch
} from 'react-native';
import CheckFlowInfo from './CheckFlowInfo.js';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
import Toast from 'react-native-simple-toast';
import Organization from '../../../../Organization/Organization.js';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import ModalDropdown from 'react-native-modal-dropdown';

export default class NewCreateRecord extends Component {
    constructor(props) {
        super(props);
        this.imageId = [];      //图片附件的id
        this.jianchaResult = '';
        this.state = {
            jcbm: '',           //检查部门
            zxmc: '',           //子项名称
            xmmc: '',           //项目名称
            fcsj: '',           //复查时间
            aqjcjhId: '',       //安全检查计划Id
            jcsj: '',           //检查时间
            fcr: '',            //复查人
            fcfj: '',           //复查附件
            id: '',             //安全检查记录id
            jcr: '',            //检查人
            jcrmc: '请选择>',    //检查人名称
            wtlbmc: '',         //问题类别名称
            aqjcjhmc: '',       //安全检查计划名称
            fcrmc: '',          //复查人名称
            gczxId: '',         //工程子项Id
            jcfj: '',           //检查附件ID
            fcjg: '',           //复查结果
            xmbh: '',           //项目编号
            sfxczg: false,      //是否现场整改
            wtlb: '',           //问题类别编码
            zgyq: '',           //整改要求
            fcjlisAttach: '',
            businessModule: '',
            questionList: [],
            proList: [],
            choiceFileName: '所选文件名',
            jcjlisAttach:'',
            wenti: ''
        }
    }

    componentDidMount() {
        this.initData();
        //获取问题类别
        this.getQuestionType();
    }

    //获取问题类别
    getQuestionType() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_WTLB_AQ',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    questionList: res.data.map((elem, index) => {
                        return elem.name
                    }),
                    proList: res.data
                });
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    //初始化数据
    initData() {
        axios.get('/psmAqjcjh/init4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                id: '',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    jcbm: res.data.jcbm,
                    fcsj: res.data.fcsj,
                    aqjcjhmc: res.data.aqjcjhmc,
                    aqjcjhId: res.data.aqjcjhId,
                    xmbh: res.data.xmbh,
                    xmmc: res.data.xmmc,
                    zxmc: res.data.zxmc,
                    jcsj: res.data.jcsj,
                    jcrmc: res.data.jcrmc,
                    wtlbmc: res.data.wtlbmc || '请选择>',
                    fcr: res.data.fcr,
                    jcr: res.data.jcr,
                    fcfj: res.data.fcfj,
                    id: res.data.id,
                    fcrmc: res.data.fcrmc,
                    gczxId: res.data.gczxId,
                    jcfj: res.data.jcfj,
                    fcjg: res.data.fcjg,
                    sfxczg: res.data.sfxczg == 1 ? true : false,
                    wtlb: res.data.wtlb,
                    businessModule: res.data.businessModule,
                    fcjlisAttach: res.data.fcjlisAttach,
                    jcjlisAttach:res.data.jcjlisAttach
                });
            } else {
                Toash.show(res.message);
            }
        }).catch((error) => {
            Toast.show('服务端异常');
        });
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="项目安全检查记录" navigator={this.props.navigator}/>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>检查任务</Text>
                        <Text style={styles.valueText}>{this.state.aqjcjhmc}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>项目工号</Text>
                        <Text style={styles.valueText}>{this.state.xmbh}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>项目名称</Text>
                        <Text style={styles.valueText}>{this.state.xmmc}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>工程子项名称</Text>
                        <Text style={styles.valueText}>{this.state.zxmc}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>问题类别</Text>
                        <ModalDropdown
                            options={this.state.questionList}
                            animated={true}
                            defaultValue={this.state.wtlbmc}
                            style={{flex: 1, alignItems: 'flex-end'}}
                            textStyle={{fontSize: 14}}
                            onSelect={(a) => {
                                this.setState({
                                    wenti: this.state.proList[a].code,
                                    sfxczg: this.state.proList[a].code === '1' ? false : this.state.sfxczg,
                                    zgyq: this.state.proList[a].code === '1' ? '' : this.state.zgyq
                                });
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>检验时间</Text>
                        <ChoiceDate showDate={this.state.jcsj}
                                    changeDate={(date) => {
                                        this.setState({jcsj: date})
                                    }}/>
                    </View>
                    <TouchableHighlight onPress={this.getNewPerson.bind(this)} underlayColor="transparent">
                        <View style={styles.viewStyle}>
                            <Text style={styles.keyText}>检验人</Text>
                            <Text style={styles.valueText}>{this.state.jcrmc}</Text>
                        </View>
                    </TouchableHighlight>
                    <ChoiceFileComponent
                        getFileID={(theID) => {
                        }}
                        businessModule={this.state.businessModule}
                        resourceId={this.state.jcfj}
                        isAttach={this.state.jcjlisAttach}/>
                    <View style={styles.footSeparator}></View>
                    <View style={styles.footIntor}>
                        <Text style={styles.keyText}>检查结果</Text>
                    </View>
                    <View style={styles.footInfo}>
                        <TextInput style={styles.textinputStyle}
                                   multiline={true}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   onChangeText={(text) => {
                                       this.jianchaResult = text;
                                   }}
                                   underlineColorAndroid="transparent"
                                   placeholder=""/>
                    </View>
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.footIntor}>
                            <Text style={styles.keyText}>整改要求</Text>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.footInfo}>
                            <TextInput style={styles.textinputStyle}
                                       multiline={true}
                                       defaultValue={this.state.zgyq || ''}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       onChangeText={(text) => {
                                           this.setState({zgyq: text})
                                       }}
                                       underlineColorAndroid="transparent"/>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.viewStyle}>
                            <Text style={styles.keyText}>是否已现场整改</Text>
                            <Switch onValueChange={(value) => {
                                this.setState({sfxczg: value})
                            }}
                                    value={this.state.sfxczg}/>
                        </View>
                    }
                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={this.saveAndCommit.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor: '#41cc85'}]}>
                            <Text style={styles.btnText}>保存并提交</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor: '#216fd0'}]}>
                            <Text style={styles.btnText}>保存</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //跳转到组织选择获取检验人
    getNewPerson() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        })
    }

    //获取检验人：部门id  姓名  id
    getInfo(bmid, name, id) {
        this.setState({
            jcrmc: name,
            jcr: id,
            jcbm: bmid
        });
    }

    //保存并提交
    saveAndCommit() {
        if (this.state.wtlbmc === '请选择>') {
            Toast.show('请选择问题类比');
        } else if (this.state.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.state.jcrmc.length) {
            Toast.show('请选择检查人');
        } else if (this.state.fcfj.length === 0) {
            Toast.show('请选择附件');
        } else {
            axios.post('/psmAqjcjh/saveAndsumbitAqjcjl', {
                userID: GLOBAL_USERID,
                id: this.state.id,
                aqjcjhId: this.state.aqjcjhId,
                aqjcjhmc: this.state.aqjcjhmc,
                gczxId: this.state.gczxId,
                xmbh: this.state.xmbh,
                jcr: this.state.jcr,
                jcbm: this.state.jcbm,
                jcsj: this.state.jcsj,
                jcjg: this.jianchaResult,
                zgyq: this.state.zgyq,
                wtlb: this.state.wenti,
                sfxczg: this.state.sfxczg ? '1' : '0',
                jcfj: this.state.jcfj,
                fcfj: this.state.fcfj,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    if (res.data.isToSubmit) {
                        //进入流程审批页面
                        this.props.navigator.push({
                            name: 'CheckFlowInfo',
                            component: CheckFlowInfo,
                            params: {
                                resID: res.data.aqjcjlId,
                                wfName: 'jdjhaqjcjl',
                                name: 'SafetyInspectionRecord',
                                reloadInfo: this.props.reloadInfo
                            }
                        })
                    } else {
                        Toast.show('提交成功');
                        this.props.navigator.pop();
                    }
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
    }

    //保存
    save() {
        if (this.state.wtlbmc === '请选择>') {
            Toast.show('请选择问题类比');
        } else if (this.state.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.state.jcrmc.length) {
            Toast.show('请选择检查人');
        } else if (this.state.fcfj.length === 0) {
            Toast.show('请选择附件');
        } else {
            axios.post('/psmAqjcjh/saveAqjcjl', {
                userID: GLOBAL_USERID,
                id: this.state.id,
                aqjcjhId: this.state.aqjcjhId,
                aqjcjhmc: this.state.aqjcjhmc,
                gczxId: this.state.gczxId,
                xmbh: this.state.xmbh,
                jcr: this.state.jcr,
                jcbm: this.state.jcbm,
                jcsj: this.state.jcsj,
                jcjg: this.jianchaResult,
                zgyq: this.state.zgyq,
                wtlb: this.state.wenti,
                sfxczg: this.state.sfxczg ? '1' : '0',
                jcfj: this.state.jcfj,
                fcfj: this.state.fcfj,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    Toast.show('保存成功');
                    this.props.navigator.pop();
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 0.0734 * height,
        marginBottom: 1
    },
    footSeparator: {
        width: width,
        height: 0.0165 * height,
        backgroundColor: '#f1f1f1'
    },
    footIntor: {
        width: width,
        height: 0.07 * height,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    footInfo: {
        width: width,
        height: 0.117 * height,
        paddingVertical: 8,
        paddingHorizontal: 17,
        backgroundColor: '#fff'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d',
        alignItems: 'flex-end'
    },
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5,
        fontSize: 15
    },
    btnView: {
        height: 0.045 * height,
        width: 0.36 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    },
    bottomView: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
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
        borderBottomColor: '#f1f1f1'
    },
    attachmentContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    choicImgSty: {
        height: 0.2 * width,
        width: 0.2 * width,
        marginRight: 0.03 * width,
        marginTop: 0.04 * width
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0.03 * width,
        marginTop: 0.04 * width
    }
});
