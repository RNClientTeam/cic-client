/**
 * Created by Nealyang on 2017/5/4.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown';
import RNFS from 'react-native-fs';
export default class AddShareData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareTypeArr:['全员查询', '本人查询', '指定部门', '指定人员'],
            shareType: '请选择共享方式',
            shareRangeArr:['计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4', '计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4'],
            shareRange:'请选择共享范围'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="添加共享资料"/>
                <View style={styles.keyValue}>
                    <Text style={styles.keyStyle}>资料分类</Text>
                    <TextInput style={styles.inputStyle}
                               textAlign="right"
                               placeholder="填写资料分类"
                               underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.keyValue}>
                    <Text style={styles.keyStyle}>共享方式</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.shareTypeArr}
                            animated={true}
                            defaultValue={this.state.shareType}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                console.log(a)
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.keyValue}>
                    <Text style={styles.keyStyle}>共享范围</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.shareRangeArr}
                            animated={true}
                            defaultValue={this.state.shareRange}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                console.log(a)
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.keyValue}>
                    <Text style={styles.keyStyle}>上传附件</Text>
                    <TouchableOpacity onPress={this.choiceFile.bind(this)}>
                        <Image style={styles.accessory} source={require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.keyValue,{borderBottomWidth:0}]}>
                    <Text style={styles.keyStyle}>资料简要描述</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        autoFocus={true}
                        placeholder='请填写备注信息'
                        onChangeText={(remark) => this.setState({remark})}
                        underlineColorAndroid="transparent"
                        textAlignVertical="top"
                    />
                </View>
                <TouchableOpacity style={styles.submitButton}>
                   <Text style={{color:'#fff'}}>确认提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
    choiceFile(){
        RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
                console.log('GOT RESULT', result);

                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log(contents);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    keyValue: {
        backgroundColor: '#fff',
        width: width,
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    keyStyle: {
        marginLeft: width * 0.02,
        fontSize: width * 0.036,
        color: '#5476a1'
    },
    inputStyle: {
        height: width * 0.12,
        width: width * 0.5,
        marginRight: width * 0.02,
        fontSize: width * 0.036,
    },
    modalDropDown: {
        width: width * 0.3
    },

    modalDropDownText: {
        fontSize: width * 0.035,
        textAlign:'right'
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02,
    },
    indicateView:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:width*0.02
    },
    accessory:{
        width:width*0.05,
        height:width*0.05,
        marginRight:width*0.02
    },
    textInput:{
        height:width*0.3,
        backgroundColor:'#f2f2f2',
        width:width*0.84,
        marginLeft:width*0.1,
        borderRadius:10,
        fontSize:15
    },
    inputView:{
        backgroundColor:'#fff',
        paddingBottom:20,
        width:width
    },
    submitButton:{
        alignItems:'center',
        justifyContent:'center',
        width:width*0.9,
        marginLeft:width*0.05,
        height:width*0.12,
        backgroundColor:'#216fd0',
        position:'absolute',
        bottom:width*0.02,
        borderRadius:5
    }
});
