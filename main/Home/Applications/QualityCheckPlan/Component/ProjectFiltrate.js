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
    Image,
    TouchableOpacity
} from 'react-native'
import ChoiceDate from "../../../../Component/ChoiceDate";

const {width, height} = Dimensions.get('window');
const Platform = require('Platform');

export default class ProjectFiltrate extends Component {

    constructor(props){
        super(props);
        this.state={
            kssj: this.props.kssj,
            jssj: this.props.jssj,
        }
    }

    render() {
        return (
            <View style={[styles.containerStyle, Platform.OS === 'android' ? {top: 44} : {top: 64}]}>
                <View style={styles.cellStyle}>
                    <Text style={styles.nameStyle}>开始时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.kssj} changeDate={(date)=>{this.setState({kssj:date})}}/>
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>

                </View>
                <View style={styles.cellStyle}>
                    <Text style={styles.nameStyle}>结束时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.jssj} changeDate={(date)=>{this.setState({jssj:date})}}/>
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#dbdada'}]}
                                      onPress={() => this.props.closeFiltrate(0, '', '')}>
                        <Text>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#216fd0'}]}
                                      onPress={() => this.props.closeFiltrate(1, this.state.kssj,this.state.jssj)}>
                        <Text style={{color: '#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'absolute',
        width: width,
        zIndex: 3,
    },
    cellStyle: {
        backgroundColor: '#fff',
        height: width * 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    nameStyle: {
        color: '#216fd0',
        fontSize: width * 0.035
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02
    },
    buttonView: {
        height: width * 0.3,
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    clickButton: {
        width: width * 0.3,
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
});
