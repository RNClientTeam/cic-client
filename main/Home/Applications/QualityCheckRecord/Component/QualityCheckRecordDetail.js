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
import ImagePicker from 'react-native-image-picker';
import Loading from "../../../../Component/Loading.js";
import SelectedRenwuJD from './SelectedRenwuJD.js';
import Organization from '../../../../Organization/Organization.js';
import Toast from 'react-native-simple-toast';
import StatusBar from "../../../../Component/StatusBar";
import KeyValueRight from "../../../../Component/KeyValueRight";
import KeyTime from "../../../../Component/KeyTime";
import LabelTextArea from "../../../../Component/LabelTextArea";
import ModalDropdown from 'react-native-modal-dropdown';
import RNFetchBlob from 'react-native-fetch-blob';
import baseUrl from '../../../../Util/service.json';
import {getRandomId, getTimestamp, uploadFile} from '../../../../Util/Util.js';
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
            choiceFileName: '',//选择附件的名字
            imageList: [],
            isLoading: false,
            isFinished: false,
            selList: [],
            questionList: [],
            defaultGcjd: '请选择>',
            jianyanRW: '请选择>',
            reasonList: [],
            reasonListText: [],
            rwnrid: '',     //质量检查任务ID
            jcbm: '',       //检查部门
            jcr: '请选择>',  //检查人
            jcrID: '',      //检查人的id
            jcsj: '',       //检查时间
            jcfj: [],       //附件ID
            rwnr: '',       //任务内容
            gczxid: '',     //工程子项ID
            xmgh: '',       //项目工号
            xmmc: '',       //项目名称
            zxmc: '',       //子项名称
        };
    }

    componentDidMount() {
        //获取问题类别
        this.getQuestionType();
        //获取工程节点
        this.getNodeList();
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
            this.setState({selList:this.state.selList});
        } else {
            this.state.selList.splice(0,1,false);
            let tempSel = !this.state.selList[index];
            this.state.selList.splice(index,1,tempSel);
            this.setState({selList:this.state.selList});
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

    choiceFile() {
        if (Platform.OS === 'android') {
            NativeModules.MyRN.scan((msg) => {
                    if (msg === '请选择合适的pdf格式文件') {
                        Toast.show('请选择pdf文件');
                    } else {
                        this.uploadFileFun(msg, '.pdf');
                    }
                },
                (result) => {
                    Toast.show('JS界面:错误信息为:' + result);
                });
        } else {
            Toast.show('iOS系统不支持文件上传操作');
        }
    }

    uploadFileFun(msg, fileSuffix, choiceImg) {
        this.setState({isLoading: true});
        let reqData = [
            {name: 'userID', data: GLOBAL_USERID},
            {name: 'files', data: RNFetchBlob.wrap(msg), filename: this.randomId + fileSuffix},
            {name: 'businessModule', data: 'gxzl'},
            {name: 'isAttach', data: JSON.stringify(1)},
            {name: 'resourceId', data: this.randomId},
            {name: 'callID', data: JSON.stringify(getTimestamp())}
        ];
        uploadFile(baseUrl.baseUrl + '/sysfile/UploadHandler', reqData, (response) => {
            this.setState({isLoading: false});
            if (response.code === 1) {
                Toast.show('文件上传成功');
                this.state.jcfj.push(response.data.id);
                if (choiceImg) {
                    //选择图片
                    this.state.imageList.push({uri:msg});
                    this.imageId.push(response.data.id);
                    this.setState({
                        imageList: this.state.imageList,
                        jcfj: this.state.jcfj
                    });
                } else {
                    let tempArr = msg.split('/');
                    //android选择附件
                    this.setState({
                        jcfj: this.state.jcfj,
                        choiceFileName: tempArr[tempArr.length-1]
                    });
                }
            } else {
                Toast.show('文件上传失败，请重试');
            }
        }, (response) => {
            Toast.show('ERROR');
            this.setState({isLoading: false});
        });
    }

    choiceImage() {
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.uri) {
                this.uploadFileFun(response.uri, '.jpg', true);
            }
        });
    }

    //创建选择图片的列表
    createImageList() {
        return this.state.imageList.map((elem, index) => {
            return (
                <View key={`i${index*11}`}>
                    <Image source={elem} style={styles.choicImgSty} />
                    <TouchableWithoutFeedback onPress={this.delImg.bind(this, index)}>
                        <Image source={require('../../../../../resource/imgs/home/applications/addIcon.png')}
                            style={{height: width*0.05,width: width*0.05,position:'absolute',right:width*0.01,top:width*0.01}}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        });
    }

    delImg(index) {
        this.state.imageList.splice(index, 1);
        this.setState({imageList:this.state.imageList});
        let delImgId = this.imageId[index];
        let result = this.state.jcfj.findIndex((elem, index) => {
            elem = delImgId;
        });
        if (result !== -1) {
            this.state.jcfj.splice(result, 1);
            this.setState({jcfj: this.state.jcfj});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查纪录编辑"/>
                <ScrollView>
                    <TouchableOpacity onPress={this.onPress.bind(this)}>
                        <View style={styles.cell}>
                            <Text style={{color:'#5476a1'}}>检验任务</Text>
                            <Text>{this.state.jianyanRW}</Text>
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
                    <TouchableOpacity onPress={this.choiceFile.bind(this)}>
                        <View style={styles.cell}>
                            <Text style={{color:'#5476a1'}}>附件</Text>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/attachment.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.attachment}>
                        <View style={styles.attachmentLabel}>
                            <Text style={{color: '#666'}}>{this.state.choiceFileName}</Text>
                        </View>
                        <View style={styles.attachmentContent}>
                            {this.createImageList()}
                            <TouchableOpacity onPress={this.choiceImage.bind(this)}>
                                <View style={styles.square}>
                                    <Text style={{fontSize: 0.1 * width, color: "#d2d2d2"}}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <LabelTextArea label="检查结果" inputResult={this.inputCheckResult.bind(this)}/>
                    <LabelTextArea label="整改要求" inputResult={this.inputChangeResult.bind(this)}/>
                    <View style={styles.divide}/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            是否已现场整改
                        </Text>
                        <View style={styles.blank}/>
                        <Switch onValueChange={(value) => this.toggle(value)}
                                value={this.state.isFinished}/>
                    </View>
                </ScrollView>
                <View style={styles.actionPanel}>
                    <TouchableOpacity onPress={() => this.saveAndSubmit()}>
                        <View style={[styles.button, {backgroundColor: "#02c088"}] }>
                            <Text style={styles.buttonText}>保存并提交</Text>
                        </View>
                    </TouchableOpacity>
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

    //保存并提交
    saveAndSubmit() {

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
        let jcfj = this.state.jcfj.join(',');
        if (this.state.jianyanRW === '请选择>') {
            Toast.show('请选择检验任务');
        } else if (this.gcjd.length === 0) {
            Toast.show('请选择工程节点');
        } else if (this.state.jcsj.length === 0) {
            Toast.show('请选择检查时间');
        } else if (this.state.jcr === '请选择>') {
            Toast.show('请选择检查人');
        } else if (wtlb.length === 0) {
            Toast.show('请选择问题类别');
        } else if (jcfj.length === 0) {
            Toast.show('请选择附件');
        } else if (this.checkResult.length === 0) {
            Toast.show('请填写检查结果');
        } else if (this.changeResult.length === 0) {
            Toast.show('请填写整改要求');
        }
        axios.post('/psmZljcjl/save', {
            userID: GLOBAL_USERID,
            rwnrid: this.state.rwnrid,
            gcjd: this.gcjd,
            wtlb: wtlb,
            jcbm: this.state.jcbm,
            jcr: this.state.jcrID,
            jcsj: this.state.jcsj,
            jcjg: this.checkResult,
            jcfj: jcfj,
            zgyq: this.changeResult,
            sfxczg: this.state.isFinished,
            rwnr: this.state.rwnr,
            gczxid: this.state.gczxid,
            xmgh: this.state.xmgh,
            callID: true
        }).then((data) => {
            if (data.code === 1) {
                Toast.show('保存成功');
            } else {
                Toast.show(data.message);
            }
        }).catch((error) => {

        });
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        width: 0.4 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width*0.02,
        marginRight: width*0.02,
        marginBottom: width*0.02,
        marginTop: width*0.03,
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
    textArea: {
        marginTop: 0.02 * width,
        backgroundColor: 'white'
    },
    textContent: {
        padding: 0.02 * width
    },
    divide: {
        height: 0.02 * width
    },
    icon: {
        width:width * 0.05,
        height:width * 0.05
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
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        marginTop: 0.04*width
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
    },
    choicImgSty: {
        height: 0.2 * width,
        width: 0.2 * width,
        marginRight: 0.03 * width,
        marginTop: 0.04*width
    }
});
