"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeyTime from "../../../../Component/KeyTime";
import KeyPercentage from "../../../../Component/KeyPercentage";

export default class CompletionForm extends Component {

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="确认完成" navigator={this.props.navigator}/>
                <View style={styles.itemView}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>部门工作计划1</Text>
                </View>
                <KeyPercentage propKey="当前进度" textChange={(value)=>console.log(value)}/>
                <KeyTime propKey="实际开始时间" showDate="2017-09-11" changeDate={(date)=>console.log(date)}/>
                <KeyTime propKey="实际完成时间" showDate="2017-09-11" changeDate={(date)=>console.log(date)}/>

                <View style={styles.lastItem}>
                    <Text style={styles.textKeySty}>当前完成情况*</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder="在此输入"
                        multiline={true}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                </View>

                <TouchableOpacity style={styles.btnView} onPress={this.clickBtn.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>
                        确认提交
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    clickBtn() {
        alert('确认提交');
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        flexDirection: 'row',
        width: width,
        height: 0.0735 * height,
        alignItems: 'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent: 'space-between',
        marginBottom: 1
    },
    btnView: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#216fd0'
    },
    textKeySty: {
        color: '#5476a1',
        fontSize: 15
    },
    textValueSty: {
        fontSize: 15,
        color: '#999'
    },
    lastItem: {
        width: width,
        height: 0.27 * height,
        backgroundColor: '#fff',
        paddingLeft:width*0.02,
        paddingTop: 16,
        paddingBottom: 28,
        justifyContent: 'space-between'
    },
    textInput: {
        width: width - 40,
        height: 0.15 * height,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15
    }
});
