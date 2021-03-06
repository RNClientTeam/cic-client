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
    Switch,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
const selectImg = [
    require('../../../../../resource/imgs/home/constuctPlan/choiced.png'),
    require('../../../../../resource/imgs/home/constuctPlan/unchoiced.png')
];
import ModalDropdown from 'react-native-modal-dropdown';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Organization from '../../../../Organization/Organization.js';
import KeyValueLeft from "../../../../Component/KeyValueLeft"
import LabelTextArea from "../../../../Component/LabelTextArea"
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast';
import {getRandomId} from '../../../../Util/Util.js';
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
import SelectedRenwuJD from './SelectedRenwuJD.js';
import StatusBar from "../../../../Component/StatusBar.js";
import CheckFlowInfo from '../../SafetyInspectionRecord/Component/CheckFlowInfo.js';
const {width, height} = Dimensions.get('window');

export default class DoubleCheckDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            zxmc: '',           //子项名称
            xmgh: '',           //项目工号
            xmmc: '',           //项目名称
            cjsj: '',           //创建时间
            jcsj: '',           //检查时间
            dqzt: '',           //当前状态
            jcr: '',            //检查人
            id: '',             //检查记录ID
            gcjd: '',           //工程节点
            rwnr: '',           //检查任务内容
            rwnrid: '',         //任务内容id
            zxid: '',           //子项ID
            sfxczg: '',         //是否现场整改
            cjr: '',            //创建人
            wtlb: '',           //问题类别
            jcrmc: '',          //检查人名称
            jcbm: '',           //检查部门
            jcjg: '',           //检查结果
            zgfj: '',
            zzjg: '',
            jcfj: '',
            jcbmmc: '',
            cjbm: '',
            cjrmc: '',
            rwxz: '',
            cjbmmc: '',
            zgyq: '',
            questionList: [],
            reasonList: [],
            reasonListText: [],
            selList: []
        }
    }

    componentDidMount() {
        this.getQuestionType();
        this.getNodeList();
        axios.get('/psmZljcjl/detail', {
            params: {
                userID: GLOBAL_USERID,
                id: '',
                callID: true
            }
        }).then(data => {
            this.setState({isLoading: false});
            if (data.code === 1) {
                this.setState({
                    zxmc: data.data.zxmc || this.props.zxmc,
                    xmgh: data.data.xmgh || this.props.xmgh,
                    xmmc: data.data.xmmc || this.props.xmmc,
                    cjsj: data.data.cjsj,
                    jcsj: data.data.jcsj,
                    dqzt: data.data.dqzt,
                    jcr: data.data.jcr,
                    jcrmc: data.data.jcrmc || this.props.zrrmc,
                    id: data.data.id,
                    gcjd: data.data.gcjd,
                    rwnr: data.data.rwnr || this.props.rwnr,
                    zxid: data.data.zxid,
                    sfxczg: data.data.sfxczg,
                    cjr: data.data.cjr,
                    wtlb: data.data.wtlb,
                    rwnrid: data.data.rwnrid,
                    jcbm: data.data.jcbm,
                    jcjg: data.data.jcjg,
                    zgfj: data.data.zgfj,
                    zzjg: data.data.zzjg,
                    jcfj: data.data.jcfj||getRandomId(),
                    jcbmmc: data.data.jcbmmc,
                    cjbm: data.data.cjbm,
                    cjrmc: data.data.cjrmc,
                    rwxz: data.data.rwxz,
                    cjbmmc: data.data.cjbmmc,
                    zgyq: data.data.zgyq
                });
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            this.setState({isLoading: false});
        });
    }

    gotoOrganization() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        });
    }

    //获取检验人：部门id  姓名  id
    getInfo(bmid, name, id) {
        this.setState({
            jcr: id,
            jcrmc: name,
            jcbm: bmid
        });
    }

    //获取工程节点
    getNodeList() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_GCJD',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                res.data.forEach((elem, index) => {
                    this.state.reasonListText.push(elem.name);
                });
                this.setState({
                    reasonList:res.data,
                    reasonListText: this.state.reasonListText
                });
            }
        }).catch((error) => {

        });
    }

    //获取问题类别
    getQuestionType() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_WTLB',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                res.data.forEach(() => {
                    this.state.selList.push(false);
                });
                this.setState({
                    questionList:res.data,
                    selList: this.state.selList
                });
            } else {
                toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    //创建问题类别列表
    getQueList() {
        return this.state.questionList.map((elem, index) => {
            return (
                <View style={styles.itemView} key={elem.name}>
                    <TouchableOpacity style={styles.touchSty} onPress={this.proBtn.bind(this, elem, index)}>
                        <Image source={this.state.selList[index]?selectImg[0]:selectImg[1]} style={styles.imgSty}/>
                    </TouchableOpacity>
                    <Text numberOfLines={1}>{elem.name}</Text>
                </View>
            )
        });
    }

    //选择问题
    proBtn(elem, index) {
        if (elem.name === '正常') {
            let tempList = this.state.selList.concat();
            this.state.selList = [];
            tempList.forEach((elem, i) => {
                if (i === index) {
                    this.state.selList.push(true);
                } else {
                    this.state.selList.push(false);
                }
            });
            this.setState({
                selList:this.state.selList,
                wtlb: '1',
                sfxczg: '0',
                zgyq: ''
            });
        } else {
            this.state.selList.splice(0,1,false);
            let tempSel = !this.state.selList[index];
            this.state.selList.splice(index,1,tempSel);
            let tempWtlb = [];
            this.state.selList.forEach((elem, index) => {
                if (elem) {
                    tempWtlb.push(this.state.questionList[index].code);
                }
            });
            this.setState({
                selList:this.state.selList,
                wtlb: tempWtlb.join(',')
            });
        }
    }

    onPress() {
        this.props.navigator.push({
            name: 'SelectedRenwuJD',
            component: SelectedRenwuJD,
            params: {
                getFirstInfo: this.getFirstInfo.bind(this)
            }
        });
    }

    getFirstInfo(rowData) {
        this.setState({
            rwnr: rowData.rwnr,
            xmgh: rowData.xmgh,
            xmmc: rowData.xmmc,
            zxmc: rowData.zxmc,
            zxid: rowData.zxid,
            rwnrid: rowData.rwid,
            jcrmc: rowData.zrrmc,
            jcr: rowData.zrr,
            jcbm: rowData.zrbm
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录新建"/>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验任务</Text>
                            <Text style={styles.contentText}>
                                {this.state.rwnr||'请选择'} >
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程工号</Text>
                        <Text style={styles.contentText}>
                            {this.state.xmgh}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>项目名称</Text>
                        <Text style={styles.contentText}>
                            {this.state.xmmc}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程子项名称</Text>
                        <Text style={styles.contentText}>
                            {this.state.zxmc}
                        </Text>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程节点</Text>
                        <ModalDropdown
                            options={this.state.reasonListText}
                            animated={true}
                            defaultValue={this.state.gcjd?this.state.reasonListText[this.state.gcjd-1]:'请选择>'}
                            style={{flex:1, alignItems:'flex-end'}}
                            textStyle={{fontSize:14}}
                            onSelect={(a) => {
                                this.setState({
                                    gcjd:this.state.reasonList[a].code,
                                });
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验时间</Text>
                        <ChoiceDate showDate={this.state.jcsj||''}
                            changeDate={(date)=>{
                                this.setState({jcsj:date});
                            }}/>
                    </View>
                    <TouchableOpacity onPress={this.gotoOrganization.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验人</Text>
                            <Text style={styles.contentText} numberOfLines={1}>{this.state.jcrmc||''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.proView}>
                        <Text style={{color:'#5476a1'}} numberOfLines={1}>问题类别</Text>
                        <View style={styles.seleView}>
                            {this.getQueList()}
                        </View>
                    </View>


                    <View style={styles.divide}/>
                    <ChoiceFileComponent
                        resourceId={this.state.jcfj}
                        isAttach="1"
                        readOnly={false}
                        businessModule='zljcjl'/>
                    <LabelTextArea label="检查结果"
                        onTextChange={(text)=>{this.setState({jcjg:text})}}
                        value={this.state.jcjg}
                        readOnly={false}/>
                    {
                        this.state.wtlb !== '1' &&
                        <View style={styles.bottomRow}>
                            <Text style={styles.labelColor}>整改要求</Text>
                        </View>
                    }
                    {
                        this.state.wtlb !== '1' &&
                        <View style={styles.textContent}>
                            <TextInput style={styles.textinputStyle}
                                multiline={true}
                                defaultValue={this.state.zgyq}
                                placeholder="请填写"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {this.setState({zgyq:text})}}
                                underlineColorAndroid="transparent"/>
                        </View>
                    }
                    {
                        this.state.wtlb !== '1' &&
                        <View style={styles.keyValue}>
                            <Text style={[styles.labelColor,{marginLeft:width*0.02}]}>是否已现场整改</Text>
                            <Switch onValueChange={(value) => {
                                this.setState({sfxczg:value?1:0});
                            }}
                            value={this.state.sfxczg==0?false:true}/>
                        </View>
                    }
                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this, true)}>
                        <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                            <Text style={styles.btnText}>保存并提交</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this, false)}>
                        <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                            <Text style={styles.btnText}>保存</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    //保存
    save(gotoCheck) {
        if (this.state.rwnr.length === 0 || this.state.xmgh.length === 0 || this.state.xmmc.length === 0 || this.state.zxmc.length === 0) {
            toast.show('请选择任务');
            return;
        }
        if (this.state.gcjd.length === 0) {
            toast.show('请选择工程节点');
            return;
        }
        if (this.state.jcsj.length === 0) {
            toast.show('请选择检查时间');
            return;
        } else if (this.state.jcrmc.length === 0) {
            toast.show('请选择检验人');
            return;
        } else if (this.state.jcjg.length === 0) {
            toast.show('请填写检查结果');
            return;
        } else if (this.state.zgyq.length === 0 && this.state.wtlb!='1') {
            toast.show('请填写整改要求');
            return;
        }
        let reqURL;
        if (gotoCheck) {
            reqURL = '/psmZljcjl/saveAndsumbitZljcjl';
        } else {
            reqURL = '/psmZljcjl/save';
        }
        axios.post(reqURL, {
            userID: GLOBAL_USERID,
            rwnrid: this.state.rwnrid,
            gcjd: this.state.gcjd,
            wtlb: this.state.wtlb,
            jcbm: this.state.jcbm,
            jcr: this.state.jcr,
            jcsj: this.state.jcsj,
            jcjg: this.state.jcjg,
            jcfj: this.state.jcfj,
            zgyq: this.state.zgyq,
            sfxczg: this.state.sfxczg,
            rwnr: this.state.rwnr,
            gczxid: this.state.zxid,
            xmgh: this.state.xmgh,
            cjbm: this.state.cjbm,
            cjsj: this.state.cjsj,
            id: this.state.id,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                if (gotoCheck && res.data.isToSubmit) {
                    //跳转到流程
                    this.props.navigator.push({
                        name: "CheckFlowInfo",
                        component: CheckFlowInfo,
                        params: {
                            resID: res.data.id,
                            reloadInfo: this.props.reloadInfo,
                            wfName: 'jdjhzljcjl',
                            name:this.props.name||'QualityCheckRecord'
                        }
                    });
                } else {
                    toast.show('保存成功');
                    this.props.reloadInfo&&this.props.reloadInfo();
                    this.props.navigator.pop();
                }
            } else {
                toast.show(res.message);
            }
        }).catch((error) => {
            toast.show('服务端异常');
        });
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
        width: (width - 60)/2,
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
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 5,
        fontSize:14
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
    labelColor: {
        color: '#5476a1'
    },
    proView: {
        paddingHorizontal:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        flexDirection:"row",
        justifyContent:'space-between',
        backgroundColor:'#fff',
        paddingTop: 15
    },
    itemView: {
        width: width * 0.319,
        flexDirection: 'row',
        marginBottom: 15
    },
    imgSty: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    touchSty: {
        padding:4,
        paddingTop:0
    },
    seleView: {
        width: width * 0.64,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
    }
});
