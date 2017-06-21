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
import {getTimestamp} from '../../../../Util/Util.js';
const {width, height}  = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import Loading from "../../../../Component/Loading.js";
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import ModalDropdown from 'react-native-modal-dropdown';
import Organization from '../../../../Organization/Organization.js';
import CheckFlowInfo from './CheckFlowInfo.js';

export default class Turnover extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            proName: '',
            startTime: '',
            endTime: '',
            planName: '',
            changeStartTime: '',
            changeEndTime: '',
            changeReason: '',
            rybgId:'',
            reasonList: [],
            selected: true,
            yzrr: '',
            xzrr: '请选择>',
            yzrbm: '',
            xzrbm: '',
            yzrrmc: ''
        }
    }
    componentDidMount() {
        this.fetchData();
        this.exchangeReason();
    }

    fetchData() {
        axios.get('psmQqjdjh/rybg', {
            params: {
                userID: GLOBAL_USERID,
                rwid: this.props.rwid,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.setState({
                    proName: responseData.data.xmmc,
                    startTime: responseData.data.yjhkssj,
                    endTime: responseData.data.yjhjssj,
                    planName: responseData.data.rwmc,
                    changeStartTime: responseData.data.xjhkssj,
                    changeEndTime: responseData.data.xjhjssj,
                    changeReason: responseData.data.bgyy,
                    rybgId: responseData.data.rybgId,
                    yzrr: responseData.data.yzrr,
                    selected: responseData.data.sfzzfwn==1?true:false,
                    yzrbm: responseData.data.yzrbm,
                    yzrrmc: responseData.data.yzrrmc
                });
            }
        }).catch((error) => {

        });
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="人员变更申请"/>
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
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.props.sDate && this.props.sDate}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.props.eDate && this.props.eDate}</Text>
                        </View>
                    </View>
                    <View style={styles.editPanel}>
                        <View style={styles.editTitle}>
                            <Image style={styles.icon}
                                   source={require('../../../../../resource/imgs/home/earlierStage/peopleChange.png')}/>
                            <Text style={styles.editText}>人员变更</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>变更原因</Text>
                            <ModalDropdown
                                options={this.state.reasonList}
                                animated={true}
                                defaultValue={'请选择>'}
                                style={{flex:1, alignItems:'flex-end'}}
                                onSelect={(a) => {
                                    this.setState({changeReason:this.state.reasonList[a]});
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>原责任人</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.yzrrmc}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>新责任人</Text>
                            <View style={styles.blank}/>
                            <Text style={{padding:5, paddingRight:0}} onPress={this.getNewPerson.bind(this)}>{this.state.xzrr}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>是否职责范围</Text>
                            <View style={styles.blank}/>
                            <TouchableOpacity onPress={this.trueOrFalse.bind(this, true)}>
                                <View style={styles.itemView}>
                                    <View style={styles.outerView}>
                                        <View style={[styles.innerView,{backgroundColor:this.state.selected?'blue':'#fdfdfd'}]} />
                                    </View>
                                    <Text>是</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.trueOrFalse.bind(this, false)}>
                                <View style={styles.itemView}>
                                    <View style={styles.outerView}>
                                        <View style={[styles.innerView, {backgroundColor:!this.state.selected?'blue':'#fdfdfd'}]} />
                                    </View>
                                    <Text>否</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>变更情况说明</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => {this.changeIntroduction = text;}}
                                    style={{backgroundColor: '#eee', height: 0.28*height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                    <TouchableOpacity onPress={this.submit.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.loading?<Loading/>:null}
            </View>
        )
    }

    getNewPerson() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        })
    }

    getInfo(bmid, name) {
        this.setState({
            xzrbm: bmid,
            xzrr: name
        });
    }

    trueOrFalse(selected) {
        this.setState({selected:selected});
    }

    //修改变更原因
    exchangeReason() {
        axios.get('dictionary/list', {
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
                this.setState({reasonList: this.state.reasonList});
            }
        }).catch((error) => {

        });
    }

    submit() {
        axios.post('psmQqjdjh/saveRybg', {
            userID: GLOBAL_USERID,
            jhxxId: this.props.jhxxId,
            rwid: this.props.rwid,
            rybgId: this.state.rybgId,
            yzrr: this.state.yzrr,
            yzrbm: this.state.yzrbm,
            xzrr: this.state.xzrr,
            xzrbm: this.state.xzrbm,
            bgyy: this.state.changeReason,
            sfzzfwn: this.state.selected?1:0,
            bgsm: this.changeIntroduction,
            callID: getTimestamp()
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.props.navigator.push({
                    name: 'CheckFlowInfo',
                    component: CheckFlowInfo,
                    params: {
                        resID: responseData.data,
                        tag: this.props.tag,
                        from: 'turnover'
                    }
                });
            } else {
                Toast.show(responseData.message);
            }
        }).catch((error) => {
            Toast.show('服务端错误');
        });
    }

    componentWillUnmount() {
        this.props.reloadInfo()
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
    },
    outerView: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerView: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    itemView: {
        width: 45,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginLeft: 30
    }
});
