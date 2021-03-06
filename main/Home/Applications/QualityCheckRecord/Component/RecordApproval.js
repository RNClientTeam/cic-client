/**
 * Created by zhubin on 17/5/31.
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
    TouchableOpacity,
    TextInput
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"

const {width, height} = Dimensions.get('window');

export default class RecordApproval extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="审批"/>
                <ScrollView>
                    <View style={styles.infoPanel}>
                        <View style={styles.flowInfoRow}>
                            <Text style={[styles.labelColor]}>当前步骤</Text>
                            <View style={styles.blank}/>
                            <Text>主管领导</Text>
                        </View>
                        <View style={styles.flowInfoRow}>
                            <Text style={[styles.labelColor]}>当前操作</Text>
                            <View style={styles.blank}/>
                            <Text style={[styles.selectorColor]}>请选择></Text>
                        </View>
                        <View style={styles.inputCell}>
                            <View style={styles.inputLabel}>
                                <Text style={[styles.labelColor]}>审批意见</Text>
                            </View>
                            <View>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    placeholder="输入审批意见"
                                    underlineColorAndroid="transparent"
                                    style={{backgroundColor: '#eee', height: 0.2*height, borderRadius: 10}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.actionPanel}>
                        <View style={[styles.actionCell, styles.rightBorder]}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/structure.png')}/>
                            <Text style={[styles.actionColor, styles.paddingLeft]}>流程监控</Text>
                        </View>
                        <TouchableOpacity style={styles.blank} onPress={() => this.goFinishPage()}>
                            <View style={styles.actionCell}>
                                <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/schedule.png')}/>
                                <Text style={[styles.actionColor, styles.paddingLeft]}>查看已完成步骤</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    infoPanel: {
        backgroundColor: '#fff',
        marginBottom: 0.04 * width,
        paddingBottom: 0.04 * width
    },
    flowInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    blank: {
        flex: 1
    },
    inputCell: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02
    },
    inputLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width*0.05,
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    actionPanel: {
        flexDirection: 'row',
        height: 0.12 * width,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    actionCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.07 * height,
    },
    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: '#dcdcdc'
    },
    icon: {
        width:width*0.05,
        height:width*0.05,
    },
    paddingLeft: {
        paddingLeft: 0.02 * width
    },
    labelColor: {
        color: '#5476a1'
    },
    selectorColor: {
        color: '#999'
    },
    actionColor: {
        color: '#216fd0'
    }
});