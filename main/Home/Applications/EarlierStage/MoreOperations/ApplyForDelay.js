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
const {width, height}  = Dimensions.get('window');

export default class ApplyForDelay extends Component{
    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="延期变更申请"/>
                <ScrollView>
                    <View style={styles.viewSty}>
                        <View style={styles.cell}>
                            <Text style={styles.label}>项目名称</Text>
                            <View style={styles.blank}/>
                            <Text>动物园园区电缆更换</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>需变更任务</Text>
                            <View style={styles.blank}/>
                            <Text>获得甲方委托</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-01-15</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>计划结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-02-26</Text>
                        </View>
                    </View>
                    <View style={styles.editPanel}>
                        <View style={styles.editTitle}>
                            <Image style={styles.icon}
                                   source={require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png')}/>
                            <Text style={styles.editText}>延期变更</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>变更原因</Text>
                            <View style={styles.blank}/>
                            <Text>请选择></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>变更开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>请选择></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>变更结束时间</Text>
                            <View style={styles.blank}/>
                            <Text>请选择></Text>
                        </View>
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>变更情况说明</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    style={{backgroundColor: '#eee', height: 0.28*height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                    <TouchableOpacity onPress={this.submit.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    submit() {
        //alert('cccc')
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
    textArea: {

    }
});
