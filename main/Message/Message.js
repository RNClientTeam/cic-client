"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {width} = Dimensions.get('window');
/**
 *测试日历
 */
import Calendar from './Component/Calendar'
import StatusBar from '../Component/StatusBar'
import Spinner from 'react-native-spinkit';
export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: 100,
            color: "#FFFFFF",
            isVisible: true
        }
    }
    next() {
        if (this.state.index++ >= this.state.types.length)
            this.setState({index: 0});
        else
            this.setState({index: this.state.index++})
    }

    increaseSize() {
        this.setState({size: this.state.size - 10});
    }

    changeColor() {
        this.setState({color: '#'+Math.floor(Math.random()*16777215).toString(16)});
    }

    changeVisibility() {
        this.setState({isVisible: !this.state.isVisible});
    }
    render() {
        let type = this.state.types[this.state.index];
        return (
            <View style={styles.viewSty}>
                {/*<StatusBar/>*/}
                {/*<Calendar/>*/}

                {/*测试加载图标*/}
                <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>

                <Text style={styles.text}>Type: {type}</Text>

                <TouchableOpacity style={styles.btn} onPress={this.next.bind(this)}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={this.increaseSize.bind(this)}>
                    <Text style={styles.text}>Increase size</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={this.changeColor.bind(this)}>
                    <Text style={styles.text}>Change color</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={this.changeVisibility.bind(this)}>
                    <Text style={styles.text}>Change visibility</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
    },
    spinner: {
        marginBottom: 50
    },

    btn: {
        marginTop: 20
    },

    text: {
        color: "white"
    }
});
