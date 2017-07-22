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
    TouchableHighlight
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
        this.state = {
            isLoading: false,
            data: null,
            questionList: [],
            proList: []
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
                id: this.props.data.aqjcjhId,
                callID: true
            }
        }).then((res) => {
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

    //选择附件
    choiceFile() {

    }

    gotoOrganization() {
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
                            defaultValue={this.state.data.wtlb||''}
                            style={{flex:1, alignItems:'flex-end'}}
                            textStyle={{fontSize:14}}
                            onSelect={(a) => {
                                // this.wenti = this.state.proList[a].code;
                            }}
                            showsVerticalScrollIndicator={false}/>
                    </View>
                    <View style={styles.keyValue}>
                        <Text style={[styles.textStyle,{color:'#5476a1'}]} numberOfLines={1}>检验时间</Text>
                        <ChoiceDate showDate={this.state.data.jcsj||''}
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
                    <ChoiceFileComponent getFileID={(theID) => {
                        // this.setState({fcfj:theID});
                    }}/>
                    <View style={styles.divide}/>
                    <View style={styles.bottomRow}>
                        <Text style={styles.labelColor}>检查结果</Text>
                    </View>
                    <View style={styles.textContent}>
                        <Text>{this.state.data&&this.state.data.fcjg||''}</Text>
                    </View>
                    <View style={styles.divide}/>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
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
            </View>
        )
    }

    //提交并保存
    saveAndCommit() {

    }

    //提交
    save() {

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
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        backgroundColor: 'white'

    },
    textContent: {
        paddingHorizontal: 0.02 * width,
        backgroundColor:'white',
        justifyContent: 'center',
        height: 0.12*width
    },
    keyValue: {
        height: width * 0.12,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between'
    },
    textStyle: {
        width: width*0.35,
        marginLeft:width*0.02,
    },
    contentText: {
        flex: 1,
        textAlign: 'right',
        marginRight: 10
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
    }
});
