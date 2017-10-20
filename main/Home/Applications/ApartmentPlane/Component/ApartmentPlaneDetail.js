"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableHighlight,
    ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import toast from 'react-native-simple-toast'
import KeyValueRight from "../../../../Component/KeyValueRight";
import Loading from "../../../../Component/Loading";

export default class ApartmentPlaneDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jhmc:'',
            jhrw:'',
            xmmc:'',
            lymc:'',
            qdsj:'',
            wcsj:'',
            zrbmmc:'',
            zrrmc:'',
            wcbz:'',
            isLoading:false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="部门计划任务详情" navigator={this.props.navigator}/>
                <ScrollView>
                    <KeyValueRight propKey="工作计划名称" defaultValue={this.state.jhmc||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="所属计划任务" defaultValue={this.state.jhrw||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="所属项目" defaultValue={this.state.xmmc||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="工作计划来源" defaultValue={this.state.lymc||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="计划开始时间" defaultValue={this.state.qdsj||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="计划结束时间" defaultValue={this.state.wcsj||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="责任部门" defaultValue={this.state.zrbmmc||'未填写'} readOnly={true}/>
                    <KeyValueRight propKey="责任人" defaultValue={this.state.zrrmc||'未填写'} readOnly={true}/>
                    <View>
                        <View style={styles.footSeparator}></View>
                        <View style={styles.footIntor}>
                            <Text style={styles.keyText}>工作成果／完成标准</Text>
                        </View>
                        <View style={styles.footInfo}>
                            <TextInput style={styles.textinputStyle}
                                       multiline={true}
                                       value={this.state.wcbz}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       editable={false}
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({wcbz:text})}
                                       placeholder="请填写"/>
                        </View>
                    </View>
                </ScrollView>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }
    componentDidMount() {
        this.setState({
            isLoading:true
        });
        axios.get('/psmBmjh/detail',{
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
                this.setState({
                    jhmc:data.data.jhmc,
                    jhrw:data.data.jhrw,
                    xmmc:data.data.xmmc,
                    lymc:data.data.lymc,
                    qdsj:data.data.qdsj,
                    wcsj:data.data.wcsj,
                    zrbmmc:data.data.zrbmmc,
                    zrrmc:data.data.zrrmc,
                    wcbz:data.data.wcbz
                })
            }
        }).catch(err=>{
            toast.show('服务端异常')
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        paddingLeft: width*0.02,
        paddingRight: 21,
        justifyContent: 'space-between',
        backgroundColor:'#fff'
    },
    footSeparator: {
        width: width,
        height: 0.0165*height,
        backgroundColor: '#f1f1f1'
    },
    footIntor: {
        width: width,
        height: 0.07 * height,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    footInfo: {
        width: width,
        height: 0.12 * height,
        paddingVertical: 0.019*height,
        paddingHorizontal: 17,
        backgroundColor: '#fff'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#999'
    },
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5
    },
    btnView: {
        marginTop: 5,
        marginHorizontal: 12,
        height: 0.067 * height,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#216fd0'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    }
})
