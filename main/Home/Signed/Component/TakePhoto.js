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
                <Text style={styles.photoText}>拍摄上传照片</Text>
            </View>
        )
    }

    takePhoto() {
        ImagePicker.launchCamera(photoOptions, (response)  => {
            if (response.uri) {
                this.setState({image: {uri:response.uri}});
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
