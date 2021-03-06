"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    TouchableHighlight,
    Image,
    NativeModules,
    ScrollView
} from 'react-native';
const Platform = require('Platform');
const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeyTime from "../../../../Component/KeyTime";
import KeyPercentage from "../../../../Component/KeyPercentage";
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'
import {getTimestamp,uploadFile} from '../../../../Util/Util'
import baseUrl from '../../../../Util/service.json'
import RNFetchBlob from 'react-native-fetch-blob'
import KeyValueRight from "../../../../Component/KeyValueRight";
export default class FillProgress extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            jhmc:'',
            wcbl:'',
            sjqdsj:'',
            sjwcsj:'',
            wcbz:'',
            jzqkID:''
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="填报进展" navigator={this.props.navigator}/>
                <ScrollView>
                    <KeyValueRight propKey="工作计划名称" readOnly={true} defaultValue={this.props.jhmc}/>
                    <KeyPercentage propKey="当前进度比例*" value={this.state.wcbl} textChange={(value)=>this.setState({wcbl:value})}/>
                    <KeyTime propKey="实际开始时间" onlyDate={true} showDate={this.state.sjqdsj} changeDate={(date)=>this.setState({sjqdsj:date})}/>
                    {parseInt(this.state.wcbl)==100?
                        <KeyTime propKey="实际完成时间" onlyDate={true} showDate={this.state.sjwcsj} changeDate={(date)=>this.setState({sjwcsj:date})}/>
                        :null}
                    <View style={styles.keyValue}>
                        <Text style={styles.keyStyle}>上传附件</Text>
                        <TouchableHighlight style={{paddingLeft: 50}} underlayColor='transparent' onPress={this.choiceFile.bind(this)}>
                            <Image style={styles.accessory}
                                   source={this.state.uploadSuccess?require('../../../../../resource/imgs/home/earlierStage/fj.png'):require('../../../../../resource/imgs/home/earlierStage/accessory.png')}/>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.lastItem}>
                        <Text style={styles.textKeySty}>当前完成情况*</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.textInput}
                            placeholder="在此输入"
                            multiline={true}
                            onChangeText={(value)=>{
                                this.setState({
                                    wcbz:value
                                })
                            }}
                            value={this.state.wcbz}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.btnView} onPress={this.clickBtn.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>
                        确认提交
                    </Text>
                </TouchableOpacity>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }

    showLoading(){
        this.setState({isLoading:true})
    }

    hideLoading(){
        this.setState({isLoading:false})
    }

    choiceFile() {
        if (Platform.OS === 'android') {
            NativeModules.MyRN.scan((msg) => {
                    if (msg.didCancel) {
                        toast.show('取消选择');
                    } else {
                        this.showLoading();
                        let reqData = [
                            {name: 'userID', data: GLOBAL_USERID},
                            {name: 'files', data: RNFetchBlob.wrap(msg.path), filename: msg.fileName},
                            {name: 'businessModule', data: 'bmjhJzqk'},
                            {name: 'isAttach', data: JSON.stringify(1)},
                            {name: 'resourceId', data: this.state.jzqkID},
                            {name: 'callID', data: JSON.stringify(getTimestamp())}
                        ];
                        uploadFile(baseUrl.baseUrl + '/sysfile/UploadHandler', reqData, (response) => {
                            this.hideLoading();
                            if (response.code === 1) {
                                toast.show('文件上传成功');
                                this.setState({
                                    uploadSuccess:true
                                });
                            } else {
                                this.setState({
                                    uploadSuccess:false
                                });
                                toast.show('文件上传失败，请重试');
                            }
                        }, (response) => {
                            this.hideLoading();
                        });
                    }
                });
        } else {
            toast.show('iOS系统不支持文件上传操作');
        }
    }

    clickBtn() {
        if(this.state.wcbl===''){
            toast.show('请填写完成比例');
        }else if(this.state.sjqdsj===''){
            toast.show('请填写开始时间')
        }else if(parseInt(this.state.wcbl)===100&&this.state.sjwcsj===''){
            toast.show('请填写完成时间')
        }else{
            this.showLoading();
            axios.post('/psmBmjh/updateJzqk',{
                userID:GLOBAL_USERID,
                jhid:this.props.id,
                wcqk:this.state.wcbz,
                wcbl:this.state.wcbl,
                sjqdsj:this.state.sjqdsj,
                sjwcsj:this.state.sjwcsj,
                jzqkID:this.state.jzqkID,
                callID:true
            }).then(data=>{
                this.hideLoading();
                if(data.code === 1){
                   toast.show('提交成功');
                   let that = this;
                   setTimeout(function () {
                       that.props.navigator.pop();
                       that.props.reload();
                   })
                }else{
                    toast.show(data.message);
                }
            }).catch(err=>{
                toast.show('服务端异常');
            })
        }
    }

    componentDidMount() {
        this.setState({
            isLoading:true
        });
        axios.get('/psmBmjh/initJzqk',{
            params:{
                jhId:this.props.id,
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                data = data.data;
                console.log(data);
                this.setState({
                    jhmc:data.jhmc,
                    sjqdsj:data.sjqdsj||data.qdsj,
                    sjwcsj:data.sjwcsj||data.wcsj,
                    wcbl:data.wcbl+'',
                    wcbz:data.wcbz,
                    jzqkID:data.jzqkID
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    accessory: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.02
    },
    keyStyle: {
        marginLeft: width * 0.02,
        fontSize: width * 0.036,
        color: '#5476a1'
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
