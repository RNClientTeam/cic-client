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
    TouchableOpacity,
    TextInput,
    Switch,
    TouchableHighlight
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
import toast from 'react-native-simple-toast'
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
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
            jcr: '',
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
                id: this.props.data.id,
                callID: true
            }
        }).then(data => {
            this.setState({isLoading: false});
            if (data.code === 1) {
                this.setState({
                    zxmc: data.data.zxmc,
                    xmgh: data.data.xmgh,
                    xmmc: data.data.xmmc,
                    cjsj: data.data.cjsj,
                    jcsj: data.data.jcsj,
                    dqzt: data.data.dqzt,
                    jcr: data.data.jcr,
                    jcrmc: data.data.jcrmc,
                    id: data.data.id,
                    gcjd: data.data.gcjd,
                    rwnr: data.data.rwnr,
                    zxid: data.data.zxid,
                    sfxczg: data.data.sfxczg,
                    cjr: data.data.cjr,
                    wtlb: data.data.wtlb,
                    rwnrid: data.data.rwnrid,
                    jcbm: data.data.jcbm,
                    jcjg: data.data.jcjg,
                    zgfj: data.data.zgfj,
                    zzjg: data.data.zzjg,
                    jcfj: data.data.jcfj,
                    jcr: data.data.jcr,
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
        if (this.props.check) return;
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
        if (this.props.fromList) return;
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
                sfxczg: false,
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

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验任务</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            editable={!this.props.check&&!this.props.fromList}
                            defaultValue={this.state.rwnr||''}
                            onChangeText={(text) => {
                                this.setState({rwnr:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程工号</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            editable={!this.props.check&&!this.props.fromList}
                            defaultValue={this.state.xmgh||''}
                            onChangeText={(text) => {
                                this.setState({xmgh:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>项目名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            editable={!this.props.check&&!this.props.fromList}
                            defaultValue={this.state.xmmc||''}
                            onChangeText={(text) => {
                                this.setState({xmmc:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程子项名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            editable={!this.props.check&&!this.props.fromList}
                            defaultValue={this.state.zxmc||''}
                            onChangeText={(text) => {
                                this.setState({zxmc:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程节点</Text>
                        <ModalDropdown
                            options={this.state.reasonListText}
                            animated={true}
                            disabled={this.props.check||this.props.fromList}
                            defaultValue={this.state.reasonListText[this.state.gcjd-1]||''}
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
                        {
                            (this.props.check||this.props.fromList) ?
                            <Text style={{fontSize:14}}>{this.state.jcsj||''}</Text> :
                            <ChoiceDate showDate={this.state.jcsj||''}
                                disabled={this.props.check||this.props.fromList}
                                changeDate={(date)=>{
                                    this.setState({jcsj:date});
                                }}/>
                        }
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
                        getFileID={(theID) => {}}
                        businessModule='zljcjl'/>
                    <LabelTextArea label="检查结果"
                        onTextChange={(text)=>{this.setState({jcjg:text})}}
                        value={this.state.jcjg}
                        readOnly={this.props.check&&this.props.fromList}/>
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
                                editable={!this.props.fromList}
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
                                    if (this.props.fromList) return;
                                    this.setState({sfxczg:value?1:0});
                                }}
                                value={this.state.sfxczg==0?false:true}/>
                        </View>
                    }
                    {
                        !this.props.fromList &&
                        <View style={styles.bottomView}>
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

    //保存
    save() {
        if (this.state.jcsj.length === 0) {
            toast.show('请选择检查时间');
            return;
        } else if (this.state.jcrmc.length === 0) {
            toast.show('请选择检验人');
            return;
        } else if (this.state.jcfj.length === 0) {
            toast.show('请选择附件');
            return;
        } else if (this.state.jcjg.length === 0) {
            toast.show('请填写检查结果');
            return;
        } else if (this.state.zgyq.length === 0 && this.state.wtlb!='1') {
            toast.show('请填写整改要求');
            return;
        }
        axios.post('/psmZljcjl/save', {
            userID: GLOBAL_USERID,
            rwnrid: this.state.rwnrid,
            gcjd: this.state.gcjd,
            wtlb: this.state.wtlb,
            jcbm: this.state.jcbm,
            jcr: this.state.jcr,
            jcsj: this.state.jcsj,
            jcjg: this.checkResult,
            jcfj: this.state.jcfj,
            zgyq: this.state.zgyq,
            sfxczg: this.state.sfxczg,
            rwnr: this.state.rwnr,
            gczxid: this.state.zxid,
            xmgh: this.state.xmgh,
            cjbm: this.state.cjbm,
            cjsj: this.state.cjsj,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                toast.show('保存成功');
                this.props.reloadInfo();
                this.props.navigator.pop();
            } else {
                toast.show(res.messa);
            }
        }).catch((error) => {

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
        width: width - 40,
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
