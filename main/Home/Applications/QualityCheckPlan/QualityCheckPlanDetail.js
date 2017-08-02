/**
 * Created by Nealyang on 2017/5/21.
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
import StatusBar from "../../../Component/StatusBar";
import ListHeaderCell from "../Component/ListHeaderCell";
import KeyValueLeft from "../../../Component/KeyValueLeft";
import QualityCheckRecordDetail from "../QualityCheckRecord/Component/QualityCheckRecordDetail.js";
const {width} = Dimensions.get('window');

export default class QualityCheckPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="项目质量检查计划详情"/>
                <ScrollView>
                    <ListHeaderCell name={this.state.rwnr}/>
                    <KeyValueLeft propsKey="项目编号" propsValue={this.state.xmgh}/>
                    <KeyValueLeft propsKey="项目名称" propsValue={this.state.xmmc}/>
                    <KeyValueLeft propsKey="工程子项名称" propsValue={this.state.zxmc}/>
                    <KeyValueLeft propsKey="任务性质" propsValue={this.state.rwxzmc}/>
                    <KeyValueLeft propsKey="当前状态" propsValue={this.state.twztmc}/>
                    <KeyValueLeft propsKey="计划开始时间" propsValue={this.state.jhkssjt}/>
                    <KeyValueLeft propsKey="计划结束时间" propsValue={this.state.jhjssjt}/>
                    <KeyValueLeft propsKey="负责人" propsValue={this.state.zrrmc} />
                    <KeyValueLeft propsKey="创建时间" propsValue={this.state.cjsjt} />
                </ScrollView>
                {this.state.tbZljcjl ?
                    <TouchableOpacity
                        style={styles.editRecord}
                        onPress={() => this.tianbao()}>
                        <Image style={styles.imgSty} source={require('../../../../resource/imgs/home/QualityCheckPlan/editRecord.png')}/>
                        <Text style={{color:'#216fd0'}}>填报检查记录</Text>
                    </TouchableOpacity>
                    : <View/>
                }
            </View>
        )
    }

    componentWillMount() {
        this.getAuthority(this.props.id);
    }

    componentDidMount() {
        axios.get('/psmZljcjh/detail',{
            params:{
                userID:GLOBAL_USERID,
                jhrwId:this.props.id,
                callID:true
            }
        }).then(responseData =>{
            this.setState({
                isLoading: false
            });
            if (responseData.code === 1) {
                this.setState({
                    xmmc: responseData.data.xmmc,
                    xmgh: responseData.data.xmgh,
                    zxmc: responseData.data.zxmc,
                    rwnr: responseData.data.rwnr,
                    rwxzmc: responseData.data.rwxzmc,
                    twztmc: responseData.data.twztmc,
                    zrrmc: responseData.data.zrrmc,
                    jhkssjt: responseData.data.jhkssjt,
                    jhjssjt: responseData.data.jhkssjt,
                    cjsjt: responseData.data.cjsjt,
                })
            } else {
                toast.show(responseData.message)
            }
        }).catch(err => {
            toast.show('服务端异常');
            this.setState({
                isLoading: false
            });
        });
    }

    getAuthority(id) {
        axios.get('/psmZljcjh/getOperationAuthority4Zljcjh', {
            params: {
                userID: GLOBAL_USERID,
                zlcjhId: id,
                callID: true,
            }
        }).then(responseData => {
            console.log('-------data', responseData);
            responseData = {
                "code": 1,
                "data": {
                    "addZljcjh": true,
                    "updateZljcjh": true,
                    "deleteZljcjh": false,
                    "effectZljcjh": false,
                    "tbZljcjl": true,
                },
                "message": "成功"
            };
            // 填报按钮
            this.setState({
                tbZljcjl: responseData.data.tbZljcjl
            })
        });
    }

    tianbao() {
        this.props.navigator.push({
            component: QualityCheckRecordDetail,
            name: 'QualityCheckRecordDetail',
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    editRecord:{
        flexDirection:'row',
        height:width*0.12,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',

    },
    imgSty:{
        width:width*0.07,
        height:width*0.07,
        marginRight:width*0.02
    }
});