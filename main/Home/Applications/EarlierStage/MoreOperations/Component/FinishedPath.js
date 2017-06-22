/**
 * Created by zhubin on 17/5/6.
 */

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
import StatusBar from "../../../../../Component/StatusBar"
import PathRow from "./PathRow"

const {width, height}  = Dimensions.get('window');

export default class FinishedPath extends Component{
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                applicantTitle: '编制人',
                approvalTitle: '市场部门经理',
                applicant: '蔡营',
                date: '2017-02-16',
                time: '09:00'
            },
            {
                applicantTitle: '编制人',
                approvalTitle: '市场部门经理',
                applicant: '蔡营',
                date: '2017-02-16',
                time: '09:00'
            },
            {
                applicantTitle: '编制人',
                approvalTitle: '市场部门经理',
                applicant: '蔡营',
                date: '2017-02-16',
                time: '09:00'
            }
        ]
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="已完成流程步骤"/>
                <ScrollView>
                    <View style={styles.titleView}>
                        <View style={styles.titleContent}>
                            <Text style={styles.titleText}>已完成步骤</Text>
                        </View>
                    </View>
                    {this.renderRows()}
                </ScrollView>
            </View>
        )
    }

    renderRows() {
        return this.dataSource.map((item, index) => (<PathRow key={index} data={item}/>))
    }

    componentDidMount() {
        if(this.props.tag==='进度计划'){
            axios.get('/workFlow/multiActionList',{
                params:{
                    userID:GLOBAL_USERID,
                    resID:this.props.rwid,
                    groupWfName:'qqjdjh-zx-zrw',
                    callID:true
                }
            }).then(data=>{
                console.log(data);
            })
        }
    }
}

const styles = StyleSheet.create(
    {
        containerStyle:{
            backgroundColor:'#f2f2f2',
            flex:1
        },
        titleContent: {
            backgroundColor: '#f99e3d',
            justifyContent: 'center',
            height: 0.035 * height,
            width: 0.3 * width,
            paddingLeft: 0.06 * width,
            paddingRight: 0.02 * width,
            marginTop: 0.02 * width,
            marginBottom: 0.04 * width,
            borderTopRightRadius: 0.035/2 * height,
            borderBottomRightRadius: 0.035/2 * height
        },
        titleText: {
            color: 'white'
        }
    }
);
