"use strict"
import React, {Component} from 'react';
import {
    TouchableHighlight,
    View,
    StyleSheet,
    Text,
    NativeModules,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
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
import Loading from "../../../Component/Loading.js";
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';
import baseUrl from '../../../Util/service.json';
import {getRandomId, getTimestamp, uploadFile} from '../../../Util/Util.js';
const {width, height} = Dimensions.get('window');

export default class ChoiceFileComponent extends Component {
    constructor(props) {
        super(props);
        this.randomId = getRandomId();
        this.state = {
            jcfj: [],
            imageList: [],
            choiceFileName: '所选文件名称'
        }
    }

    choiceFile() {
        if (this.props.getFileID) {
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
    }fcjlisAttach

    uploadFileFun(msg, fileSuffix, choiceImg) {
        this.setState({isLoading: true});
        let reqData = [
            {name: 'userID', data: GLOBAL_USERID},
            {name: 'files', data: RNFetchBlob.wrap(msg), filename: this.randomId + fileSuffix},
            {name: 'businessModule', data: this.props.businessModule},
            {name: 'isAttach', data: this.props.isAttach||'0'},
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
                    }, () => {
                        this.props.getFileID(this.state.jcfj.join(','));
                    });
                } else {
                    let tempArr = msg.split('/');
                    //android选择附件
                    this.setState({
                        jcfj: this.state.jcfj,
                        choiceFileName: tempArr[tempArr.length-1]
                    }, () => {
                        this.props.getFileID(this.state.jcfj.join(','));
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
        if (this.props.getFileID) {
            ImagePicker.showImagePicker(photoOptions,(response) =>{
                if (response.uri) {
                    this.uploadFileFun(response.uri, '.jpg', true);
                }
            });
        }
    }

    //创建选择图片的列表
    createImageList() {
        return this.state.imageList.map((elem, index) => {
            return (
                <View key={`i${index*11}`}>
                    <Image source={elem} style={styles.choicImgSty} />
                    <TouchableWithoutFeedback onPress={this.delImg.bind(this, index)}>
                        <Image source={require('../../../../resource/imgs/home/applications/addIcon.png')}
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
            this.setState({jcfj: this.state.jcfj}, () => {
                this.props.getFileID(this.state.jcfj.join(','));
            });
        }
    }

    render() {
        return (
            <View>
                <TouchableHighlight underlayColor="transparent" onPress={this.choiceFile.bind(this)}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>附件</Text>
                        <Image source={require('../../../../resource/imgs/home/attachment.png')} style={{width:20,height:20}}/>
                    </View>
                </TouchableHighlight>
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
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginTop: 0.04*width
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
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor:'#fff',
        height: 0.0734*height,
        marginBottom: 1
    }
});
