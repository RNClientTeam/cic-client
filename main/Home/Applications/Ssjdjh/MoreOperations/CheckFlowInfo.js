/**
 * Created by Nealyang on 2017/5/3.
 * 流程信息查看
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import FinishedPath from "./Component/FinishedPath";
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';

const {width, height}  = Dimensions.get('window');

export default class CheckFlowInfo extends Component{
    constructor(props) {
        super(props);
        this.wfName = '';
        this.optionInfo = '';
        this.state = {
            optionListName: [],
            optionListID: [],
            actionID: '',
            entry_id: '',
            stepID: '',
            stepName: '',
            wfName: ''
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.from && this.props.from === 'turnover') {
            this.wfName = 'jdjhssjhrybg'
        } else if (this.props.tag === '配合任务') {
            this.wfName = 'jdjhssjhphrwyqbg';
        } else {
            this.wfName = 'jdjhssjhyqbd';
        }
        axios.post('/workFlow/preSubmit', {
            userID: GLOBAL_USERID,
            resID: this.props.resID,
            wfName: this.wfName,
            callID: true
        }).then((responseData) => {
            if (responseData.code === 1) {
                let res = responseData.data;
                res.options.forEach((elem, index) => {
                    this.state.optionListName.push(elem.name);
                    this.state.optionListID.push(elem.id);
                });
                this.setState({
                    optionListName: this.state.optionListName,
                    optionListID: this.state.optionListID,
                    entry_id: res.entry_id,
                    stepID: res.stepID,
                    stepName: res.stepName,
                    wfName: res.wfName
                });
            }
        }).catch((error) => {

        });
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="流程审批"/>
                <ScrollView>
                    <View style={styles.infoPanel}>
                        <View style={styles.flowInfoRow}>
                            <Text style={[styles.labelColor]}>当前步骤</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.stepName}</Text>
                        </View>
                        <View style={styles.flowInfoRow}>
                            <Text style={[styles.labelColor]}>当前操作</Text>
                            <View style={styles.blank}/>
                            <ModalDropdown
                                options={this.state.optionListName}
                                animated={true}
                                defaultValue={'请选择>'}
                                style={{flex:1, alignItems:'flex-end'}}
                                onSelect={(a) => {
                                    this.setState({actionID:this.state.optionListID[a]});
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={[styles.labelColor]}>审批意见</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline = {true}
                                    underlineColorAndroid="transparent"
                                    numberOfLines = {4}
                                    onChangeText={(text) => {this.optionInfo = text;}}
                                    style={{backgroundColor: '#eee', height: 0.2*height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.actionPanel}>
                        <View style={[styles.actionCell, styles.rightBorder]}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/structure.png')}/>
                            <Text style={[styles.actionColor, styles.paddingLeft]}>流程监控</Text>
                        </View>
                        <TouchableOpacity style={styles.blank} onPress={() => this.goFinishPage()}>
                            <View style={styles.actionCell}>
                                <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/schedule.png')}/>
                                <Text style={[styles.actionColor, styles.paddingLeft]}>查看已完成步骤</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={this.submit.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认完成</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    submit() {
        if (this.state.actionID.length === 0) {
            Toast.show('请选择当前操作');
            return;
        }
        if (this.optionInfo.length === 0) {
            Toast.show('请填写审批意见');
            return;
        }
        axios.post('/workFlow/submit', {
            userID: GLOBAL_USERID,
            resID: this.props.resID,
            wfName: this.wfName,
            entityID: this.state.entry_id,
            stepID: this.state.stepID,
            actionID: this.state.actionID,
            opinion: this.optionInfo,
            callID: true
        }).then((responseData) => {
            if (responseData.code === 1) {
                Toast.show('提交成功');
                let route;
                let currentRoutes = this.props.navigator.getCurrentRoutes();
                currentRoutes.forEach((elem, index) => {
                    if (elem.name === "SsjdjhDetail") {
                        route = elem;
                        return;
                    }
                });
                const self = this;
                let timer = setTimeout(() => {
                    self.props.reloadInfo && self.props.reloadInfo();
                    if (route) {
                        self.props.navigator.popToRoute(route);
                    }
                    clearTimeout(timer);
                });
            } else {
                Toast.show(responseData.message);
            }
        }).catch((error) => {
            Toast.show('服务端错误');
        });
    }

    goFinishPage() {
        this.props.navigator.push({
            name: 'finishedPath',
            component: FinishedPath,
            params: {
                wfName: this.state.wfName,
                resID: this.props.resID,
                fromCheckFlowInfo: true,
                from: this.props.from
            }
        });
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    infoPanel: {
        backgroundColor: '#fff',
        marginBottom: 0.04 * width,
        paddingBottom: 0.04 * width
    },
    flowInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        height: 0.07 * height,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    blank: {
        flex: 1
    },
    inputCell: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02
    },
    inputLabel: {
        height: height*0.07,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#216fd0',
        height: height*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width*0.05,
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    actionPanel: {
        flexDirection: 'row',
        height: 0.07 * height,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    actionCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.07 * height,
    },
    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: '#dcdcdc'
    },
    icon: {
        width:width*0.05,
        height:width*0.05,
    },
    paddingLeft: {
        paddingLeft: 0.02 * width
    },
    labelColor: {
        color: '#5476a1'
    },
    selectorColor: {
        color: '#999'
    },
    actionColor: {
        color: '#216fd0'
    }
});
