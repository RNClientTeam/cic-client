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

export default class CompletionForm extends Component {
    _onChangeText(text) {

    }
    startTime() {
        alert('开始时间');
    }
    endTime() {
        alert('完成时间');
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="完成情况表单" navigator={this.props.navigator}/>
                <View style={styles.itemView}>
                    <Text style={{fontSize:17,fontWeight:'500'}}>部门工作计划1</Text>
                </View>

                <View style={styles.itemView}>
                    <Text style={styles.textKeySty}>当前进度比例*</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:90, height:height*0.045,borderWidth:1,borderColor:'#5476a1',borderRadius:5,marginRight:10}}>
                            <TextInput
                                textAlign="center"
                                style={{flex:1,color:'#216fd0'}}
                                underlineColorAndroid="transparent"
                                onChangeText={this._onChangeText.bind(this)}/>
                        </View>
                        <Text style={{fontSize:15,color:'#216fd0'}}>%</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.itemView} onPress={this.startTime.bind(this)}>
                    <Text style={styles.textKeySty}>实际开始时间</Text>
                    <Text style={styles.textValueSty}>请选择></Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemView} onPress={this.endTime.bind(this)}>
                    <Text style={styles.textKeySty}>实际完成时间</Text>
                    <Text style={styles.textValueSty}>请选择></Text>
                </TouchableOpacity>

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
        paddingHorizontal: 20,
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
