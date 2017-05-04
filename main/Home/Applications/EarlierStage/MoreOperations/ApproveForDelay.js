/**
 * Created by Nealyang on 2017/5/3.
 * 延期变更审批
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width, height}  = Dimensions.get('window');

export default class ApproveForDelay extends Component{
    constructor(props) {
        super(props);
        this.data = {
            title: '电器工程信息表审批',

        }
    }
    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="延期变更审批"/>
                <View style={styles.viewSty}>
                    <View style={styles.title}>
                        <Image style={styles.icon} source={require('../../../../../resource/imgs/home/applications/fileIcon.png')}></Image>
                        <Text style={styles.titleText}>{this.data.title}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>项目名称</Text>
                        <View style={styles.blank}></View>
                        <Text>中国之窗(南区)临电工程</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>需变更任务</Text>
                        <View style={styles.blank}></View>
                        <Text>电气项目是否承接关键信息审批</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>原计划时间范围</Text>
                        <View style={styles.blank}></View>
                        <Text>2017-01-15 至 2017-02-26</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>变更后开始时间</Text>
                        <View style={styles.blank}></View>
                        <Text>2017-01-15 至 2017-02-26</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>变更原因</Text>
                        <View style={styles.blank}></View>
                        <Text>外单位原因</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.label}>变更情况说明</Text>
                        <View style={styles.blank}></View>
                        <Text>外单位资源不足</Text>
                    </View>
                </View>
                <View style={styles.blank}></View>
                <TouchableOpacity onPress={this.submit.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    submit() {

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
    icon: {
        width:width*0.07,
        height:width*0.07,
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
        color: '#5476a1',
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
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});

