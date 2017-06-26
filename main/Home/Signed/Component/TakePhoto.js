/**
 * Created by Nealyang on 2017/4/26.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native'
const {width, height} = Dimensions.get('window');
import RNFetchBlob from 'react-native-fetch-blob'
import {uploadFile,getTimestamp,getSign,getRandomId} from '../../../Util/Util'
import baseUrl  from '../../../Util/service.json'
const photoOptions = {
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};
import ImagePicker from 'react-native-image-picker';
import CameraPage from '../../Component/CameraPage'

export default class TakePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }G

    render() {
        return (
            <View style={styles.getPhoto}>
                <TouchableOpacity onPress={this.takePhoto.bind(this)}>
                    <Image style={styles.cameraIcon}
                           source={this.state.image ? this.state.image : require('../../../../resource/imgs/home/signed/getPhoto.png')}/>
                </TouchableOpacity>
                <Text style={styles.photoText}>拍摄照片</Text>
            </View>
        )
    }

    takePhoto() {
        ImagePicker.launchCamera(photoOptions, (response)  => {
            if (response.uri) {
                this.props.showLoading();
                this.setState({image: {uri:response.uri}});
                let data = {
                    userID:GLOBAL_USERID,
                    files:response.uri,
                    businessModule:'qiandao',
                    resourceId:getRandomId(),
                    isAttach:1,
                    callID:getTimestamp()
                };
                let reqData = [
                    {name:'userID',data:GLOBAL_USERID},
                    {name:'files',data:RNFetchBlob.wrap(response.uri),filename:this.props.ids+'.jpg'},
                    {name:'businessModule',data:'qiandao'},
                    {name:'isAttach',data:JSON.stringify(1)},
                    {name:'resourceId',data:this.props.ids},
                    {name:'callID',data:JSON.stringify(data.callID)}
                ];
                uploadFile(baseUrl.baseUrl+'/sysfile/UploadHandler',reqData,(response)=>{
                    this.props.hideLoading();
                    if(response.code === 1){
                        this.props.showToast('图片上传成功');
                    }else{
                        this.props.showToast('图片上传失败，请重试');
                    }
                },(response)=>{console.log(response,'err')});

            }
        });
    }
}

const styles = StyleSheet.create({
    getPhoto: {
        width: width,
        height: height * 0.23,
        backgroundColor: '#216fd0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraIcon: {
        width: width * 0.17,
        height: width * 0.17,
        resizeMode: 'contain',
        borderRadius: width * 0.17 / 2
    },
    photoText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10
    }
});
