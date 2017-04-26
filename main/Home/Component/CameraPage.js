'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import Camera from 'react-native-camera';
export default class CameraPage extends Component{
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.sretch,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            }
        };
    }

    //扫描二维码
    onBarCodeRead=(e)=>{
        alert(e.data);
    }
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {this.camera = cam;}}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                    onBarCodeRead={this.onBarCodeRead}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});
