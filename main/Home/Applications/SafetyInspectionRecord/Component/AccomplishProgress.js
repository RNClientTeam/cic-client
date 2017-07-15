"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Image,
    ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeySelect from "../../../../Component/KeySelect";
import ModalDropdown from 'react-native-modal-dropdown';
import KeyTime from "../../../../Component/KeyTime";
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'
import Organization from "../../../../Organization/Organization";
import {getCurrentDate} from '../../../../Util/Util'
import KeyValueN from "../../../../Component/KeyValueN";
import KeyValueLeft from "../../../../Component/KeyValueLeft";
export default class ReformTaskCell extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: false,
            wtlb: '',
            wtlbCodes: [],
            wtlbCns: [],
            wtlbmc: '请选择问题类别',
            zgzrr:'',
            zgzrrmc:'',
            zgzrbm:'',
            zgwcsj:getCurrentDate(),
            sjwcsj:getCurrentDate(),
            zgyq:'',
            zcjg:'',
            aqjcjlId:'',
            id:''
        };
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="整改任务完成情况" navigator={this.props.navigator}/>
                <ScrollView>
                    {
                        this.props.readOnly?
                            <KeyValueLeft propsKey="问题类别" propsValue={this.state.wtlbmc}/>:
                            <View style={styles.cellStyle}>
                                <Text style={{color: '#216fd0'}}>问题类别</Text>
                                <View style={styles.indicateView}>
                                    <ModalDropdown
                                        options={this.state.wtlbCns}
                                        animated={true}
                                        defaultValue={this.state.wtlbmc}
                                        style={styles.modalDropDown}
                                        textStyle={styles.modalDropDownText}
                                        dropdownStyle={styles.dropdownStyle}
                                        onSelect={(a) => {
                                            this.setState({
                                                wtlb: this.state.wtlbCodes[a],
                                                wtlbmc:this.state.wtlbCns[a]
                                            })
                                        }}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    <Image style={styles.indicateImage}
                                           source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                                </View>
                            </View>

                    }

                    {
                        this.props.readOnly?
                            <KeyValueLeft propsKey="整改责任人" propsValue={this.state.zgzrrmc}/>:
                            <KeySelect propKey="整改责任人" value={this.state.zgzrrmc} choiceInfo={this.choicePeople.bind(this)}/>
                    }
                    {
                        this.props.readOnly?
                            <KeyValueLeft propsKey="要求完成时间" propsValue={this.state.zgwcsj}/>:
                            <KeyTime propKey="要求完成时间"
                                     onlyDate={true}
                                     changeDate={(date)=>this.setState({zgwcsj:date})}
                                     showDate={this.state.zgwcsj}/>
                    }

                    {
                        this.props.readOnly?
                            <KeyValueLeft propsKey="实际完成时间" propsValue={this.state.sjwcsj}/>:
                            <KeyTime propKey="实际完成时间"
                                     onlyDate={true}
                                     changeDate={(date)=>this.setState({sjwcsj:date})}
                                     showDate={this.state.sjwcsj}/>
                    }

                    <View style={{height:10}}/>

                    <KeyValueN propKey="整改要求"
                               readOnly={this.props.readOnly}
                               value={this.state.zgyq}
                               textChange={(text)=>this.setState({zgyq:text})}
                    />
                    <View style={{height:10}}/>
                    <KeyValueN propKey="整改情况"
                               readOnly={this.props.readOnly}
                               value={this.state.zcjg}
                               textChange={(text)=>this.setState({zcjg:text})}
                    />
                    <View style={{height:10}}/>
                    <TouchableOpacity style={styles.viewStyle}>
                        <Text style={styles.keyText}>附件</Text>
                        <Image source={require('../../../../../resource/imgs/home/attachment.png')}
                               style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                </ScrollView>
                {
                    this.props.readOnly?
                        null:
                        <TouchableOpacity style={styles.bottomBtn} onPress={this.saveAndCommit.bind(this)}>
                            <Text style={{fontSize: 15, color: '#fff'}}>保存</Text>
                        </TouchableOpacity>
                }
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    choicePeople() {
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                getInfo: (bmid, name, id, bmmc) => {
                    this.setState({
                        zgzrr: id,
                        zgzrrmc: name,
                        zgzrbm: bmid
                    })
                }
            }
        })
    }

    saveAndCommit() {

    }

    componentDidMount() {
        this._getWtlb();
        if(this.props.readOnly){
            this._initPage();
        }
    }

    showLoading(){
        this.setState({
            isLoading:true
        })
    }

    hideLoading(){
        this.setState({
            isLoading:false
        })
    }

    _initPage(){
        this.showLoading();
        axios.get('/psmAqjcjh/init4Zgrw',{
            params:{
                userID:GLOBAL_USERID,
                id:this.props.id,
                callID:true
            }
        }).then(data=>{
            this.hideLoading();
            console.log(1111)
            if(data.code ===1){
                this.setState({
                    aqjcjlId:data.data.aqjcjlId,
                    id:data.data.id,
                    zgwcsj:data.data.zgwcsj,
                    sjwcsj:data.data.sjwcsj,
                    wtlbmc:data.data.wtlbmc,
                    zgzrr:data.data.zgzrr,
                    zgyq:data.data.zgyq,
                    zcjg:data.data.zcjg,
                    dqzt:data.data.dqzt,
                    zgzrbm:data.data.zgzrbm,
                    zgzrrmc:data.data.zgzrrmc,
                    wtlb:data.data.wtlb
                })
            }else{
                toast.show(data.message)
            }
            console.log(data);
        }).catch(err=>{
            this.hideLoading();
            toast.show('服务端异常');
        })
    }

    _getWtlb() {
        this.showLoading();
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_WTLB_AQ',
                callID: true
            }
        }).then(data => {
            this.hideLoading();
            if (data.code === 1) {
                if (data.data) {
                    let cn = [], code = [];
                    for (let i = 0; i < data.data.length; i++) {
                        cn.push(data.data[i].name);
                        code.push(data.data[i].code);
                    }
                    this.setState({
                        wtlbCodes: code,
                        wtlbCns: cn
                    })
                }
            } else {
                toast.show(data.message)
            }
        }).catch(err=>{
            this.hideLoading();
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    bottomBtn: {
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#216fd0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.0675 * height,
        width: width - 30
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1',
        width: width * 0.4
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 0.0779 * height,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    inputView: {
        width: width,
        height: height * 0.22,
        paddingTop: 10
    },
    textInputSty: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 15,
        paddingTop: 5,
        backgroundColor: '#fff',
        marginTop: 1
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
    cellStyle: {
        height: width * 0.12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
});
