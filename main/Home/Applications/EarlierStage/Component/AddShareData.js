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
export default class AddShareData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planType: '请选择计划类型'
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
                            options={['计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4', '计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4']}
                            animated={true}
                            defaultValue={this.state.planType}
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
                            options={['计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4', '计划类型 1', '计划类型 2', '计划类型 3', '计划类型 4']}
                            animated={true}
                            defaultValue={this.state.planType}
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
                    <TouchableOpacity>
                        <Image style={styles.accessory} source={require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    }
});