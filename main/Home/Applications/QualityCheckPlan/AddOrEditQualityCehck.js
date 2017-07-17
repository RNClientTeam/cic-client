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
const {width} = Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown';
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";
import {getCurrentDate, getCurrentMonE} from '../../../Util/Util'
import Organization from "../../../Organization/Organization";
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
                    <KeyValueRight propKey="项目工号" readOnly={true} defaultValue={this.state.cfxxId}/>
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
                    <KeySelect propKey="负责人" choiceInfo={this.choicePeople.bind(this)} value={this.state.zrrmc}/>
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
                            <TouchableOpacity style={[styles.button, {backgroundColor: '#02bd93'}]}>
                                <Text style={{color: '#fff'}}>提交审核</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor: '#216fd0'}]}>
                                <Text style={{color: '#fff'}}>保存</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor: '#fc9628'}]}>
                                <Text style={{color: '#fff'}}>生效</Text>
                            </TouchableOpacity>
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

    addProject(xmmc, xmgh, zxmc, zxid) {
        this.setState({
            xmmc: xmmc,
            cfxxId: xmgh,
            gczxId: zxid,
            zxmc: zxmc
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

    componentDidMount() {
        this.getRwxz();
        this.getTwzt();
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