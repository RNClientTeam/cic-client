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
    TouchableWithoutFeedback,
    Linking
} from 'react-native';

const photoOptions = {
    title:'选择文件',
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
const imgEXT = ['png','jpg','gif','jpeg','bmp'];

export default class ChoiceFileComponent extends Component {
    constructor(props) {
        super(props);
        this.imageId = [];
        this.state = {
            jcfj: [],
            imageList: [],
            fileList: [],
            choiceFileName: '所选文件名称',
            hasFile: false
        }
    }

    choiceFile() {
        if (this.state.fileList.length !== 0) {
            Linking.canOpenURL(this.state.fileList[0].uri)
                .then(support => {
                    if (!support) {
                        toast.show('未能打开附件链接')
                    } else {
                        return Linking.openURL(this.state.fileList[0].uri);
                    }
                }).catch((err) => {
                    console.log('An error occurred', err);
                });
        } else {
            if (this.props.readOnly) return;
            if (Platform.OS === 'android') {
    			NativeModules.MyRN.scan((response) => {
                    if (response.didCancel) {
                        Toast.show('取消附件上传');
                    } else {
                        this.uploadFileFun(response.path);
                    }
                });
            } else {
                Toast.show('iOS系统不支持文件上传操作');
            }
        }
    }

    uploadFileFun(msg, choiceImg) {
        let tempArr = msg.split('/');
        let reqData = [
            {name: 'userID', data: GLOBAL_USERID},
            {name: 'files', data: RNFetchBlob.wrap(msg), filename: tempArr[tempArr.length-1]},
            {name: 'businessModule', data: this.props.businessModule},
            {name: 'isAttach', data: this.props.isAttach},
            {name: 'resourceId', data: this.props.resourceId},
            {name: 'callID', data: JSON.stringify(getTimestamp())}
        ];
        uploadFile(baseUrl.baseUrl + '/sysfile/UploadHandler', reqData, (response) => {
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
            Toast.show('文件上传失败');
        });
    }

    choiceImage() {
        if (this.props.readOnly || this.state.hasFile) return;
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.uri) {
                this.uploadFileFun(response.uri, true);
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
                        <Image source={require('../../../../resource/imgs/home/applications/addIcon.png')}
                            style={{height: width*0.05,width: width*0.05,position:'absolute',right:width*0.01,top:width*0.01}}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        });
    }

    delImg(index) {
        if (this.props.readOnly) return;
        this.state.imageList.splice(index, 1);
        this.setState({imageList:this.state.imageList});
        let delImgId = this.imageId[index];
        let result = this.state.jcfj.findIndex((elem, index) => {
            elem = delImgId;
        });
        if (result !== -1) {
            this.state.jcfj.splice(result, 1);
            this.setState({jcfj: this.state.jcfj}, () => {
                // this.props.getFileID(this.state.jcfj.join(','));
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
            </View>
        );
    }

    _deleteFile(id){
        axios.post('/sysfile/deleteHandler',{
            userID:GLOBAL_USERID,
            id:id,
            callID:true
        }).then(data=>{
            console.log(data,'删除文件');
        })
    }

    _checkDetail(id){
        axios.get('/sysfile/detailHandler',{
            params:{
                userID:GLOBAL_USERID,
                id:id,
                callID:true
            }
        }).then(data=>{
            console.log(data,'查看详情')
        })
    }

    componentDidMount(){
        let tempTimer = setTimeout(() => {
            this._getFileList();
            clearTimeout(tempTimer);
        }, 1000);
    }

    _getFileList(){
        axios.get('sysfile/filelist',{
            params:{
                userID:GLOBAL_USERID,
                businessModule:this.props.businessModule,
                resourceId:this.props.resourceId,
                isAttach:this.props.isAttach,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                data.data.forEach((elem, index) => {
                    let findRes = imgEXT.findIndex((ele, m) => {
                        return elem.fileExtension === ele;
                    });
                    if (findRes !== -1) {
                        //图片
                        this.state.imageList.push({uri:`${baseUrl.baseUrl}/sysfile/getFile?id=${elem.id}&isdown=0&callID=&sign=`});
                    } else {
                        this.state.fileList.push({uri:`${baseUrl.baseUrl}/sysfile/getFile?id=${elem.id}&isdown=1&callID=&sign=`});
                    }
                });
                this.setState({
                    imageList: this.state.imageList,
                    fileList: this.state.fileList,
                    hasFile: this.state.imageList.length !== 0 ? true : false
                });
            }else{
                Toast.show(data.message);
            }
        }).catch(err=>{
            Toast.show('服务端异常');
        })
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
