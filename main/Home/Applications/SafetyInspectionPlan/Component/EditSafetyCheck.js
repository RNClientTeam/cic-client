"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity
} from 'react-native';
import KeyValueRight from "../../../../Component/KeyValueRight";
import StatusBar from '../../../../Component/StatusBar.js';
import KeySelect from "../../../../Component/KeySelect";
import KeyTime from "../../../../Component/KeyTime";
import ChooseProject from "./ChooseProject";
import Organization from "../../../../Organization/Organization";
import Toast from 'react-native-simple-toast';
import {padStart} from '../../../../Util/Util';

const {width, height} = Dimensions.get('window');

export default class EditSafetyCheck extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            title: this.props.id ? '安全检查计划编辑' : '安全检查计划新建',
            cfxxId: '',
            gczxId: '',
            sgrwId: '',
            zrr: '',
            zrrmc: '',
            zrbm: '',
            zt: 100,
            ztmc: '',
            aqjcjhmc: '',
            zxmc: '',
            jhkssj: '',
            jhjssj: '',
            cjsj: '',
            isLoading: false,
            xmbh: ''
        }
    }

    componentDidMount() {
        //编辑-初始化
        if (this.props.id) {
            axios.get('/psmAqjcjh/aqjcjhDetail', {
                params: {
                    userID: GLOBAL_USERID,
                    id: this.props.id,
                    callID: true
                }
            }).then((res) => {
                if (res.code === 1) {
                    this.setState({
                        aqjcjhmc: res.data.aqjcjhmc,
                        xmbh: res.data.xmbh,
                        xmmc: res.data.xmmc,
                        gczxmc: res.data.zxmc,
                        sgrwmc: res.data.sgrwmc,
                        jhkssj: res.data.jhkssj,
                        jhjssj: res.data.jhjssj,
                        zrrmc: res.data.zrrmc,
                        cjsj: res.data.cjsj,
                        cfxxId: res.data.cfxxId,
                        gczxId: res.data.gczxId,
                        sgrwId: res.data.id,
                        zrr: res.data.zrr,
                        zrbm: res.data.zrbm,
                        zt: res.data.zt
                    });
                } else {
                    Toast.show(res.message);
                }
            }).catch((err) => {
                Toast.show('服务端异常');
            });
        }
    }

    addProject(xmbh, xmmc, gczxmc, sgrwmc, gczxId, sgrwId, cfxxId) {
        this.setState({
            xmbh,
            xmmc,
            gczxmc,
            sgrwmc,
            gczxId,
            sgrwId,
            cfxxId,
        })
    }

    formatDate(date) {
        return `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(date.getDate())}`
    }

    choiceInfo() {
        this.props.navigator.push({
            component: ChooseProject,
            name: 'ChooseProject',
            params: {
                addProject: (xmbh, xmmc, gczxmc, sgrwmc, gczxId, sgrwId, cfxxId) =>
                    this.addProject(xmbh, xmmc, gczxmc, sgrwmc, gczxId, sgrwId, cfxxId)
            }
        })
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

    save(id = '') {
        const data = {
            userID: GLOBAL_USERID,
            id: id,
            cfxxId: this.state.cfxxId,
            gczxId: this.state.gczxId,
            sgrwId:	this.state.sgrwId,
            aqjcjhmc: this.state.aqjcjhmc,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            jhkssj: this.state.jhkssj,
            jhjssj: this.state.jhjssj,
            callID: true,
        };
        axios.post('/psmAqjcjh/saveAqjcjh', data)
            .then(data => {
                if (data.code === 1) {
                    Toast.show('保存成功!');
                    setTimeout(() => this.goBack());
                } else {
                    Toast.show(data.message);
                }
            })
            .catch(err => {
                if (err) {
                    Toast.show('服务端异常');
                }
            })
    }

    submit() {
        if (this.state.aqjcjhmc.length === 0) {
            Toast.show('请填写检查计划名称');
        } else if (this.state.xmbh.length === 0 || this.state.xmmc.length === 0
            || this.state.gczxmc.length === 0 || this.state.gczxmc.length === 0) {
            Toast.show('请选择项目');
        } else if (this.state.jhkssj.length === 0) {
            Toast.show('请选择计划开始时间');
        } else if (this.state.jhjssj.length === 0) {
            Toast.show('请选择计划结束时间');
        } else if (this.state.zrrmc.length === 0) {
            Toast.show('请选择责任人');
        } else {
            this.save(this.props.id);
        }
    }

    goBack() {
        this.props.navigator.pop();
        this.props.reloadInfo();
    }


    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title={this.state.title} navigator={this.props.navigator}/>
                <KeyValueRight propKey="安全检查计划名称" defaultValue={this.state.aqjcjhmc} txtChange={(text)=>{this.setState({aqjcjhmc:text});}}/>
                <KeyValueRight propKey="项目编号" readOnly={true} defaultValue={this.state.xmbh}/>
                <KeySelect propKey="项目名称" choiceInfo={() => this.choiceInfo()} value={this.state.xmmc || "请选择"} />
                <KeyValueRight propKey="工程子项名称" readOnly={true} defaultValue={this.state.gczxmc}/>
                <KeyValueRight propKey="施工任务" readOnly={true} defaultValue={this.state.sgrwmc}/>
                <KeyTime propKey="计划开始时间" onlyDate={true} showDate={this.state.jhkssj}
                         changeDate={(date) => this.setState({jhkssj: date})}/>
                <KeyTime propKey="计划结束时间" onlyDate={true} showDate={this.state.jhjssj}
                         changeDate={(date) => this.setState({jhjssj: date})}/>
                <KeySelect propKey="责任人" choiceInfo={this.choicePeople.bind(this)} value={this.state.zrrmc}/>
                {
                    this.props.id &&
                    <KeyValueRight propKey="创建时间" readOnly={true} defaultValue={this.state.cjsj}/>
                }
                <TouchableOpacity style={styles.btnView} onPress={() => this.submit()}>
                    <Text style={{color:'#fff',fontSize:15}}>保存</Text>
                </TouchableOpacity>
            </View>
        );
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
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent: 'space-between'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d',
        alignItems: 'flex-end'
    },
    btnView: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 15,
        height: 0.06 * height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#216fd0'
    }
});
