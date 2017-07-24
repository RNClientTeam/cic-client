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
    TextInput
} from 'react-native'
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
            isLoading: false,
            zxmc: '',           //子项名称
            xmgh: '',           //项目工号
            xmmc: '',           //项目名称
            cjsj: '',           //创建时间
            jcsj: '',           //检查时间
            dqzt: '',           //当前状态
            rwxz: '',           //任务性质
            jcr: '',            //检查人
            id: '',             //检查记录ID
            gcjd: '',           //工程节点
            dqztmc: '',         //当前状态名称
            rwnr: '',           //检查任务内容
            nodeId: '',         //流程节点
            zxid: '',           //子项ID
            sfxczg: '',         //是否现场整改
            twzt: '',           //任务状态
            sfdb: '',           //是否代办
            cjr: '',            //创建人
            wtlb: '',           //问题类别
            questionList: [],
            proList: [],
            wenti: '',
            isFinished: false
        }
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
            jcr: name
        });
    }

    //获取问题类别
    getQuestionType() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_WTLB_ZL',
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

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验任务</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.rwnr||''}
                            onChangeText={(text) => {
                                this.setState({rwnr:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程工号</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.xmgh||''}
                            onChangeText={(text) => {
                                this.setState({xmgh:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>项目名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.xmmc||''}
                            onChangeText={(text) => {
                                this.setState({xmmc:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程子项名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.zxmc||''}
                            onChangeText={(text) => {
                                this.setState({zxmc:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程节点</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.gcjd||''}
                            onChangeText={(text) => {
                                this.setState({gcjd:text});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验时间</Text>
                        <ChoiceDate showDate={this.state.data.jcsj||''}
                            disabled={!this.props.check}
                            changeDate={(date)=>{
                                this.setState({jcsj:date});
                            }}/>
                    </View>
                    <TouchableOpacity onPress={this.gotoOrganization.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验人</Text>
                            <Text style={styles.contentText} numberOfLines={1}>{this.state.jcr||''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>问题类别</Text>
                        <ModalDropdown
                            options={this.state.questionList}
                            animated={true}
                            disabled={this.props.check}
                            defaultValue={this.state.questionList[this.state.data.wtlb]||''}
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
                    <View style={styles.divide}/>
                    <ChoiceFileComponent
                        getFileID={(theID) => {}}
                        businessModule='zljcjl'
                        isAttach={false}/>
                    <LabelTextArea label="检查结果"/>
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
                            <Switch onValueChange={(value) => {this.setState({isFinished:value})}}
                                    value={this.state.isFinished}/>
                        </View>
                    }
                    {
                        !this.props.fromList &&
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

    //保存并提交
    saveAndCommit() {

    }

    //保存
    save() {

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
                this.setState({
                    zxmc: data.data.zxmc,
                    xmgh: data.data.xmgh,
                    xmmc: data.data.xmmc,
                    cjsj: data.data.cjsj,
                    jcsj: data.data.jcsj,
                    dqzt: data.data.dqzt,
                    rwxz: data.data.rwxz,
                    jcr: data.data.jcr,
                    id: data.data.id,
                    gcjd: data.data.gcjd,
                    dqztmc: data.data.dqztmc,
                    rwnr: data.data.rwnr,
                    nodeId: data.data.nodeId,
                    zxid: data.data.zxid,
                    sfxczg: data.data.sfxczg,
                    twzt: data.data.twzt,
                    sfdb: data.data.sfdb,
                    cjr: data.data.cjr,
                    wtlb: data.data.wtlb
                });
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            this.setState({isLoading: false});
        })
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
    }
});
