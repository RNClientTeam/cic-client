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
import qs from 'qs'
var photoOptions = {
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
import ImagePicker from 'react-native-image-picker';
import CameraPage from '../../Component/CameraPage'

export default class TakePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }

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
                this.setState({image: {uri:response.uri}});
                let data = {
                    userID:GLOBAL_USERID,
                    files:response.uri,
                    businessModule:'zyjhcg',
                    resourceId:getRandomId(30),
                    isAttach:1,
                    callID:getTimestamp()
                };
                data.sign = getSign(data,SECRETKEY);
                let reqData = [
                    {name:'userID',data:JSON.stringify(GLOBAL_USERID)},
                    {name:'files',data:RNFetchBlob.wrap(response.uri),filename:'test.jpg'},
                    {name:'businessModule',data:JSON.stringify(data.businessModule)},
                    {name:'isAttach',data:JSON.stringify(1)},
                    {name:'callID',data:JSON.stringify(data.callID)},
                    {name:'sign',data:JSON.stringify(data.sign)}
                ];
                uploadFile('http://10.1.1.12/service/sysfile/UploadHandler',reqData,(response)=>{
                    alert(2)
                },(response)=>{console.log(response,'err')});
                // let formData = new FormData();
                // let file = {uri: response.uri, type: 'multipart/form-data', name: 'a.jpg'};
                // formData.append('userID',GLOBAL_USERID);
                // formData.append('files',file);
                // formData.append('businessModule','zyjhcg');
                // formData.append('resourceId',data.resourceId);
                // formData.append('isAttach',data.isAttach);
                // formData.append('callID',data.callID);
                // formData.append('sign',data.sign);
                // console.log(111)
                // fetch('http://10.1.1.12/service',{
                //     method:'POST',
                //     headers:{
                //         'Content-Type':'multipart/form-data',
                //     },
                //     body:formData
                // })
                //     .then((response) => response.text() )
                //     .then((responseData)=>{
                //
                //         console.log('responseData',responseData);
                //     })
                //     .catch((error)=>{console.error('error',error)});
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
