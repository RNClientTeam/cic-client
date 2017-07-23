import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableHighlight,
    Switch
} from 'react-native';
import ChoiceDate from "../../../../Component/ChoiceDate.js";
import Loading from "../../../../Component/Loading.js";
import Toast from 'react-native-simple-toast'
const {width, height} = Dimensions.get('window');
import KeyValueLeft from './KeyValueLeft.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Organization from '../../../../Organization/Organization.js';
import ChoiceFileComponent from '../../Component/ChoiceFileComponent.js';
export default class DoubleCheckDetail extends Component {
    constructor(props) {
        super(props);
        this.zgyq = '';
        this.jianchaResult = '';
        this.state = {
            isLoading: false,
            data: {},
            questionList: [],
            proList: [],
            wenti: '',
            isFinished: false
        }
    }

    //获取问题类别
    getQuestionType() {
        axios.get('/dictionary/list', {
            params: {
                userID: GLOBAL_USERID,
                root: 'JDJH_WTLB_AQ',
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                this.setState({
                    questionList:res.data.map((elem, index) => {
                        return elem.name
                    }),
                    proList: res.data
                });
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    componentDidMount() {
        //获取问题类别
        this.getQuestionType();
        this.setState({isLoading:true});
        axios.get('/psmAqjcjh/init4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                id: this.props.data.id,
                callID: true
            }
        }).then((res) => {
            console.log(res);
            if (res.code === 1) {
                this.setState({
                    data: res.data,
                    isLoading: false
                });
            } else {
                this.setState({isLoading:false});
                Toast.show(res.message);
            }
        }).catch((error) => {
            this.setState({isLoading:false});
        });
    }

    gotoOrganization() {
        if (this.props.check) return;
        this.props.navigator.push({
            name: 'Organization',
            component: Organization,
            params: {
                getInfo: this.getInfo.bind(this)
            }
        })
    }

    //获取检验人：部门id  姓名  id
    getInfo(bmid, name, id) {
        this.state.data.jcrmc = name;
        this.state.data.jcr = id;
        this.setState({data:data});
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验任务</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.data.aqjcjhmc||''}
                            onChangeText={(text) => {
                                this.state.data.aqjcjhmc = text;
                                this.setState({data:this.state.data});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程工号</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.data.xmbh||''}
                            onChangeText={(text) => {
                                this.state.data.xmbh = text;
                                this.setState({data:this.state.data});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>项目名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.data.xmmc||''}
                            onChangeText={(text) => {
                                this.state.data.xmmc = text;
                                this.setState({data:this.state.data});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>工程子项名称</Text>
                        <TextInput style={styles.contentText}
                            numberOfLines={1}
                            editable={!this.props.check}
                            defaultValue={this.state.data.zxmc||''}
                            onChangeText={(text) => {
                                this.state.data.zxmc = text;
                                this.setState({data:this.state.data});
                            }}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>问题类别</Text>
                        <ModalDropdown
                            options={this.state.questionList}
                            animated={true}
                            disabled={this.props.check}
                            defaultValue={this.state.questionList[this.state.data.wtlb]||''}
                            style={{flex:1, alignItems:'flex-end'}}
                            textStyle={{fontSize:14}}
                            onSelect={(a) => {
                                this.setState({
                                    wenti:this.state.proList[a].code,
                                    isFinished:this.state.proList[a].code==='1'?false:this.state.isFinished,
                                });
                                this.zgyq = this.state.proList[a].code==='1'?'':this.zgyq;
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验时间</Text>
                        <ChoiceDate showDate={this.state.data.jcsj||''}
                            disabled={!this.props.check}
                            changeDate={(date)=>{
                                this.state.data.jcsj = date;
                                this.setState({data:this.state.data});
                            }}/>
                    </View>
                    <TouchableOpacity onPress={this.gotoOrganization.bind(this)}>
                        <View style={styles.keyValue}>
                            <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验人</Text>
                            <Text style={styles.contentText} numberOfLines={1}>{this.state.data.jcrmc||''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divide}/>
                    <ChoiceFileComponent getFileID={(theID) => {}}
                        businessModule={this.state.data.businessModule}
                        isAttach={this.state.data.fcjlisAttach}/>
                    <View style={styles.divide}/>
                    <View style={styles.bottomRow}>
                        <Text style={styles.labelColor}>检查结果</Text>
                    </View>
                    <View style={styles.textContent}>
                        <TextInput style={styles.textinputStyle}
                            multiline={true}
                            editable={!this.props.check}
                            defaultValue={this.state.data.fcjg}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {this.jianchaResult=text;}}
                            underlineColorAndroid="transparent"/>
                    </View>
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.bottomRow}>
                            <Text style={styles.labelColor}>整改要求</Text>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.textContent}>
                            <TextInput style={styles.textinputStyle}
                                multiline={true}
                                defaultValue={this.state.data.zgyq||''}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {this.zgyq=text;}}
                                underlineColorAndroid="transparent"/>
                        </View>
                    }
                    {
                        this.state.wenti !== '1' &&
                        <View style={styles.keyValue}>
                            <Text style={[styles.labelColor,{marginLeft:width*0.02}]}>是否已现场整改</Text>
                            <Switch onValueChange={(value) => {this.setState({isFinished:value})}}
                                    value={this.state.isFinished}/>
                        </View>
                    }

                    {
                        !this.props.fromList &&
                        <View style={styles.bottomView}>
                            <TouchableHighlight underlayColor="transparent" onPress={this.saveAndCommit.bind(this)}>
                                <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                                    <Text style={styles.btnText}>保存并提交</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                                <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                                    <Text style={styles.btnText}>保存</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    //提交并保存
    saveAndCommit() {
        axios.post('/psmAqjcjh/saveAndsumbitAqjcjl', {
            userID: GLOBAL_USERID,
            id: this.state.data.id,
            aqjcjhId: this.state.data.aqjcjhId,
            aqjcjhmc: this.state.data.aqjcjhmc,
            gczxId: this.state.data.gczxId,
            xmbh: this.state.data.xmbh,
            jcr: this.state.data.jcr,
            jcbm: this.state.data.jcbm,
            jcsj: this.state.data.jcsj,
            jcjg: this.jianchaResult,
            zgyq: this.zgyq,
            wtlb: this.state.wenti,
            sfxczg: this.state.data.sfxczg,
            jcfj: this.state.data.jcfj,
            fcfj: this.state.data.fcfj,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                Toast.show('保存成功');
                this.props.navigator.pop();
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    //提交
    save() {
        axios.post('/psmAqjcjh/saveAqjcjl', {
            userID: GLOBAL_USERID,
            id: this.state.data.id,
            aqjcjhId: this.state.data.aqjcjhId,
            aqjcjhmc: this.state.data.aqjcjhmc,
            gczxId: this.state.data.gczxId,
            xmbh: this.state.data.xmbh,
            jcr: this.state.data.jcr,
            jcbm: this.state.data.jcbm,
            jcsj: this.state.data.jcsj,
            jcjg: this.jianchaResult,
            zgyq: this.zgyq,
            wtlb: this.state.wenti,
            sfxczg: this.state.data.sfxczg,
            jcfj: this.state.data.jcfj,
            fcfj: this.state.data.fcfj,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                Toast.show('保存成功');
                this.props.navigator.pop();
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }
}

const styles = StyleSheet.create({
    divide: {
        height: 0.02 * width
    },
    row: {
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white'
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    attachmentContent: {
        paddingTop: 0.02 * width,
        paddingBottom: 0.02 * width
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelColor: {
        color: '#5476a1'
    },
    bottomRow: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        justifyContent: 'center',
        height: 0.12 * width,
        marginBottom :1,
        backgroundColor: 'white'
    },
    textContent: {
        width: width,
        height: 0.117 * height,
        paddingVertical: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 0.02 * width,
    },
    keyValue: {
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
        paddingRight:15
    },
    textStyle: {
        width: width*0.35,
        marginLeft:width*0.02,
    },
    contentText: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14
    },
    bottomView: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnView: {
        height: 0.045 * height,
        width: 0.36 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    },
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5,
        fontSize:15
    }
});
