'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import QRCodeView from './QRCodeView.js';
import CameraPageHeader from './CameraPageHeader.js';
import CameraPageCode from './CameraPageCode.js';
var {width, height} = Dimensions.get('window');
export default class CameraPage extends Component{
    constructor(props) {
        super(props);
        this.camera = null;
        this.showCamera = true;
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto
            }
        };
    }

    //扫描二维码
    onBarCodeRead(objData) {
        if (this.showCamera) {
            this.showCamera = false;
            this.props.navigator.replace({
                name: 'QRCodeView',
                component: QRCodeView,
                params: {
                    downloadURL: objData.data
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <CameraPageHeader title={this.props.title} navigator={this.props.navigator}/>
                <Camera
                    ref={(cam) => {this.camera = cam;}}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureQuality={'medium'}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}>
                    <CameraPageCode />
                </Camera>
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});
