/**
 * Created by Nealyang on 2017/5/3.
 * 填报完成情况
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width, height} = Dimensions.get('window');
import {getTimestamp} from '../../../../Util/Util'
import ModalDropdown from 'react-native-modal-dropdown';
import toast from 'react-native-simple-toast'
import Loading from "../../../../Component/Loading";
import ChoiceDate from "../../../../Component/ChoiceDate";
export default class FillPerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sDate: '',
            eDate: '',
            data: [],
            options: [],
            choiceData: '',
            wcbl: 0,
            wcqk: '',
            loading: false,
            defaultValue: '',
            showsjwcsj: false
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="完成情况表单"/>
                <ScrollView>
                    <View style={styles.viewSty}>
                        <View style={styles.title}>
                            <Image style={styles.icon}
                                   source={require('../../../../../resource/imgs/home/applications/fileIcon.png')}/>
                            <Text style={styles.titleText}>电气工程信息表审批</Text>
                        </View>
                        {this.state.options.length > 0 ? <View style={styles.cell}>
                            <Text style={styles.label}>完成情况信息*</Text>
                            <View style={styles.blank}/>
                            <ModalDropdown
                                options={this.state.options}
                                animated={true}
                                defaultValue={this.state.options[0]}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                enableEmptySections={true}
                                onSelect={(a) => {
                                    this.selectWcqk(a)
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View> : null}
                        <View style={styles.cell}>
                            <Text style={styles.label}>当前进度比例*</Text>
                            <View style={styles.blank}/>
                            <View style={{marginRight: 0.02 * width}}>
                                <TextInput keyboardType="numeric"
                                           onChangeText={(text) => this.fillWcbl(text)}
                                           value={this.state.wcbl+''}
                                           underlineColorAndroid="transparent"
                                           style={{
                                               height: 0.05 * height,
                                               width: 0.25 * width,
                                               borderWidth: 1,
                                               borderColor: "#216fd0",
                                               borderRadius: 5,
                                               color: "#216fd0",
                                               textAlign: "center",
                                               padding:0
                                           }}/>
                            </View>
                            <Text style={{color: "#216fd0"}}>%</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <ChoiceDate showDate={this.state.sDate}
                                        changeDate={(date) => this.setState({sDate: date})}/>
                        </View>
                        {
                            this.state.showsjwcsj ? <View style={styles.cell}>
                                <Text style={styles.label}>实际完成时间</Text>
                                <View style={styles.blank}/>
                                {/*<Text>{this.state.sDate}</Text>*/}
                                <ChoiceDate showDate={this.state.eDate}
                                            changeDate={(date) => this.setState({eDate: date})}/>
                            </View> : null
                        }
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>当前完成情况*</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline={true}
                                    underlineColorAndroid="transparent"
                                    textAlignVertical="top"
                                    numberOfLines={4}
                                    defaultValue={this.state.defaultValue}
                                    onChangeText={(text) => this.setState({wcqk: text})}
                                    style={{backgroundColor: '#eee', height: 0.28 * height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.blank}/>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>提交</Text>
                    </View>
                </TouchableOpacity>
                {this.state.loading ? <Loading/> : null}
            </View>
        )
    }

    fillWcbl(text) {
        this.setState({wcbl: text});
        if(parseFloat(text)===100){
            this.setState({
                showsjwcsj:true
            })
        }else{
            this.setState({
                showsjwcsj:false
            })
        }
    }

    showLoading() {
        this.setState({
            loading: true
        })
    }

    hideLoading() {
        this.setState({
            loading: false
        })
    }

    selectWcqk(a) {
        this.setState({
            choiceData: this.state.data[a].name
        }, function () {
            if (this.state.data[a].parentId !== -1) {
                for (let i = 0; i < this.state.data.length; i++) {
                    console.log(this.state.data[i].id);
                    if (this.state.data[i].id === this.state.data[a].parentId) {
                        this.setState({
                            defaultValue: this.state.data[i].name,
                            wcqk: this.state.data[i].name
                        })
                    }
                }
            }

        });

    }

    submit() {
        if (parseFloat(this.state.wcbl) > 100) {
            toast.show('完成比例必须在0~100之间');
        } else if (parseFloat(this.state.wcbl) < 0) {
            toast.show('完成比例必须在0~100之间');
        } else if(parseFloat(this.state.wcbl)!== parseInt(this.state.wcbl)){
            toast.show('完成比例必须为整数');
        } else if (this.state.sDate.length === 0) {
            toast.show('请选择实际开始时间');
        } else if (showsjwcsj && this.state.eDate.length === 0) {
            toast.show('请选择实际结束时间');
        } else if (this.state.wcqk.length === 0) {
            toast.show('请填写完成情况说明');
        } else {
            this.showLoading();
            axios.post('/psmQqjdjh/save4Zrwwcqk', {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                rwid: this.props.rwid,
                wcxx: this.state.choiceData,
                wcqk: this.state.wcqk,
                wcbl: this.state.wcbl,
                sjkssj: this.state.sDate,
                sjjssj: this.state.eDate,
                callID: true
            }).then(responseData => {
                this.hideLoading();
                if (responseData.code === 1) {
                    toast.show('提交成功');
                    const that = this;
                    setTimeout(function () {
                        that.props.navigator.pop();
                    }, 1000)
                } else {
                    toast.show(responseData.message);
                }
            }).catch((err) => {
                toast.show('服务端错误');
                this.hideLoading();
            })
        }
    }

    componentDidMount() {
        axios.get('/psmQqjdjh/wcqkxx', {
            params: {
                userID: GLOBAL_USERID,
                rwid: this.props.rwid,
                callID: true
            }
        }).then(data => {
            // TODO
            console.log(data);
            if (data.code === 1) {
                data = data.data;
                for (let i = 0; i < data.data.length; i++) {
                    this.state.data.push(data.data[i]);
                    this.state.options.push(data.data[i].name);
                }
                this.setState({
                    eDate: data.sjjssj,
                    sDate: data.sjkssj,
                    data: this.state.data,
                    options: this.state.options,
                    choiceData: this.state.data[0] && this.state.data[0].name
                })
            }

        });
    }

    componentWillUnmount() {
        this.props.reloadInfo();
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    viewSty: {
        backgroundColor: '#fdfdfd',
        paddingBottom: width * 0.04
    },
    icon: {
        width: width * 0.07,
        height: width * 0.07,
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.07,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    label: {
        color: '#5476a1'
    },
    blank: {
        flex: 1
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.07,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    titleText: {
        marginLeft: width * 0.02,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#216fd0',
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginBottom: width * 0.05,
        marginTop: width * 0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    inputCell: {
        height: height * 0.35,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02
    },
    inputLabel: {
        height: height * 0.07,
        justifyContent: 'center',
    },
    modalDropDownText: {
        fontSize: width * 0.035,
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
