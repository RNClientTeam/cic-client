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
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar.js";
import {getTimestamp} from '../../../../Util/Util.js';
const {width, height}  = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import Loading from "../../../../Component/Loading.js";
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import ModalDropdown from 'react-native-modal-dropdown';

export default class EnsureCompleteOfCooper extends Component{
    constructor(props) {
        super(props);
        this.progress = '';
        this.state = {
            isLoading: false,
            yqwcsj: '',
            zrwjhkssj: '',
            zrwjhjssj: '',
            sjwcsj: '',
            gzjd: '',
            wcqk:''
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        axios.get('/psmQqjdjh/phrwDetail', {
            params: {
                userID: GLOBAL_USERID,
                phrwId: this.props.rwid,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                let res = responseData.data;
                this.setState({
                    yqwcsj: res.yqwcsj,
                    zrwjhkssj: res.zrwjhkssj,
                    zrwjhjssj: res.zrwjhjssj,
                    sjwcsj: res.sjwcsj,
                    gzjd: res.gzjd,
                    wcqk:res.wcqk
                });
            } else {
                Toast.show(responseData.message);
            }
        }).catch((error) => {
            Toast.show('服务端错误');
        });
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="任务概况"/>
                <ScrollView>
                    <View style={styles.viewSty}>
                        <View style={[styles.cell, {borderBottomWidth:0}]}>
                            <Text>工作节点</Text>
                            <View style={styles.blank}/>
                            <Text>已生效</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>工作节点描述</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>{`${this.state.zrwjhkssj} ／ ${this.state.zrwjhjssj}`}</Text>
                        </View>
                    </View>
                    <View style={styles.editPanel}>
                        <View style={[styles.cell, {borderBottomWidth:0}]}>
                            <Text>配合任务</Text>
                            <View style={styles.blank}/>
                            <Text>{this.props.zrrmc}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>配合任务描述</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>要求完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-07-02</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.sjwcsh}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>完成进度</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.gzjd}%</Text>
                        </View>

                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>当前进展情况</Text>
                            </View>
                            <View>
                                <Text style={styles.wcqkSty}>{this.state.wcqk}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.blank}/>
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
        axios.post('/psmQqjdjh/updatePhrwForQrwc', {
            userID: GLOBAL_USERID,
            phrwId: this.props.rwid,
            callID: true
        }).then((responseData) => {
            if (responseData.code === 1) {
                Toast.show('确认完成成功');
                const self = this;
                let timer = setTimeout(() => {
                    self.props.navigator.pop();
                    clearTimeout(timer);
                }, 500);
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
        height: height*0.15,
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
    wcqkSty: {
        paddingLeft: 20,
        color: '#555',
        fontSize: 18,
    }
});
