"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TextInput,
    Image,
    NativeModules,
    Platform,
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
const {width, height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import baseUrl from '../../../../Util/service.json';
import Loading from "../../../../Component/Loading.js";
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Organization from '../../../../Organization/Organization.js';
import {getRandomId, getTimestamp, uploadFile} from '../../../../Util/Util.js';
export default class ReviewRecord extends Component {
    constructor(props) {
        super(props);
        this.inputResult = '';
        this.randomId = getRandomId();
        this.imageId = [];
        this.state = {
            fuchaTime: '',
            fuchaPerson: '请选择>',
            personId: '',
            isLoading: false,
            jcfj: [],       //附件id
            imageList: [],
            choiceFileName: '所选附件名称'

        }
    }

    selPerson() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        })
    }

    getInfo(bmid, name, id) {
        this.setState({
            fuchaPerson: name,
            personId: id
        });
    }

    //上传附件
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

    choiceImage() {
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.uri) {
                this.uploadFileFun(response.uri, '.jpg', true);
            }
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
            <View style={styles.flex}>
                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>复查时间</Text>
                    <ChoiceDate
                        showDate={this.state.fuchaTime}
                        changeDate={(date)=>{this.setState({fuchaTime:date});}}/>
                </View>

                <TouchableOpacity onPress={this.selPerson.bind(this)}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>复查人</Text>
                        <Text style={styles.valueText}>{this.state.fuchaPerson}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.choiceFile.bind(this)}>
                    <View style={styles.cell}>
                        <Text style={{color:'#5476a1'}}>附件</Text>
                        <Image style={{width:0.05*width, height:0.05*width}} source={require('../../../../../resource/imgs/home/attachment.png')}/>
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

                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>整改复查结果</Text>
                </View>
                <TextInput style={styles.inpurResult}
                    placeholder="请填写"
                    numberOfLines={2}
                    multiline={true}
                    onChangeText={(text) => {
                        this.inputResult = text;
                    }}/>

                <View style={styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                            <Text style={styles.btnText}>保存</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.state.isLoading ? <Loading/> : null}
            </View>

        );
    }

    save() {
        let jcfj = this.state.jcfj.join(',');
        if (this.state.fuchaTime.length === 0) {
            Toast.show('请选择复查时间');
        } else if (this.state.fuchaPerson === '请选择>') {
            Toast.show('请选择复查人');
        } else if (jcfj.length === 0) {
            Toast.show('请选择附件');
        } else if (this.inputResult.length === 0) {
            Toast.show('请填写复查结果');
        } else {
            axios.post('/psmAqjcjh/saveAqjcjl4fc', {
                userID: GLOBAL_USERID,
                id: this.props.data.aqjcjhId,
                frc: this.state.personId,
                fcsj: this.state.fuchaTime,
                fcjg: this.inputResult,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    Toast.show('保存成功');
                    this.props.navigator.pop();
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 9
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1',
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        marginTop:1,
        justifyContent: 'space-between'
    },
    bottomView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        height: 0.06 * height,
        width: 0.8 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    },
    inpurResult: {
        textAlign: 'left',
        width: width,
        height: 0.1 * height,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 14,
        marginTop: 1,
        marginBottom: 10
    },
    cell: {
        height:width*0.12,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingRight:width*0.02,
        marginTop: 10
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 10
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    attachmentContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
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
    choicImgSty: {
        height: 0.2 * width,
        width: 0.2 * width,
        marginRight: 0.03 * width,
        marginTop: 0.04*width
    }
});
