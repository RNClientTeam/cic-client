"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class CompletionForm extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="完成情况表单" navigator={this.props.navigator}/>
                <View style={styles.itemView}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>部门工作计划1</Text>
                </View>

                <View style={styles.itemView}>
                    <Text>当前进度比例*</Text>
                </View>

                <View style={styles.itemView}>
                    <Text>实际开始时间</Text>
                </View>

                <View style={styles.itemView}>
                    <Text>实际完成时间</Text>
                </View>

                <View style={styles.itemView}>
                    <Text>当前完成情况</Text>
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
        paddingHorizontal: 20,
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
    }
});
