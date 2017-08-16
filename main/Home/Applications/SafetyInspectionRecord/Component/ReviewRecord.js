"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TextInput,
    Image,
    NativeModules,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import Loading from "../../../../Component/Loading.js";
import CheckFlowInfo from './CheckFlowInfo.js';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Organization from '../../../../Organization/Organization.js';
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
export default class ReviewRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fcrmc: '',
            fcr: '',
            fcsj: '',
            fcjg: '',
            fcfj: '',
            aqjcjhId: '',
            isAttach:'',
            businessModule:""
        }
    }

    componentDidMount() {
        axios.get('/psmAqjcjh/init4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.fromList?this.props.data.id:'',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    fcrmc: res.data.fcrmc,
                    fcr: res.data.fcr,
                    fcsj: res.data.fcsj,
                    fcjg: res.data.fcjg,
                    fcfj: res.data.fcfj,
                    aqjcjhId: res.data.aqjcjhId,
                    isAttach:this.props.fromList?res.data.fcfjisAttach:res.data.fcjlisAttach,
                    businessModule:res.data.businessModule
                });
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    selPerson() {
        if(this.props.fcjl) {
            this.props.navigator.push({
                name: 'Organization',
                component: Organization,
                params: {
                    getInfo: this.getInfo.bind(this)
                }
            });
        }
    }

    getInfo(bmid, name, id) {
        this.setState({
            fcrmc: name,
            fcr: id
        });
    }

    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>复查时间</Text>
                    {
                        this.props.fcjl ?
                        <ChoiceDate showDate={this.state.fcsj}
                            changeDate={(date)=>{this.setState({fcsj:date});}}/> :
                        <Text style={styles.valueText}>{this.state.fcsj}</Text>
                    }
                </View>

                <TouchableOpacity onPress={this.selPerson.bind(this)}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>复查人</Text>
                        <Text style={styles.valueText}>{this.state.fcrmc}</Text>
                    </View>
                </TouchableOpacity>

                <ChoiceFileComponent
                    readOnly={this.props.fcjl?false:true}
                    resourceId={this.state.fcfj}
                    isAttach={this.state.isAttach}
                    businessModule='aqjcjl'/>

                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>整改复查结果</Text>
                </View>
                <TextInput style={styles.inpurResult}
                    placeholder="请填写"
                    numberOfLines={2}
                    editable={this.props.fcjl?true:false}
                    underlineColorAndroid="transparent"
                    defaultValue={this.state.fcjg}
                    multiline={true}
                    onChangeText={(text) => {
                        if (this.props.fcjl) {
                            this.setState({fcjg: text});
                        }
                    }}
                />
                {
                    this.props.fcjl &&
                    <View style={styles.bottomView}>
                        <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this,true)}>
                            <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                                <Text style={styles.btnText}>保存并提交</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this,false)}>
                            <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                                <Text style={styles.btnText}>保存</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
            </View>

        );
    }

    save(param) {
        if (this.state.fcsj.length === 0) {
            Toast.show('请选择复查时间');
        } else if (this.state.fcr.length === 0) {
            Toast.show('请选择复查人');
        } else if (this.state.fcjg === 0) {
            Toast.show('请填写复查结果');
        } else {
            axios.post('/psmAqjcjh/saveAqjcjl4fc', {
                userID: GLOBAL_USERID,
                id: this.props.data.aqjcjhId,
                fcr: this.state.fcr,
                fcsj: this.state.fcsj,
                fcjg: this.state.fcjg,
                callID: true
            }).then((res) => {
                if (res.code === 1) {
                    Toast.show('保存成功');
                    if (param) {
                        //保存并提交
                        this.props.navigator.push({
                            name: 'CheckFlowInfo',
                            component: CheckFlowInfo,
                            params: {
                                resID: res.data,
                                wfName: 'jdjhanjcjl',
                                reloadInfo: this.props.reloadInfo,
                                name: 'SafetyInspectionRecord'
                            }
                        });
                    } else {
                        //保存
                        this.props.navigator.pop();
                        this.props.reloadInfo();
                    }
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {
                Toast.show('服务端异常');
            });
        }
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 9
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1',
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        marginTop:1,
        justifyContent: 'space-between'
    },
    bottomView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal:10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnView: {
        height: 0.06 * height,
        width: 0.42 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    },
    inpurResult: {
        textAlign: 'left',
        width: width,
        height: 0.1 * height,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 14,
        marginTop: 1,
        marginBottom: 10
    },
    cell: {
        height:width*0.12,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        paddingRight:width*0.02,
        marginTop: 10
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 10
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    attachmentContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0.03 * width,
        marginTop: 0.04*width
    },
    choicImgSty: {
        height: 0.2 * width,
        width: 0.2 * width,
        marginRight: 0.03 * width,
        marginTop: 0.04*width
    }
});
