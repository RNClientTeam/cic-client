/**
 * Created by fan on 2017/05/06.
 * 扫描二维码
 */
"use strict";
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    Animated,
    Easing
} from 'react-native'
const {width} = Dimensions.get('window');
export default class CameraPageCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line_position: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.lineAnimated();
            this.timer && clearTimeout(this.timer);
        }, 1000);
    }

    lineAnimated() {
        this.state.line_position.setValue(0);
        Animated.timing(this.state.line_position, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
        }).start(() => {
            this.lineAnimated();
        });
    }

    render() {
        return (
            <View style={styles.cameraView}>
                {/**顶部**/}
                <View style={styles.shadeView}></View>
                <View style={styles.middleView}>
                    <View style={styles.shadeView}></View>
                    <View style={styles.qrcodeView}>
                        <Animated.View style={[styles.line, {
                            transform: [{translateY: this.state.line_position.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, width*0.65]
                            })}]
                        }]}/>
                    </View>
                    <View style={styles.shadeView}></View>
                </View>
                {/**底部**/}
                <View style={[styles.shadeView, styles.content]}>
                    <Text style={styles.textSty}>将二维码放入框内，即可自动扫描</Text>
                </View>
            </View>
        )
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    cameraView: {
        flexGrow: 1,
        width: width
    },
    shadeView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    middleView: {
        flexDirection: 'row'
    },
    qrcodeView: {
        width: width * 0.65,
        height: width * 0.65,
        alignItems: 'center',
        backgroundColor: 'rgba(50,50,50,0.1)'
    },
    line: {
        width: width * 0.65,
        height: 1,
        backgroundColor: 'white',
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    textSty: {
        color: 'white',
        fontSize: 14
    }
});
