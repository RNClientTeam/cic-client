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
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import KeySelect from "../../../Component/KeySelect";
import KeyValueRight from "../../../Component/KeyValueRight";
import KeyTime from "../../../Component/KeyTime";
import ChooseProject from "./Component/ChooseProject";
import ModalDropdown from 'react-native-modal-dropdown';
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";
import {getCurrentDate, getCurrentMonE} from '../../../Util/Util'
import Organization from "../../../Organization/Organization";
const {width} = Dimensions.get('window');

export default class AddOrEditQualityCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cfxxId: '',
            gczxId: "",
            rwxz: '',
            twzt: '',
            rwnr: '',
            zrr: '',
            zrbm: '',
            jhkssj: getCurrentDate(),
            jhjssj: getCurrentMonE(),
            rwxzCn: [],
            rwxzCode: [],
            twztCn: [],
            twztCode: [],
            rwxzmc: '请选择任务性质',
            twztmc: '请选择任务状态',
            xmmc: '',
            zxmc: "",
            isLoading: false
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator}
                           title={this.props.flag === 'add' ? "质量检查计划新建" : "质量检查计划编辑"}/>
                <ScrollView>
                    <KeySelect choiceInfo={() => this.choiceInfo()} value={this.state.xmmc || "请选择"} propKey="项目名称"/>
                    <KeyValueRight propKey="项目工号" readOnly={true} defaultValue={this.state.xmgh}/>
                    <KeyValueRight propKey="子项名称" readOnly={true} defaultValue={this.state.zxmc}/>
                    <KeyValueRight txtChange={(txt) => {
                        this.setState({rwnr: txt})
                    }} propKey="检查任务" defaultValue={this.state.rwnr}/>
                    <View style={styles.cellStyle}>
                        <Text style={{color: '#216fd0'}}>任务性质</Text>
                        <View style={styles.indicateView}>
                            <ModalDropdown
                                options={this.state.rwxzCn}
                                animated={true}
                                defaultValue={this.state.rwxzmc}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({
                                        rwxz: this.state.rwxzCode[a],
                                        rwxzmc: this.state.rwxzCn[a]
                                    })
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <Image style={styles.indicateImage}
                                   source={require('../../../../resource/imgs/home/applications/triangle.png')}/>
                        </View>
                    </View>
                    <View style={styles.cellStyle}>
                        <Text style={{color: '#216fd0'}}>任务状态</Text>
                        <View style={styles.indicateView}>
                            <ModalDropdown
                                options={this.state.twztCn}
                                animated={true}
                                defaultValue={this.state.twztmc}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({
                                        twzt: this.state.twztCode[a],
                                        twztmc: this.state.twztCn[a]
                                    })
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <Image style={styles.indicateImage}
                                   source={require('../../../../resource/imgs/home/applications/triangle.png')}/>
                        </View>
                    </View>
                    <KeySelect propKey="责任人" choiceInfo={this.choicePeople.bind(this)} value={this.state.zrrmc}/>
                    <KeyTime propKey="计划开始时间" onlyDate={true} showDate={this.state.jhkssj}
                             changeDate={(date) => this.setState({jhkssj: date})}/>
                    <KeyTime propKey="计划结束时间" onlyDate={true} showDate={this.state.jhjssj}
                             changeDate={(date) => this.setState({jhjssj: date})}/>

                </ScrollView>
                {
                    this.props.flag === 'add' ?
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={[styles.button, {backgroundColor: '#216fd0'}]}
                                              onPress={this.addPlan.bind(this)}>
                                <Text style={{color: '#fff'}}>创建</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={[styles.button, {backgroundColor: '#02bd93'}]}
                                onPress={() => this.approval(this.props.jhrwId)}>
                                <Text style={{color: '#fff'}}>提交审核</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, {backgroundColor: '#216fd0'}]}
                                onPress={() => this.update(this.props.jhrwId)}>
                                <Text style={{color: '#fff'}}>保存</Text>
                            </TouchableOpacity>
                            {
                                this.state.effectZljcjh ?
                                    <TouchableOpacity
                                        style={[styles.button, {backgroundColor: '#fc9628'}]}
                                        onPress={() => this.effective(this.props.jhrwId)}>
                                        <Text style={{color: '#fff'}}>生效</Text>
                                    </TouchableOpacity>
                                    : <View/>
                            }
                        </View>
                }
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    choicePeople() {
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                getInfo: (bmid, name, id, bmmc) => {
                    this.setState({
                        zrr: id,
                        zrrmc: name,
                        zrbm: bmid
                    })
                }
            }
        })
    }

    addProject(xmmc, xmgh, zxmc, gczxId) {
        this.setState({
            xmmc,
            gczxId,
            zxmc,
            xmgh,
        })
    }

    choiceInfo() {
        this.props.navigator.push({
            component: ChooseProject,
            name: 'ChooseProject',
            params: {
                addProject: this.addProject.bind(this)
            }

        })
    }

    //创建
    addPlan() {
        this.setState({
            isLoading:true
        });
        if (this.state.xmmc==='') {
            toast.show('请选择项目')
        } else if (this.state.rwxz==='') {
            toast.show('请选择任务性质')
        } else if (this.state.twzt==='') {
            toast.show('请选择任务状态')
        } else if (this.state.zrr==='') {
            toast.show('请选择责任人')
        }
        else if (this.state.rwnr==='') {
            toast.show('请填写检查任务')
        } else {
            axios.post('/psmZljcjh/save', {
                userID: GLOBAL_USERID,
                cfxxId: this.state.cfxxId,
                gczxId: this.state.gczxId,
                rwxz: this.state.rwxz,
                twzt: this.state.twzt,
                rwnr: this.state.rwnr,
                zrr: this.state.zrr,
                zrbm: this.state.zrbm,
                jhkssj: this.state.jhkssj,
                jhjssj: this.state.jhjssj,
                callID:true
            }).then(data=>{
                this.setState({
                    isLoading:false
                });
                if(data.code === 1){
                    toast.show('创建成功');
                    let that = this;
                    setTimeout(function () {
                        that.props.navigator.pop()
                    },500)
                }else{
                    toast.show(data.message)
                }
            }).catch(err=>{
                toast.show('服务端异常');
            })
        }
    }

    componentWillMount() {
        // 编辑情况下 获取权限
        if (this.props.jhrwId) {
            this.getAuthority(this.props.jhrwId);
        }
    }

    componentDidMount() {
        this.getRwxz();
        this.getTwzt();
        // 编辑情况下 获取详情
        if (this.props.jhrwId) {
            this.getDetail(this.props.jhrwId);
        }
    }


    getRwxz() {
        this.setState({
            isLoading: true
        });
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                callID: true,
                root: 'JDJH_SGRWXZ'
            }
        }).then(data => {
            this.setState({
                isLoading: false
            });
            if (data.code === 1) {
                if (data.data && data.data.length > 0) {
                    let cn = [], code = [];
                    for (let i = 0; i < data.data.length; i++) {
                        cn.push(data.data[i].name);
                        code.push(data.data[i].code);
                    }
                    this.setState({
                        rwxzCode: code,
                        rwxzCn: cn
                    })
                }
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    getTwzt() {
        this.setState({
            isLoading: true
        });
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                callID: true,
                root: 'JDJH_RWZT'
            }
        }).then(data => {
            this.setState({
                isLoading: false
            });
            if (data.code === 1) {
                if (data.data && data.data.length > 0) {
                    let cn = [], code = [];
                    for (let i = 0; i < data.data.length; i++) {
                        cn.push(data.data[i].name);
                        code.push(data.data[i].code);
                    }
                    this.setState({
                        twztCode: code,
                        twztCn: cn
                    })
                }
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    getDetail(jhrwId) {
        this.setState({
            isLoading: true
        });
        axios.get('/psmZljcjh/detail', {
            params: {
                userID: GLOBAL_USERID,
                jhrwId,
                callID: true,
            }
        }).then(responseData => {
            this.setState({
                isLoading: false
            });
            // responseData = {
            //     code: 1,
            //     data: {
            //         "zxmc": "施家胡同配电子项",
            //         "rn": 1,
            //         "cfxxId": "8a8180d856ec904a0156fe2e64806ea5",
            //         "twztmc": "已生效",
            //         "xmgh": "JZ_DS16065-16042",
            //         "xmmc": "大栅栏廊坊二条等4条街架空线入地工程",
            //         "cjbm": "00000004e00138c242a0d9",
            //         "zrrmc": "赵春华",
            //         "jhjssjt": "2016-12-26 00:00:00",
            //         "jhkssjt": "2016-12-26 00:00:00",
            //         "rwxz": 6,
            //         "zrbm": "00000004e00138c242a0d9",
            //         "id": "8a8180d858fa588c015914da35f029f4",
            //         "rwnr": "送电",
            //         "rwxzmc": "专工验收",
            //         "zrr": "ZNDQ2008",
            //         "gczxId": "8a8180d856ec904a0156fe35fc8870c3",
            //         "twzt": 100,
            //         "ssbmmc": "配网工程部",
            //         "cjsjt": "2016-12-19 10:12:41",
            //         "cjr": "ZNDQ2003"
            //     }
            // };
            if (responseData.code === 1) {
                this.setState({
                    xmmc: responseData.data.xmmc,
                    xmgh: responseData.data.xmgh,
                    zxmc: responseData.data.zxmc,
                    rwnr: responseData.data.rwnr,
                    rwxzmc: responseData.data.rwxzmc,
                    twztmc: responseData.data.twztmc,
                    zrrmc: responseData.data.zrrmc,
                    jhkssjt: responseData.data.jhkssjt,
                    jhjssjt: responseData.data.jhkssjt,
                })
            } else {
                toast.show(responseData.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    effective(jhrwId) {
        axios.post('/psmZljcjh/updateRwzt', {
            userID: GLOBAL_USERID,
            jhrwId,
            callID: true,
        }).then(responseData => {
            this.setState({
                isLoading: false
            });
            if (responseData.code === 1) {
                toast.show('生效成功!');
            } else {
                toast.show(responseData.message);
            }
        }).catch(() => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    update(jhrwId) {
        axios.post('/psmZljcjh/edit', {
            userID: GLOBAL_USERID,
            jhrwId,
            cfxxId: this.state.cfxxId,
            gczxId: this.state.gczxId,
            rwxz: this.state.rwxz,
            twzt: this.state.twzt,
            rwnr: this.state.rwnr,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            callID: true
        }).then(responseData => {
            this.setState({
                isLoading: false
            });
            if (responseData.code === 1) {
                toast.show('保存成功!');
            } else {
                toast.show(responseData.message);
            }
        }).catch(() => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    approval(jhrwId) {
        axios.post('/psmZljcjh/edit', {
            userID: GLOBAL_USERID,
            jhrwId,
            cfxxId: this.state.cfxxId,
            gczxId: this.state.gczxId,
            rwxz: this.state.rwxz,
            twzt: this.state.twzt,
            rwnr: this.state.rwnr,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            callID: true
        }).then(responseData => {
            this.setState({
                isLoading: false
            });
            if (responseData.code === 1) {
                axios.post('/workFlow/preSubmit', {
                    userID: GLOBAL_USERID,
                    resID: responseData.data.resID,
                    wfName: responseData.data.wfName,
                    callID: true,
                }).then( data => {
                    if (data.code === 1) {
                        toast.show('审批成功');
                    } else {
                        toast.show(data.message);
                    }
                })
            } else {
                toast.show(responseData.message);
            }
        }).catch(() => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        })
    }

    getAuthority(id) {
        axios.get('/psmZljcjh/getOperationAuthority4Zljcjh', {
            params: {
                userID: GLOBAL_USERID,
                zlcjhId: id,
                callID: true,
            }
        }).then(responseData => {
            console.log('-------data', responseData);
            // responseData = {
            //     "code": 1,
            //     "data": {
            //         "addZljcjh": false,
            //         "updateZljcjh": true,
            //         "deleteZljcjh": false,
            //         "effectZljcjh": true,
            //         "tbZljcjl": true,
            //     },
            //     "message": "成功"
            // };
            // 生效按钮
            this.setState({
                effectZljcjh: responseData.data.effectZljcjh
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: width * 0.2,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    button: {
        backgroundColor: 'red',
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flex: 1,
        margin: width * 0.04
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
    }
});