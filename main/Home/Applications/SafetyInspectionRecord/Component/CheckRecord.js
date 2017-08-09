import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableHighlight,
    Switch,
    TouchableWithoutFeedback
} from 'react-native';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Loading from "../../../../Component/Loading.js";
import Toast from 'react-native-simple-toast'
const {width, height} = Dimensions.get('window');
import KeyValueLeft from './KeyValueLeft.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Organization from '../../../../Organization/Organization.js';
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
import SelectedPage from './SelectedPage.js';
import CheckFlowInfo from './CheckFlowInfo.js';
export default class DoubleCheckDetail extends Component {
    constructor(props) {
        super(props);
        this.zgyq = '';
        this.jianchaResult = '';
        this.state = {
            isLoading: false,
            data: {},
            questionList: [],
            proList: [],
            wenti: '',
            isFinished: false
        }
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
                    questionList:res.data.map((elem, index) => {
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

    componentDidMount() {
        //获取问题类别
        this.getQuestionType();
        this.setState({isLoading:true});
        axios.get('/psmAqjcjh/init4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.add ? '' : this.props.data.id,
                callID: true
            }
        }).then((res) => {
            console.log(res);
            if (res.code === 1) {
                this.setState({
                    data: res.data,
                    isLoading: false,
                    wenti: res.data.wtlb
                });
            } else {
                this.setState({isLoading:false});
                Toast.show(res.message);
            }
        }).catch((error) => {
            this.setState({isLoading:false});
        });
    }

    gotoOrganization() {
        if (!this.props.add&!this.props.edit) return;
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
        this.state.data.jcrmc = name;
        this.state.data.jcr = id;
        this.setState({data:data});
    }

    //选择任务
    gotoSele() {
        if (this.props.add || this.props.edit) {
            this.props.navigator.push({
                name: 'SelectedPage',
                component: SelectedPage,
                params: {
                    getSelInfo: this.getSelInfo.bind(this)
                }
            });
        }
    }

    getSelInfo(rowData) {
        this.state.data.aqjcjhmc = rowData.aqjcjhmc;
        this.state.data.xmbh = rowData.xmbh;
        this.state.data.xmmc = rowData.xmmc;
        this.state.data.zxmc = rowData.gczxmc;
        this.state.data.aqjcjhId = rowData.aqjcjhId;
        this.state.data.gczxId = rowData.gczxId;
        this.setState({data: this.state.data});
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <TouchableWithoutFeedback onPress={this.gotoSele.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验任务</Text>
                            <Text style={styles.contentText} numberOfLines={2}>
                                {this.state.data.aqjcjhmc||'请选择>'}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程工号</Text>
                        <Text style={styles.contentText} numberOfLines={2}>
                            {this.state.data.xmbh||'请选择>'}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>项目名称</Text>
                        <Text style={styles.contentText} numberOfLines={2}>
                            {this.state.data.xmmc||'请选择>'}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程子项名称</Text>
                        <Text style={styles.contentText} numberOfLines={2}>
                            {this.state.data.zxmc||'请选择>'}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>问题类别</Text>
                        <ModalDropdown
                            options={this.state.questionList}
                            animated={true}
                            disabled={!this.props.add&&!this.props.edit}
                            defaultValue={this.state.data.wtlb?this.state.questionList[this.state.data.wtlb-1]:'请选择>'}
                            style={{flex:1, alignItems:'flex-end'}}
                            textStyle={{fontSize:14}}
                            onSelect={(a) => {
                                this.setState({
                                    wenti:this.state.proList[a].code,
                                    isFinished:this.state.proList[a].code==='1'?false:this.state.isFinished,
                                });
                                this.zgyq = this.state.proList[a].code==='1'?'':this.zgyq;
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验时间</Text>
                        {
                            (this.props.check||this.props.fromList) ?
                            <Text style={{fontSize:14}}>{this.state.data.jcsj||''}</Text> :
                            <ChoiceDate showDate={this.state.data.jcsj||''}
                                disabled={!this.props.edit&&!this.props.add}
                                changeDate={(date)=>{
                                    this.state.data.jcsj = date;
                                    this.setState({data:this.state.data});
                                }}/>
                        }
                    </View>
                    <TouchableOpacity onPress={this.gotoOrganization.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验人</Text>
                            <Text style={styles.contentText} numberOfLines={1}>{this.state.data.jcrmc||''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divide}/>
                    <ChoiceFileComponent
                        businessModule={this.state.data.businessModule}
                        resourceId={this.state.data.jcfj}
                        readOnly={!this.props.edit&&!this.props.add}
                        isAttach={this.props.add?this.state.data.jcjlisAttach:this.state.data.jcfjisAttach}/>
                    <View style={styles.divide}/>
                    <View style={styles.bottomRow}>
                        <Text style={styles.labelColor}>检查结果</Text>
                    </View>
                    <View style={styles.textContent}>
                        <TextInput style={styles.textinputStyle}
                            multiline={true}
                            editable={(this.props.add||this.props.edit)?true:false}
                            defaultValue={this.state.data.fcjg}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {this.jianchaResult=text;}}
                            underlineColorAndroid="transparent"/>
                    </View>
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.bottomRow}>
                            <Text style={styles.labelColor}>整改要求</Text>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.textContent}>
                            <TextInput style={styles.textinputStyle}
                                multiline={true}
                                editable={(this.props.check||this.props.add||this.props.edit)?true:false}
                                defaultValue={this.state.data.zgyq||''}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {this.zgyq=text;}}
                                underlineColorAndroid="transparent"/>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.keyValue}>
                            <Text style={[styles.labelColor,{marginLeft:width*0.02}]}>是否已现场整改</Text>
                            <Switch onValueChange={(value) => {
                                    if (!this.props.add&&!this.props.edit) return;
                                    this.setState({isFinished:value});
                                }}
                                value={this.state.isFinished}/>
                        </View>
                    }

