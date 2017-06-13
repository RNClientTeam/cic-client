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
export default class FillPerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sDate: '',
            eDate: '',
            data: [],
            options: [],
            choiceData: '',
            wcbl:0,
            wcqk:''
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
                        <View style={styles.cell}>
                            <Text style={styles.label}>完成情况信息*</Text>
                            <View style={styles.blank}/>
                            <ModalDropdown
                                options={this.state.options}
                                animated={true}
                                defaultValue={this.state.options[0]}
                                style={styles.modalDropDown}
                                textStyle={styles.modalDropDownText}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(a) => {
                                    this.setState({
                                        choiceData: this.state.data[a].id
                                    })
                                }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>当前进度比例*</Text>
                            <View style={styles.blank}/>
                            <View style={{marginRight: 0.02 * width}}>
                                <TextInput keyboardType="numeric"
                                           onChangeText={(text)=>this.setState({wcbl:text})}
                                           style={{
                                    height: 0.05 * height, width: 0.25 * width, borderWidth: 1,
                                    borderColor: "#216fd0", borderRadius: 5, color: "#216fd0", textAlign: "center"
                                }}/>
                            </View>
                            <Text style={{color: "#216fd0"}}>%</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.sDate}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>{this.state.sDate}</Text>
                        </View>
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>当前完成情况*</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(text)=>this.setState({wcqk:text})}
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
            </View>
        )
    }

    submit() {
        console.log(this.state)
    }

    componentDidMount() {
        axios.get('/psmQqjdjh/wcqkxx', {
            params: {
                userID: GLOBAL_USERID,
                rwid: this.props.rwid,
                callID: getTimestamp()
            }
        }).then(data => {
            // TODO
            data = {
                "code": 1,
                "data": {
                    "sjjssj": "2016-10-10",
                    "sjkssj": "2017-10-01",
                    "data": [
                        {
                            "name": "电气项目是否承接审批表已完成报批",
                            "id": "Z0000001",
                            "parentId": "-1"
                        },
                        {
                            "name": "无合作单位",
                            "id": "Z0000002",
                            "parentId": "-1"
                        },
                        {
                            "name": "有合作单位，项目合作思路备案表已完成报批",
                            "id": "Z0000003",
                            "parentId": "-1"
                        },
                        {
                            "name": "合作单位名称：【填写】",
                            "id": "Z0000004",
                            "parentId": " Z0000003"
                        }
                    ],
                },
                "message": "成功"
            };
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
                    choiceData:this.state.data[0].id
                })
            }

        })
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
