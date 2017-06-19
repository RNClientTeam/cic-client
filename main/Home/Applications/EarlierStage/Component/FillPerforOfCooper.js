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

export default class FillPerforOfCooper extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            yqwcsj: '',
            zrwjhkssj: '',
            zrwjhjssj: '',
            sjwcsj: '',
            zrwztmc: '',
            gzjd: '',
            rwnr: '',
            progress: ''
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
                    zrwztmc: res.zrwztmc,
                    gzjd: res.gzjd,
                    rwnr: res.rwnr
                });
            }
        }).catch((error) => {

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
                            <Text>{this.state.zrwztmc}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>{this.state.gzjd}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>{`${this.state.zrwjhkssj} - ${this.state.zrwjhjssj}`}</Text>
                        </View>
                    </View>
                    <View style={styles.editPanel}>
                        <View style={[styles.cell, {borderBottomWidth:0}]}>
                            <Text>配合任务</Text>
                            <View style={styles.blank}/>
                            <Text>{this.props.zrrmc}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>{this.state.rwnr}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>要求完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-07-02</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际完成时间</Text>
                            <View style={styles.blank}/>
                            {
                                this.state.progress === "100" &&
                                <ChoiceDate showDate={this.state.sjwcsh} changeDate={(date)=>{this.setState({sjwcsh:date});}}/>
                            }
                        </View>

                        <View style={styles.cell}>
                            <Text style={styles.label}>完成进度</Text>
                            <View style={styles.blank}/>
                            <TextInput style={styles.textinput} underlineColorAndroid="transparent"
                                onChangeText={(text) => {this.setState({progress:text})}}/>
                            <Text>%</Text>
                        </View>

                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>当前进展情况</Text>
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
                            <Text style={styles.buttonText}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.loading?<Loading/>:null}
            </View>
        )
    }

    submit() {
        axios.post('/psmQqjdjh/save4Phrwwcqk', {
            userID: GLOBAL_USERID,
            phrwId: this.props.rwid,
            jhxxId: this.props.jhxxId,
            wcqk: this.changeIntroduction,
            wcbl: this.state.progress,
            sjwcsj: this.state.sjwcsj,
            callID: true
        }).then((responseData) => {
            if (responseData.code === 1) {
                Toast.show('保存成功！');
                const self = this;
                let timer = setTimeout(() => {
                    self.props.navigator.pop();
                }, 1500);
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
    textinput: {
        borderRadius: 5,
        width: 70,
        height: height * 0.045,
        marginTop:height*0.015,
        borderWidth: 1,
        borderColor: '#5476a1',
        marginRight: 10,
        textAlign: 'center'
    }
});