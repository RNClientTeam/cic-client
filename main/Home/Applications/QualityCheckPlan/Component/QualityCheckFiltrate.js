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

export default class QualityCheckFiltrate extends Component {

    constructor(props){
        super(props);
        this.state={
            xzCn:[],
            xzCode:[],
            ztCn:[],
            ztCode:[],
            rwzt:this.props.rwzt,
            rwxz:this.props.rwxz,
            rwztCode:this.props.rwztId,
            rwxzCode:this.props.rwxzId
        }
    }

    render() {
        return (
            <View style={[styles.containerStyle, Platform.OS === 'android' ? {top: 44} : {top: 64}]}>
                <View style={styles.cellStyle}>
                    <Text style={{color:'#216fd0'}}>当前状态</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.ztCn}
                            animated={true}
                            defaultValue={this.state.rwzt}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    rwztCode:this.state.ztCode[a],
                                    rwzt:this.state.ztCn[a]
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
                            options={this.state.xzCn}
                            animated={true}
                            defaultValue={this.state.rwxz}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    rwxzCode:this.state.xzCode[a],
                                    rwxz:this.state.xzCn[a]
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
                                      onPress={() => this.props.closeFiltrate('请选择任务状态','请选择任务性质','all', 'all')}>
                        <Text>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#216fd0'}]}
                                      onPress={() => this.props.closeFiltrate(this.state.rwzt,this.state.rwxz,this.state.rwztCode,this.state.rwxzCode)}>
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
        }).then(xzData=>{
            axios.get('/dictionary/list',{
                params:{
                    userID:GLOBAL_USERID,
                    root:'JDJH_RWZT',
                    callID:true
                }
            }).then(ztData=>{
                let xzCode = [],xzCn=[],ztCode=[],ztCn=[];
                for(let i = 0;i<xzData.data.length;i++){
                    xzCode.push(xzData.data[i].code);
                    xzCn.push(xzData.data[i].name);
                }
                for(let i = 0;i<ztData.data.length;i++){
                    ztCode.push(ztData.data[i].code);
                    ztCn.push(ztData.data[i].name);
                }
                this.setState({
                    xzCode:xzCode,
                    xzCn:xzCn,
                    ztCode:ztCode,
                    ztCn:ztCn
                });
            })
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