                    {
                        (this.props.check||this.props.add||this.props.edit) &&
                        <View style={styles.bottomView}>
                            <TouchableHighlight underlayColor="transparent" onPress={this.saveAndCommit.bind(this)}>
                                <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                                    <Text style={styles.btnText}>保存并提交</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                                <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                                    <Text style={styles.btnText}>保存</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    //提交并保存
    saveAndCommit() {
        let data = this.state.data;
        if (data.aqjcjhmc.length === 0 || data.xmbh.length === 0) {
            Toast.show('请选择任务');
        } else if (this.state.wenti.length === 0) {
            Toast.show('请选择问题类别');
        } else if (data.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.jianchaResult.length === 0) {
            Toast.show('请填写检查结果');
        } else if (this.state.wenti != '1' && this.zgyq.length === 0) {
            Toast.show('请填写整改要求');
        } else {
            axios.post('/psmAqjcjh/saveAndsumbitAqjcjl', {
                userID: GLOBAL_USERID,
                id: this.state.data.id,
                aqjcjhId: this.state.data.aqjcjhId,
                aqjcjhmc: this.state.data.aqjcjhmc,
                gczxId: this.state.data.gczxId,
                xmbh: this.state.data.xmbh,
                jcr: this.state.data.jcr,
                jcbm: this.state.data.jcbm,
                jcsj: this.state.data.jcsj,
                jcjg: this.jianchaResult,
                zgyq: this.zgyq,
                wtlb: this.state.wenti,
                sfxczg: this.state.isFinished?'1':'0',
                jcfj: this.state.data.jcfj,
                fcfj: this.state.data.fcfj,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    Toast.show('保存成功');
                    if (res.data.isToSubmit) {
                        this.props.navigator.push({
                            name: 'CheckFlowInfo',
                            component: CheckFlowInfo,
                            params: {
                                resID: data.data.aqjcjlId,
                                reloadInfo: this.props.reloadInfo,
                                wfName: 'jdjhaqjcjl',
                                name:'SafetyInspectionRecord'
                            }
                        })
                    } else {
                        this.props.navigator.pop();
                        this.props.reloadInfo();
                    }
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
    }

    //提交
    save() {
        let data = this.state.data;
        if (data.aqjcjhmc.length === 0 || data.xmbh.length === 0) {
            Toast.show('请选择任务');
        } else if (this.state.wenti.length === 0) {
            Toast.show('请选择问题类别');
        } else if (data.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.jianchaResult.length === 0) {
            Toast.show('请填写检查结果');
        } else if (this.state.wenti != '1' && this.zgyq.length === 0) {
            Toast.show('请填写整改要求');
        } else {
            axios.post('/psmAqjcjh/saveAqjcjl', {
                userID: GLOBAL_USERID,
                id: this.state.data.id,
                aqjcjhId: this.state.data.aqjcjhId,
                aqjcjhmc: this.state.data.aqjcjhmc,
                gczxId: this.state.data.gczxId,
                xmbh: this.state.data.xmbh,
                jcr: this.state.data.jcr,
                jcbm: this.state.data.jcbm,
                jcsj: this.state.data.jcsj,
                jcjg: this.jianchaResult,
                zgyq: this.zgyq,
                wtlb: this.state.wenti,
                sfxczg: this.state.isFinished?'1':'0',
                jcfj: this.state.data.jcfj,
                fcfj: this.state.data.fcfj,
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
    row: {
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelColor: {
        color: '#5476a1'
    },
    bottomRow: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        marginBottom :1,
        backgroundColor: 'white'
    },
    textContent: {
        width: width,
        height: 0.117 * height,
        paddingVertical: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 0.02 * width,
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
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
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
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5,
        fontSize:15
    }
});
