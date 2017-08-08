/**
 * Created by zhubin on 17/5/25.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Switch,
    Platform,
    NativeModules,
    TouchableWithoutFeedback
} from 'react-native';
const photoOptions = {
    title:'更换头像',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从本地相册选取',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};
import Loading from "../../../../Component/Loading.js";
import SelectedRenwuJD from './SelectedRenwuJD.js';
import Organization from '../../../../Organization/Organization.js';
import Toast from 'react-native-simple-toast';
import StatusBar from "../../../../Component/StatusBar";
import KeyValueRight from "../../../../Component/KeyValueRight";
import KeyTime from "../../../../Component/KeyTime";
import LabelTextArea from "../../../../Component/LabelTextArea";
import ModalDropdown from 'react-native-modal-dropdown';
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';;
import {getRandomId} from '../../../../Util/Util.js';
const selectImg = [
    require('../../../../../resource/imgs/home/constuctPlan/choiced.png'),
    require('../../../../../resource/imgs/home/constuctPlan/unchoiced.png')
];
const {width} = Dimensions.get('window');

export default class QualityCheckRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.checkResult = '';  //检查结果
        this.changeResult = ''; //整改要求
        this.gcjd = '';         //工程节点
        this.imageId = [];      //图片附件的id
        this.randomId = getRandomId();
        this.state = {
            imageList: [],
            isLoading: false,
            isFinished: false,
            selList: [],
            questionList: [],
            defaultGcjd: '请选择>',
            reasonList: [],
            reasonListText: [],
            showBottom: true,
            rwnrid: '',     //质量检查任务ID
            jcbm: '',       //检查部门
            jcr: '请选择>',  //检查人
            jcrID: '',      //检查人的id
            jcsj: '',       //检查时间
            jcfj: getRandomId(),       //附件ID
            rwnr: '请选择>',       //任务内容
            gczxid: '',     //工程子项ID
            xmgh: '',       //项目工号
            xmmc: '',       //项目名称
            zxmc: '',       //子项名称
        };
    }

    componentDidMount() {
        //初始化
        this.initData();
        //获取问题类别
        this.getQuestionType();
        //获取工程节点
        this.getNodeList();
    }

    initData() {
        axios.get('/psmZljcjl/detail', {
            params: {
                userID: GLOBAL_USERID,
                id: '',
                callID: true
            }
        }).then((res) => {
            console.log(res);
            if (res.code === 1) {

            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {
            Toast.show('服务端异常');
        })
    }

    getFirstInfo(rowData) {
        this.setState({
            rwnrid: rowData.rwid,
            gczxid: rowData.zxid,
            xmgh: rowData.xmgh,
            rwnr: rowData.rwnr,
            xmmc: rowData.xmmc,
            zxmc: rowData.zxmc
        })
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
                Toast.show(res.message);
            }
        }).catch((error) => {

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
            this.changeResult = '';
            this.setState({
                selList:this.state.selList,
                showBottom: false,
                isFinished: false,
            });
        } else {
            this.state.selList.splice(0,1,false);
            let tempSel = !this.state.selList[index];
            this.state.selList.splice(index,1,tempSel);
            this.setState({
                selList:this.state.selList,
                showBottom: true
            });
        }
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
            jcbm: bmid,
            jcr: name,
            jcrID: id
        });
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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查纪录编辑"/>
                <ScrollView>
                    <TouchableOpacity onPress={this.onPress.bind(this)}>
                        <View style={styles.cell}>
                            <Text style={{color:'#5476a1'}}>检验任务</Text>
                            <Text>{this.state.rwnr}</Text>
                        </View>
                    </TouchableOpacity>
                    <KeyValueRight propKey="工程工号" readOnly={true} defaultValue={this.state.xmgh}/>
                    <KeyValueRight propKey="项目名称" readOnly={true} defaultValue={this.state.xmmc}/>
                    <KeyValueRight propKey="工程子项名称" readOnly={true} defaultValue={this.state.zxmc}/>
                    <View style={styles.cell}>
                        <Text style={{color:'#5476a1'}}>工程节点</Text>
                        <ModalDropdown
                            options={this.state.reasonListText}
                            animated={true}
                            defaultValue={this.state.defaultGcjd}
                            style={{flex:1, alignItems:'flex-end'}}
                            textStyle={{fontSize:14}}
                            onSelect={(a) => {
                                this.gcjd = this.state.reasonList[a].code;
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <KeyTime propKey="检验时间" showDate={this.state.jcsj} changeDate={this.changeDate.bind(this)}/>
                    <TouchableOpacity onPress={this.getNewPerson.bind(this)}>
                        <View style={styles.cell}>
                            <Text style={{color:'#5476a1'}}>检验人</Text>
                            <Text>{this.state.jcr}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.proView}>
                        <Text style={{color:'#5476a1'}}>问题类别</Text>
                        <View style={styles.seleView}>
                            {this.getQueList()}
                        </View>
                    </View>
                    <ChoiceFileComponent
                        resourceId={this.state.jcfj}
                        businessModule='zljcjl'
                        isAttach={1}/>
                    <LabelTextArea label="检查结果" inputResult={this.inputCheckResult.bind(this)}/>
                    {
                        this.state.showBottom &&
                        <LabelTextArea label="整改要求" inputResult={this.inputChangeResult.bind(this)}/>
                    }
                    <View style={styles.divide}/>
                    {
                        this.state.showBottom &&
                        <View style={styles.row}>
                            <Text style={styles.labelColor}>
                                是否已现场整改
                            </Text>
                            <View style={styles.blank}/>
                            <Switch onValueChange={(value) => this.toggle(value)}
                                    value={this.state.isFinished}/>
                        </View>
                    }
                </ScrollView>
                <View style={styles.actionPanel}>
                    <TouchableOpacity onPress={() => this.save()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    //填写检查结果
    inputCheckResult(text) {
        this.checkResult = text;
    }

    //填写整改要求
    inputChangeResult(text) {
        this.changeResult = text;
    }

    changeDate(date) {
        this.setState({jcsj:date});
    }

    //保存
    save() {
        let tempWtlb = [];
        this.state.selList.forEach((elem, index) => {
            if (elem) {
                tempWtlb.push(this.state.questionList[index].code);
            }
        });
        let wtlb = tempWtlb.join(',');
        if (this.state.rwnr === '请选择>') {
            Toast.show('请选择检验任务');
        } else if (this.gcjd.length === 0) {
            Toast.show('请选择工程节点');
        } else if (this.state.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.state.jcr === '请选择>') {
            Toast.show('请选择检查人');
        } else if (wtlb.length === 0) {
            Toast.show('请选择问题类别');
        } else if (this.checkResult.length === 0) {
            Toast.show('请填写检查结果');
        } else if (this.changeResult.length === 0 && this.state.showBottom) {
            Toast.show('请填写整改要求');
        } else {
            axios.post('/psmZljcjl/save', {
                userID: GLOBAL_USERID,
                rwnrid: this.state.rwnrid,
                gcjd: this.gcjd,
                wtlb: wtlb,
                jcbm: this.state.jcbm,
                jcr: this.state.jcrID,
                jcsj: this.state.jcsj,
                jcjg: this.checkResult,
                jcfj: this.state.jcfj,
                zgyq: this.changeResult,
                sfxczg: this.state.isFinished?'1':'0',
                rwnr: this.state.rwnr,
                gczxid: this.state.gczxid,
                xmgh: this.state.xmgh,
                cjbm: '',
                cjsj: '',
                callID: true
            }).then((data) => {
                console.log(data)
                if (data.code === 1) {
                    Toast.show('保存成功');
                    this.props.navigator.pop();
                } else {
                    Toast.show(data.message);
                }
            }).catch((error) => {
                console.log(error);
                Toast.show('服务端异常');
            });
        }
    }

    toggle(value) {
        this.setState({isFinished: value})
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    actionPanel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.1 * width,
        width: width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    row: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    blank: {
        flex: 1
    },
    buttonText: {
        color: 'white'
    },
    labelColor: {
        color: '#5476a1'
    },
    divide: {
        height: 0.02 * width
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
    seleView: {
        width: width * 0.64,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
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
    cell: {
        height:width*0.12,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingRight:width*0.02
    }
});
