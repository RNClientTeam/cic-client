/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import NewProjectHeaderCell from "./Component/NewProjectHeaderCell";
import KeyTime from "../../../Component/KeyTime";
import KeySelect from "../../../Component/KeySelect";
import KeyValueN from "../../../Component/KeyValueN";
import KeyPercentage from "../../../Component/KeyPercentage";
import BottomSaveButton from "../../../Component/BottomSaveButton";
import ListHeaderCell from "../Component/ListHeaderCell";
import Organization from "../../../Organization/Organization";
const {width} = Dimensions.get('window');
import {getCurrentDate} from '../../../Util/Util'
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";

export default class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zrr: '',
            zrbm: '',
            kssj: getCurrentDate(),
            wcsj: getCurrentDate(),
            cyry: '',
            sgdd: '',
            rwmc: '',
            wcqk: '',
            wcbl: '',
            zrrCN: '',
            cyryCN: '',
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新建施工日计划"/>
                <ScrollView>
                    <ListHeaderCell name="临时任务"/>
                    <KeySelect value={this.state.zrrCN} choiceInfo={this.choiceInfo.bind(this)} propKey="任务负责人"/>
                    <KeyTime changeDate={(date) => this.setState({kssj: date})} showDate={this.state.kssj}
                             propKey="任务开始时间"/>
                    <KeyTime changeDate={(date) => this.setState({wcsj: date})} showDate={this.state.wcsj}
                             propKey="任务结束时间"/>
                    <KeySelect value={this.state.cyryCN} choiceInfo={this.choiceCYRN.bind(this)} propKey="参与人员"/>
                    <View style={{marginTop: width * 0.02, marginBottom: width * 0.03}}>
                        <KeyValueN textChange={(txt) => {
                            this.setState({sgdd: txt})
                        }} propKey="工作地点"/>
                        <KeyValueN textChange={(txt) => {
                            this.setState({rwmc: txt})
                        }} propKey="工作内容"/>
                        <KeyValueN textChange={(txt) => {
                            this.setState({wcqk: txt})
                        }} propKey="完成情况"/>
                    </View>
                    <KeyPercentage textChange={(txt) => {
                        this.setState({wcbl: txt})
                    }} propKey="完成比例"/>
                    <BottomSaveButton submit={this.submit.bind(this)}/>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    choiceInfo() {
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        })
    }

    choiceCYRN() {
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                select: (data) => {
                    let cn = [];
                    let en = [];
                    for (let i = 0; i < data.length; i++) {
                        cn.push(data[i].name);
                        en.push(data[i].id);
                    }
                    this.setState({
                        cyryCN: cn.join(','),
                        cyry: en.join(',')
                    });

                },
                type: 'emp'
            }
        })
    }


    getInfo(bmId, userName, userId) {
        this.setState({
            zrr: userId,
            zrbm: bmId,
            zrrCN: userName
        })
    }

    submit() {
        this.setState({isLoading: true});
        let data = {
            userID: GLOBAL_USERID,
            zrr: this.state.zrr,
            zrbm: this.state.zrbm,
            kssj: this.state.kssj,
            cyry: this.state.cyry,
            sgdd: this.state.sgdd,
            rwmc: this.state.rwmc,
            wcqk: this.state.wcqk,
            wcbl: this.state.wcbl,
            wcsj:this.state.wcsj,
            callID: true
        };
        axios.post('/psmSgrjh/saveRjh', data)
            .then(data => {
                this.setState({isLoading: false});
                if (data.code === 1) {
                    toast.show('提交成功!');
                    let that = this;
                    setTimeout(function () {
                        that.props.reload();
                        that.props.navigator.pop();
                    }, 500)
                } else {
                    toast.show(data.message)
                }
            }).catch(err => {
            this.setState({isLoading: false});
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});