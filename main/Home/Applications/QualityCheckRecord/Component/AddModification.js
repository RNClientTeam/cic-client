/**
 * Created by zhubin on 17/6/1.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import KeyValueRight from "../../../../Component/KeyValueRight"
import LabelTextArea from "../../../../Component/LabelTextArea"
import toast from 'react-native-simple-toast'
const {width} = Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown'
import Loading from "../../../../Component/Loading";
import KeySelect from "../../../../Component/KeySelect";
import Organization from "../../../../Organization/Organization";
import KeyTime from "../../../../Component/KeyTime";
import {getCurrentDate} from '../../../../Util/Util'
export default class AddModification extends Component {
    constructor(props){
        super(props);
        this.state={
            wtlbCns:[],
            wtlbCodes:[],
            wtlbCn:'请选择问题类别',
            wtlb:'',
            isLoading:false,
            zgzrr:'',
            zgzrrmc:'',
            zgzrbm:'',
            zgwcsjt:getCurrentDate(),
            sjwcsjt:getCurrentDate(),
            zgyq:'',
            zcjg:''
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新增整改任务"/>
                <ScrollView>
                    <View style={styles.cellStyle}>
                        <Text style={{color: '#216fd0'}}>问题类别</Text>
                        <View style={styles.indicateView}>
                            <ModalDropdown
                                options={this.state.wtlbCns}
                                animated={true}
                                defaultValue={this.state.wtlbCn}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({
                                        wtlbCn: this.state.wtlbCns[a],
                                        wtlb: this.state.wtlbCodes[a]
                                    })
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                            <Image style={styles.indicateImage}
                                   source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                        </View>
                    </View>
                    <KeySelect propKey="整改责任人" choiceInfo={this.choicePeople.bind(this)} value={this.state.zgzrrmc}/>
                    <KeyTime propKey="整改完成时间" onlyDate={true} showDate={this.state.zgwcsjt}
                             changeDate={(date) => this.setState({zgwcsjt: date})}/>
                    <KeyTime propKey="实际完成时间" onlyDate={true} showDate={this.state.sjwcsjt}
                             changeDate={(date) => this.setState({sjwcsjt: date})}/>
                    <View style={styles.divide}/>
                    <LabelTextArea onTextChange={(text)=>this.setState({zgyq:text})} label="整改要求"/>
                    <View style={styles.divide}/>
                    <LabelTextArea onTextChange={(text)=>this.setState({zcjg:text})} label="检查结果"/>
                </ScrollView>
                <View style={styles.actionPanel}>
                    <TouchableOpacity onPress={() => this.submit()}>
                        <View style={[styles.button, {backgroundColor: "#02c088"}] }>
                            <Text style={styles.buttonText}>保存并提交</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.submit()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading?<Loading/>:null}
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
                        zgzrr: id,
                        zgzrrmc: name,
                        zgzrbm: bmid
                    })
                }
            }
        })
    }

    componentDidMount() {
        this._getDictionaryList()
    }

    _getDictionaryList(){
        this.setState({
            isLoading:true
        });
        axios.get('/dictionary/list',{
            params:{
                userID:GLOBAL_USERID,
                root:'JDJH_WTLB',
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                let cns = [],codes=[];
                for(let i = 0;i<data.data.length;i++){
                    cns.push(data.data[i].name);
                    codes.push(data.data[i].code)
                }
                this.setState({
                    wtlbCns:cns,
                    wtlbCodes:codes
                })
            }else{
                toast.show(data.message)
            }
            console.log(data)
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }

    submit(){
        if(this.state.wtlb === ''){
            toast.show('请选择问题类别')
        }else if(this.state.zgzrr === ''){
            toast.show('请选择责任人')
        }else{
            axios.post('/psmZljcjl/zgrwSave',{
                userID:GLOBAL_USERID,
                zljcjlId:this.props.id,
                nodeId:this.props.nodeId,
                wtlb:this.state.wtlb,
                zgyq:this.state.zgyq,
                zgzrr:this.state.zgzrr,
                zgzrbm:this.state.zgzrbm,
                zgwcsjt:this.state.zgwcsjt,
                sjwcsjt:this.state.sjwcsjt,
                zcjg:this.state.zcjg,
                callID:true
            }).then(data=>{
                if(data.code === 1){
                    toast.show('提交成功');
                    let that  = this;
                    setTimeout(function () {
                        that.props.navigator.pop();
                    },500)
                }else{
                    toast.show(data.message)
                }
            }).catch(err=>{
                toast.show('服务端异常')
            })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    divide: {
        height: 0.02 * width
    },
    actionPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        width: 0.4 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        marginBottom: width * 0.02,
        marginTop: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
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