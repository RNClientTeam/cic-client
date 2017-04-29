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
import CameraPage from '../../Component/CameraPage'

/**
 * 更换头像 start
 */

import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';

const CANCEL_INDEX = 0;
const options = ['取消', '从相册中选择', '拍照'];
const title = '更换头像';

/**
 * 更换头像 end
 */

export default class TakePhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.handlePress = this.handlePress.bind(this)
        this.showActionSheet = this.showActionSheet.bind(this)
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        if (i === 1) {
            //从相册中选择
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageMaxWidth: 640,
                compressImageMaxHeight: 480,
                compressImageQuality: 0.5,
                compressVideoPreset: 'MediumQuality',
            }).then(image => {
                console.log('received image', image);
                this.setState({
                    image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
                });
            }).catch(e => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });

        } else if (i === 2) {
            //拍照
                ImagePicker.openCamera({
                    cropping: true,
                    width: 500,
                    height: 500,
                    cropperCircleOverlay: true
                }).then(image => {
                    console.log('received image', image);
                    this.setState({
                        image: {uri: image.path, width: image.width, height: image.height},
                        images: null
                    });
                }).catch(e => alert(e));
        }
    }


    render() {
        return (
            <View style={styles.getPhoto}>
                <TouchableOpacity onPress={this.showActionSheet}>
                    <Image style={styles.cameraIcon}
                           source={this.state.image ? this.state.image : require('../../../../resource/imgs/home/signed/getPhoto.png')}/>
                </TouchableOpacity>
                <Text style={styles.photoText}>拍摄上传照片</Text>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        )
    }

    takePhoto() {
        //拍照
        // this.props.navigator.push({
        //     name:'CameraPage',
        //     component:CameraPage
        // })
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