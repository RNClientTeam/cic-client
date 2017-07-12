/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
const {width, height} = Dimensions.get('window');
const Platform = require('Platform');
import ModalDropdown from 'react-native-modal-dropdown';
import toast from 'react-native-simple-toast'
export default class QualityCheckRecordFiltrate extends Component {
    constructor(props){
        super(props);
        this.state={
            rwxzCn:this.props.rwxzCn,
            rwztCn:this.props.rwztCn,
            rwxzCodes:[],
            rwztCodes:[],
            rwxzCns:[],
            rwztCns:[],
            rwxzCode:this.props.rwxz,
            rwztCode:this.props.rwzt,
            type:this.props.type
        }
    }

    render() {
        return (
            <View style={[styles.containerStyle, Platform.OS === 'android' ? {top: 44} : {top: 64}]}>
                <View style={styles.cellStyle}>
                    <Text style={{color:'#216fd0'}}>任务状态</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.rwztCns}
                            animated={true}
                            defaultValue={this.state.rwztCn||'请选择任务状态'}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    rwztCode:this.state.rwztCodes[a],
                                    rwztCn:this.state.rwztCns[a]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.cellStyle}>
                    <Text style={{color:'#216fd0'}}>记录范围</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={['全部', '我代办', '我参与']}
                            animated={true}
                            defaultValue={this.state.type}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    type:['全部', '我代办', '我参与'][a]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.cellStyle}>
                    <Text style={{color:'#216fd0'}}>任务性质</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.rwxzCns}
                            animated={true}
                            defaultValue={this.state.rwxzCn||'请选择任务性质'}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    rwxzCode:this.state.rwxzCodes[a],
                                    rwxzCn:this.state.rwxzCns[a]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#dbdada'}]}
                                      onPress={() => this.props.closeFiltrate(0,'全部','','','all','all')}>
                        <Text>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#216fd0'}]}
                                      onPress={() => {this.props.closeFiltrate(1,this.state.type,this.state.rwztCn,this.state.rwxzCn,this.state.rwztCode,this.state.rwxzCode)}}>
                        <Text style={{color: '#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/dictionary/list',{
            params:{
                userID:GLOBAL_USERID,
                root:'JDJH_SGRWXZ',
                callID:true
            }
        }).then(rwxzData=>{
            if(rwxzData.code===1){
                let cn = [],code = [];
                for(let i = 0;i<rwxzData.data.length;i++){
                    cn.push(rwxzData.data[i].name);
                    code.push(rwxzData.data[i].code)
                }
                this.setState({
                    rwxzCns:cn,
                    rwxzCodes:code
                });
                axios.get('/dictionary/list',{
                    params:{
                        userID:GLOBAL_USERID,
                        root:"JDJH_RWZT",
                        callID:true
                    }
                }).then(ztData=>{
                    if(ztData.code === 1){
                        let cns=[],codes=[];
                        for(let j = 0;j<ztData.data.length;j++){
                            cns.push(ztData.data[j].name);
                            codes.push(ztData.data[j].code);
                        }
                        this.setState({
                            rwztCns:cns,
                            rwztCodes:codes
                        })
                    }else{
                        toast.show(ztData.message)
                    }
                }).catch(err=>{
                    toast.show('服务端异常');
                })
            }else{
                toast.show(rwxzData.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'absolute',
        width: width,
        zIndex: 3,
    },
    cellStyle: {
        height: width * 0.12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row'
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalDropDownText: {
        fontSize: width * 0.035,
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02
    },
    buttonView: {
        height: width * 0.3,
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    clickButton: {
        width: width * 0.3,
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
});