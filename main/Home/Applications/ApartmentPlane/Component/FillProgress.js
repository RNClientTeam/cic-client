"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
    TouchableHighlight
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeyValueRight from "../../../../Component/KeyValueRight";
import ModalDropdown from 'react-native-modal-dropdown';
import KeyPercentage from "../../../../Component/KeyPercentage";
import HistoricalCompletion from "./HistoricalCompletion";
export default class FillProgress extends Component {
    constructor(props){
        super(props);
        this.state={
            uploadSuccess:false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="填报进展情况" navigator={this.props.navigator}/>
                <KeyValueRight propKey="工作计划名称" />
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>工作类别</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={[1,2,3,4]}
                            animated={true}
                            defaultValue={'haha'}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {

                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>关注级别</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={[1,2,3,4]}
                            animated={true}
                            defaultValue={'haha'}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {

                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <KeyValueRight propKey="周期(月)" />
                <View style={{height:10}}></View>
                <KeyPercentage propKey="进度比例"/>
                <View style={styles.keyValue}>
                    <Text style={styles.keyStyle}>上传附件</Text>
                    <TouchableHighlight style={{paddingLeft: 50}} underlayColor='transparent' onPress={this.choiceFile.bind(this)}>
                        <Image style={styles.accessory}
                               source={this.state.uploadSuccess?require('../../../../../resource/imgs/home/earlierStage/pdf.png'):require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                    </TouchableHighlight>
                </View>

                <View style={styles.lastItem}>
                    <Text style={styles.textKeySty}>请输入工作地点*</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder="在此输入"
                        multiline={true}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                </View>
                <View style={{height:10}}></View>
                <TouchableOpacity
                    onPress={this.skipPage.bind(this)}
                    style={{flexDirection:'row', height:50,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:width*0.06,height:width*0.06}} source={require('../../../../../resource/imgs/home/applications/checkHistory.png')}/>
                    <Text style={{color:'#216fd0',marginLeft:width*0.02}}>历史进展</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnView} onPress={this.clickBtn.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>
                        确认提交
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    choiceFile(){

    }
    clickBtn() {
        alert('确认提交');
    }

    skipPage(){
        this.props.navigator.push({
            component:HistoricalCompletion,
            name:'HistoricalCompletion',
            params:{
                id:this.props.id
            }
        })
    }

}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    containerStyle: {
        backgroundColor: '#fff',
        height: width * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    nameStyle: {
        color: '#216fd0',
        fontSize: width * 0.035
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02
    },
    modalDropDownText: {
        fontSize: width * 0.035,
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
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
    accessory: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.02
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
        paddingLeft: width*0.02,
        paddingTop: 16,
        paddingBottom: 28,
        justifyContent: 'space-between'
    },
    textInput: {
        width: width - 40,
        height: 0.15 * height,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: width*0.02,
        fontSize: 15
    }
});
