/**
 * Created by Nealyang on 2017/5/4.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const Platform = require('Platform');
const {width} = Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown';
import RNFS from 'react-native-fs';
import toast from 'react-native-simple-toast'
import {getRandomId} from '../../../../Util/Util'
import Organization from "../../../../Organization/Organization";
export default class AddShareData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareTypeArr: ['全员查询', '本人查询', '指定部门', '指定人员'],
            shareTypeID: [10, 50, 30, 40],
            shareType: '请选择共享方式',
            shareRangeArr: '',
            shareRangeCN: '',
            shareRangeEN: '',
            shareClass: [],
            shareClassId: [],
            fjid: getRandomId(),//资料id
            zlfl: '',
            bsid: this.props.jhxxId,//业务id
            gxfs: '',
            zlms: '',
            zlmc: '',

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="添加共享资料"/>
                <ScrollView scrollEnabled={false}>
                    <View style={styles.keyValue}>
                        <Text style={styles.keyStyle}>资料分类</Text>
                        <View style={styles.indicateView}>
                            <ModalDropdown
                                options={this.state.shareClass}
                                animated={true}
                                defaultValue={this.state.shareType}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({zlfl: this.state.shareClassId[a]})
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <Image style={styles.indicateImage}
                                   source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                        </View>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={styles.keyStyle}>共享方式</Text>
                        <View style={styles.indicateView}>
                            <ModalDropdown
                                options={this.state.shareTypeArr}
                                animated={true}
                                defaultValue={this.state.shareType}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({gxfs: this.state.shareTypeID[a]})
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <Image style={styles.indicateImage}
                                   source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                        </View>
                    </View>
                    {(this.state.gxfs === 30 || this.state.gxfs === 40) ?
                        <View style={styles.keyValue}>
                            <Text style={styles.keyStyle}>共享范围</Text>
                            <TouchableOpacity onPress={this.choicePeople.bind(this)}>
                                <TextInput
                                    style={[styles.inputStyle, {textAlign: 'right'}]}
                                    placeholder='点击选择'
                                    value={this.state.shareRangeCN}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View> : null}
                    <View style={styles.keyValue}>
                        <Text style={styles.keyStyle}>上传附件</Text>
                        <TouchableOpacity onPress={this.choiceFile.bind(this)}>
                            <Image style={styles.accessory}
                                   source={require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.keyValue, {borderBottomWidth: 0}]}>
                        <Text style={styles.keyStyle}>资料简要描述</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            autoFocus={true}
                            placeholder='请填写备注信息'
                            onChangeText={(remark) => this.setState({zlms: remark})}
                            underlineColorAndroid="transparent"
                            textAlignVertical="top"
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.submitButton} onPress={this.submit.bind(this)}>
                    <Text style={{color: '#fff'}}>确认提交</Text>
                </TouchableOpacity>
            </View>
        )
    }

    choicePeople() {
        let type = 'dep';
        if (this.state.gxfs === 40) {
            type = 'emp';
        }
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                select: (data) => {
                    let cn = [];
                    let en = [];
                    for(let i = 0;i<data.length;i++){
                        cn.push(data[i].name);
                        en.push(data[i].id);
                    }
                    this.setState({
                        shareRangeCN:cn.join(','),
                        shareRangeEN:en.join(',')
                    });

                },
                type:type
            }
        })
    }

    choiceFile() {
        if(Platform.OS === 'android'){
            toast.show('程序猿正在努力赶工上上传功能');
        }else{
            toast.show('iOS系统不支持文件上传操作');
        }
        // RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        //     .then((result) => {
        //         console.log('GOT RESULT', result);
        //
        //         // stat the first file
        //         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        //     })
        //     .then((statResult) => {
        //         if (statResult[0].isFile()) {
        //             // if we have a file, read it
        //             return RNFS.readFile(statResult[1], 'utf8');
        //         }
        //
        //         return 'no file';
        //     })
        //     .then((contents) => {
        //         // log the file contents
        //         console.log(contents);
        //     })
        //     .catch((err) => {
        //         console.log(err.message, err.code);
        //     });
    }

    componentDidMount() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_ZLFL',
                callID: true
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                for (let i = 0; i < responseData.data.length; i++) {
                    this.state.shareClass.push(responseData.data[i].name);
                    this.state.shareClassId.push(responseData.data[i].code);
                }
                this.setState({
                    shareClassId: this.state.shareClassId,
                    shareClass: this.state.shareClass
                })
            }
        })
    }

    submit() {
        let data = {
            userID: GLOBAL_USERID,
            fjid: this.state.fjid,
            bsid: this.state.bsid,
            zlfl: this.state.zlfl,
            gxfs: this.state.gxfs,
            gzfw: this.state.shareRangeEN,
            zlms: this.state.zlms,
            zlmc: 'zl.pdf',
            callID: true
        };
        console.log(data.zlms);
        if(data.zlfl === ''){
            toast.show('请选择资料分类');
        }else if(data.gxfs === ''){
            toast.show('请选择共享方式');
        }else if((data.gxfs === 30||data.gxfs === 40)&&data.gzfw===''){
            toast.show('请选择共享范围');
        }else if(data.zlms === ''){
            toast.show('请填写资料描述')
        }else {
            axios.post('/psmGxzl/save',data)
                .then(data=>{
                    if(data.code ===1){
                        toast.show('保存成功!');
                        let that = this;
                        setTimeout(function () {
                            that.props.navigator.pop();
                        },1000);
                    }else{
                        toast.show(data.message);
                    }
                })
                .catch(err=>{
                    if(err){
                        toast.show('服务端异常');
                    }
                })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    keyValue: {
        backgroundColor: '#fff',
        width: width,
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    keyStyle: {
        marginLeft: width * 0.02,
        fontSize: width * 0.036,
        color: '#5476a1'
    },
    inputStyle: {
        height: width * 0.12,
        width: width * 0.5,
        marginRight: width * 0.02,
        fontSize: width * 0.036,
    },
    modalDropDown: {
        width: width * 0.3
    },

    modalDropDownText: {
        fontSize: width * 0.035,
        textAlign: 'right'
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02,
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width * 0.02
    },
    accessory: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.02
    },
    textInput: {
        height: width * 0.3,
        backgroundColor: '#f2f2f2',
        width: width * 0.84,
        marginLeft: width * 0.1,
        borderRadius: 10,
        fontSize: 15
    },
    inputView: {
        backgroundColor: '#fff',
        paddingBottom: 20,
        width: width
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: width * 0.12,
        backgroundColor: '#216fd0',
        position: 'absolute',
        bottom: width * 0.02,
        borderRadius: 5
    }
});
