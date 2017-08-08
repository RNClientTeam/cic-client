/**
 * Created by Nealyang on 2017/5/1.
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
import ModalDropdown from 'react-native-modal-dropdown';
import toast from 'react-native-simple-toast';

const {width, height} = Dimensions.get('window');
const Platform = require('Platform');
export default class ModalView extends Component {
    constructor(props){
        super(props);
        this.jhlxMap = {
            100: '我的待办',
            200: '我参与的',
            300: '全部计划',
        };

        this.state={
            jhlx: this.props.jhlx,
            jhlxmc: this.jhlxMap[this.props.jhlx],
            rwzt: this.props.rwzt,
            rwztCodeList: [],
            rwztmcList: [],
            rwztMap: {},
        }
    }

    componentDidMount() {
        // 获取计划类型
        this.getDict();
        this.getRwzt();
    }

    render() {
        return (
            <View style={[styles.earlierStageListModalView,Platform.OS === 'android' ?{top:44}:{top:64}]}>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>计划类型</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.jhlxmcList}
                            animated={true}
                            defaultValue={this.state.jhlxmc}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={index=>{
                                this.setState({
                                    jhlx: this.state.jhlxList[index]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>任务状态</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.rwztmcList}
                            animated={true}
                            defaultValue={this.state.rwztmc || '请选择'}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={index=>{
                                this.setState({
                                    rwzt: this.state.rwztCodeList[index]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={[styles.clickButton,{backgroundColor:'#dbdada'}]}
                        onPress={
                            () => this.props.closeModal(2, this.state.jhlx, this.state.rwzt)
                        }>
                        <Text style={{color:'#3d3d3d',fontWeight:'200'}}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.clickButton,{backgroundColor:'#216fd0'}]}
                        onPress={
                            () => this.props.closeModal(1, this.state.jhlx, this.state.rwzt)
                        }>
                        <Text style={{color:'#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getDict() {
        let jhlxList = [100, 200, 300];
        let jhlxmcList = ['我的待办', '我参与的', '全部计划'];
        this.setState({
            jhlxList,
            jhlxmcList,
        });
    }

    getRwzt() {
        axios.get('/dictionary/list',{
            params:{
                userID: GLOBAL_USERID,
                root:'JDJH_RWZT',
                callID:true
            }
        }).then(responseData =>{
            console.log('------rwzt', responseData);
            if (responseData.data && responseData.data.length) {
                let list = responseData.data;
                let rwztCodeList = [], rwztmcList = [], rwztMap = {};
                for (let i = 0, l = list.length; i < l; i++) {
                    rwztCodeList.push(list[i].code);
                    rwztmcList.push(list[i].name);
                    rwztMap[list[i].code] = list[i].name;
                }
                this.setState({
                    rwztCodeList,
                    rwztmcList,
                    rwztMap,
                });
                if (this.state.rwzt !== '请选择') {
                   this.setState({
                       rwztmc: rwztMap[this.state.rwzt]
                   });
                }
            } else {
                toast.show(responseData.message);
            }
        }).catch(() => {
            toast.show('服务端异常!');
        })
    }
}

const styles = StyleSheet.create({
    earlierStageListModalView: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position:'absolute',
        width:width,
        zIndex:3,
    },
    containerStyle:{
        backgroundColor:'#fff',
        height:width*0.12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    nameStyle:{
        color:'#216fd0',
        fontSize:width*0.035
    },
    indicateView:{
      flexDirection:'row',
        alignItems:'center'
    },
    indicateImage:{
        width:width*0.02,
        height:width*0.02,
        marginLeft:width*0.02
    },
    modalDropDownText:{
        fontSize:width*0.035,
    },
    dropdownStyle:{
        width:width*0.55,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonView:{
        height:width*0.3,
        width:width,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    clickButton:{
        width:width*0.3,
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    }
});
