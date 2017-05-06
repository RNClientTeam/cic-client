/**
 * Created by Nealyang on 2017/5/3.
 * 填报完成情况
 */
'use strict';
import React,{Component} from 'react'
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
const {width, height}  = Dimensions.get('window');

export default class FillPerformance extends Component{
    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="完成情况表单"/>
                <ScrollView>
                    <View style={styles.viewSty}>
                        <View style={styles.title}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/applications/fileIcon.png')}/>
                            <Text style={styles.titleText}>电气工程信息表审批</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>完成情况信息*</Text>
                            <View style={styles.blank}/>
                            <Text>获得甲方委托</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>当前进度比例*</Text>
                            <View style={styles.blank}/>
                            <View style={{marginRight: 0.02*width}}>
                                <TextInput style={{height: 0.05*height, width: 0.25*width, borderWidth: 1,
                                borderColor: "#216fd0", borderRadius: 5, color: "#216fd0", textAlign: "center"}}/>
                            </View>
                            <Text style={{color: "#216fd0"}}>%</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际开始时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-02-26</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.label}>实际完成时间</Text>
                            <View style={styles.blank}/>
                            <Text>2017-02-26</Text>
                        </View>
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={styles.label}>当前完成情况*</Text>
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
        //alert('ccccc');
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    viewSty: {
        backgroundColor: '#fdfdfd',
        paddingBottom: width*0.04
    },
    icon: {
        width:width*0.07,
        height:width*0.07,
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
});