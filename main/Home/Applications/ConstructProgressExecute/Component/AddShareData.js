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
    ScrollView,
    NativeModules,
    TouchableHighlight
} from 'react-native'

import StatusBar from "../../../../Component/StatusBar.js";
import ModalDropdown from 'react-native-modal-dropdown';
import RNFS from 'react-native-fs';
import Loading from "../../../../Component/Loading.js";
const Platform = require('Platform');
import RNFetchBlob from 'react-native-fetch-blob'
import toast from 'react-native-simple-toast'
import {getRandomId, uploadFile, getTimestamp} from '../../../../Util/Util.js'
import baseUrl from '../../../../Util/service.json'
import Organization from "../../../../Organization/Organization.js";
const {width} = Dimensions.get('window');

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
            bsid: props.gczxId,//业务id
            gxfs: '',
            zlms: '',
            zlmc: '',
            randomId: getRandomId(),
            isLoading: false,
            uploadSuccess:false
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
                                    this.setState({
                                        gxfs: this.state.shareTypeID[a],
                                        shareRangeCN: '',
                                        shareRangeEN: ''
                                    })
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
                        <TouchableHighlight style={{paddingLeft: 50}} underlayColor='transparent' onPress={this.choiceFile.bind(this)}>
                            <Image style={styles.accessory}
                                   source={this.state.uploadSuccess?require('../../../../../resource/imgs/home/earlierStage/fj.png'):require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.keyValue, {borderBottomWidth: 0}]}>
                        <Text style={styles.keyStyle}>资料简要描述</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
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
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    showLoading() {
        this.setState({
            isLoading: true
        })
    }

    hideLoading() {
        this.setState({
            isLoading: false
        })
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
                    for (let i = 0; i < data.length; i++) {
                        cn.push(data[i].name);
                        en.push(data[i].id);
                    }
                    this.setState({
                        shareRangeCN: cn.join(','),
                        shareRangeEN: en.join(',')
                    });

                },
                type: type
            }
        })
    }

    choiceFile() {
        if (Platform.OS === 'android') {
            NativeModules.MyRN.scan((msg) => {
                    if (msg.didCancel) {
                        toast.show('已取消选择');
                    } else {
                        this.showLoading();
                        let reqData = [
                            {name: 'userID', data: GLOBAL_USERID},
                            {name: 'files', data: RNFetchBlob.wrap(msg.path), filename: msg.fileName},
                            {name: 'businessModule', data: 'gxzl'},
                            {name: 'isAttach', data: JSON.stringify(1)},
                            {name: 'resourceId', data: this.state.randomId},
                            {name: 'callID', data: JSON.stringify(getTimestamp())}
                        ];
                        uploadFile(baseUrl.baseUrl + '/sysfile/UploadHandler', reqData, (response) => {
                            this.hideLoading();
                            if (response.code === 1) {
                                toast.show('文件上传成功');
                                this.setState({
                                    uploadSuccess:true
                                });
                            } else {
                                this.setState({
                                    uploadSuccess:false
                                });
                                toast.show('文件上传失败，请重试');
                            }
                        }, (response) => {
                            this.hideLoading();
                            console.log(response, 'err')
                        });
                    }
                });
        } else {
            toast.show('iOS系统不支持文件上传操作');
        }
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
        if(this.state.uploadSuccess){
            let data = {
                userID: GLOBAL_USERID,
                fjid: this.state.randomId,
                bsid: this.state.bsid,
                zlfl: this.state.zlfl,
                gxfs: this.state.gxfs,
                gzfw: this.state.shareRangeEN,
                zlms: this.state.zlms,
                callID: true
            };
            if (data.zlfl === '') {
                toast.show('请选择资料分类');
            } else if (data.gxfs === '') {
                toast.show('请选择共享方式');
            } else if ((data.gxfs === 30 || data.gxfs === 40) && data.gzfw === '') {
                toast.show('请选择共享范围');
            } else if (data.zlms === '') {
                toast.show('请填写资料描述')
            } else {
                axios.post('/psmGxzl/save', data)
                    .then(data => {
                        if (data.code === 1) {
                            toast.show('保存成功!');
                            let that = this;
                            setTimeout(function () {
                                that.props.navigator.pop();
                            }, 1000);
                        } else {
                            toast.show(data.message);
                        }
                    })
                    .catch(err => {
                        if(err){
                            toast.show('服务端异常');
                        }
                    })
            }
        }else{
            toast.show('请先上传共享文件');
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
