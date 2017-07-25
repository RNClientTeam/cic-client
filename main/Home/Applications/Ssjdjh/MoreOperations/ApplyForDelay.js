/**
 * Created by Nealyang on 2017/5/3.
 * 延期变更申请
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width, height}  = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import ModalDropdown from 'react-native-modal-dropdown';
import CheckFlowInfo from './CheckFlowInfo.js';

export default class ApplyForDelay extends Component{
    constructor(props) {
        super(props);
        this.changeIntroduction = '';
        this.state = {
            proName: '',
            startTime: '',
            endTime: '',
            planName: '',
            changeStartTime: '',
            changeEndTime: '',
            yqbgId:'',
            reasonList: [],
            allReason: [],
            bgyyDefault: '请选择>',
            bgsm: '',
            bgyy: ''
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get('/psmSsjdjh/yqbg', {
            params: {
                userID: GLOBAL_USERID,
                rwid: this.props.rwid,
                rwlx: this.props.tag && this.props.tag === '配合任务' ? 2 : 1,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                //获取变更原因列表
                this.exchangeReason(responseData.data);
            }
        }).catch((error) => {

        });
    }

    //修改变更原因
    exchangeReason(res) {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_BGYY',
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.state.reasonList = [];
                responseData.data.forEach((elem, index) => {
                    this.state.reasonList.push(elem.name);
                });
                this.setState({
                    proName: res.xmmc,
                    startTime: res.yjhkssj,
                    endTime: res.yjhjssj,
                    planName: res.rwmc,
                    yqbgId: res.yqbgId,
                    bgyyDefault: res.bgyy?this.state.reasonList[parseInt(res.bgyy)-1]:'请选择>',
                    reasonList: this.state.reasonList,
                    allReason: responseData.data,
                    bgsm: res.bgsm||'',
                    bgyy: res.bgyy||''
                });
            }
        }).catch((error) => {

        });
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="延期变更申请"/>
                <ScrollView>
                    <View style={styles.viewSty}>
                        <View style={styles.cell}>
                            <Text style={styles.label}>项目名称</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.proName}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>需变更任务</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.planName}</Text>
                        </View>
                        {
                            this.props.tag !== '配合任务' &&
                            <View style={styles.cell}>
                                <Text style={styles.label}>计划开始时间</Text>
                                <View style={styles.blank}/>
                                <Text>{this.state.startTime}</Text>
                            </View>
                        }
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.endTime}</Text>
                        </View>
                    </View>
                    <View style={styles.editPanel}>
                        <View style={styles.editTitle}>
                            <Image style={styles.icon}
                                   source={require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png')}/>
                            <Text style={styles.editText}>延期变更</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>变更原因</Text>
                            <View style={styles.blank}/>
                            <ModalDropdown
                                options={this.state.reasonList}
                                animated={true}
                                defaultValue={this.state.bgyyDefault}
                                textStyle={{fontSize:14}}
                                style={{flex:1, alignItems:'flex-end'}}
                                onSelect={(a) => {
                                    this.setState({bgyy: this.state.allReason[a].code});
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                        {
                            this.props.tag !== "配合任务" &&
                            <View style={styles.cell}>
                                <Text style={styles.label}>变更开始时间</Text>
                                <View style={styles.blank}/>
                                <ChoiceDate showDate={this.state.changeStartTime} changeDate={(date)=>{this.setState({changeStartTime:date});}}/>
                            </View>
                        }

                        <View style={styles.cell}>
                            <Text style={styles.label}>变更结束时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate showDate={this.state.changeEndTime} changeDate={(date)=>{this.setState({changeEndTime:date})}}/>
                        </View>

                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>变更情况说明</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    placeholder={this.state.bgsm}
                                    onChangeText={(text) => {this.changeIntroduction = text;}}
                                    style={{backgroundColor: '#eee', height: 0.28*height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                </ScrollView>
                <TouchableOpacity onPress={this.submit.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    submit() {
        if (this.state.bgyy.length === 0) {
            Toast.show('请选择变更原因');
            return;
        }
        if (this.props.tag !== "配合任务" && this.state.changeStartTime.length === 0) {
            Toast.show('请选择变更开始时间');
            return;
        }
        if (this.state.changeEndTime.length === 0) {
            Toast.show('请选择变更结束时间');
            return;
        }
        if (this.changeIntroduction.length === 0 && this.state.bgsm.length === 0) {
            Toast.show('请填写变更情况说明');
            return;
        }
        axios.post('/psmSsjdjh/saveYqbg', {
            userID: GLOBAL_USERID,
            jhxxId: this.props.jhxxId,
            rwid: this.props.rwid,
            yqbgId: this.state.yqbgId,
            yjhkssj: this.state.startTime,
            yjhjssj: this.state.endTime,
            xjhkssj: this.state.changeStartTime,
            xjhjssj: this.state.changeEndTime,
            bgyy: this.state.bgyy,
            bgsm: this.changeIntroduction || this.state.bgsm,
            callID: true
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.props.exchangeRwid(responseData.data);
                Toast.show('提交申请成功');
                const self = this;
                let timer = setTimeout(() => {
                    self.props.navigator.push({
                        name: 'CheckFlowInfo',
                        component: CheckFlowInfo,
                        params: {
                            resID: responseData.data,
                            tag: self.props.tag ? self.props.tag : '',
                            reloadInfo: this.props.reloadInfo
                        }
                    });
                    clearTimeout(timer);
                }, 1500);
            } else {
                Toast.show(responseData.message);
            }
        }).catch((error) => {
            Toast.show('服务端错误');
        });
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    viewSty: {
        backgroundColor: '#fdfdfd'
    },
    editPanel: {
        backgroundColor: '#fdfdfd',
        marginTop: 15,
        paddingBottom: 0.04*width
    },
    icon: {
        width:width*0.07,
        height:width*0.07,
    },
    editTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: height*0.07,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    editText: {
        marginLeft: width*0.02,
        color: '#5476a1'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    titleText: {
        marginLeft: width*0.02,
        fontWeight: 'bold'
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    label: {
        color: '#5476a1'
    },
    blank: {
        flex: 1
    },
    button: {
        backgroundColor: '#216fd0',
        height: height*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        marginTop: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    inputCell: {
        height: height*0.35,
        paddingLeft: width*0.02,
        paddingRight: width*0.02
    },
    inputLabel: {
        height: height*0.07,
        justifyContent: 'center',
    }
});
