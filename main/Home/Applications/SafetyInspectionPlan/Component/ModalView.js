/**
 * Created by Nealyang on 2017/5/1.
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
import {getCurrentDate} from '../../../../Util/Util'
import ChoiceDate from "../../../../Component/ChoiceDate";
const {width, height} = Dimensions.get('window');
const Platform = require('Platform');
import ModalDropdown from 'react-native-modal-dropdown';
export default class ModalView extends Component {
    constructor(props){
        super(props);
        this.jhlxMap = {
            100: '我的待办',
            200: '我参与的',
            300: '全部计划',
        };

        this.state={
            ksrq: this.props.ksrq,
            jsrq: this.props.jsrq,
            jhlx: this.props.jhlx,
            jhlxmc: this.jhlxMap[this.props.jhlx],
        }
    }

    componentDidMount() {
        // 获取计划类型
        this.getDict();
    }

    render() {
        return (
            <View style={[styles.earlierStageListModalView,Platform.OS === 'android' ?{top:44}:{top:64}]}>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>开始时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate
                            showDate={this.state.ksrq}
                            changeDate={(date)=>{this.setState({ksrq: date});}}/>
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>

                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>结束时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate
                            showDate={this.state.jsrq}
                            changeDate={(date)=>{this.setState({jsrq: date});}}/>
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>计划类型</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.jhlxmcList}
                            animated={true}
                            defaultValue={this.state.jhlxmc}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={index=>{
                                this.setState({
                                    jhlx: this.state.jhlxList[index]
                                })
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                {/*<View style={styles.containerStyle}>*/}
                    {/*<Text style={styles.nameStyle}>当前状态</Text>*/}
                    {/*<View style={styles.indicateView}>*/}
                        {/*<ModalDropdown*/}
                            {/*options={['任务 1', '任务 2','任务 3','任务 4']}*/}
                            {/*animated={true}*/}
                            {/*defaultValue={this.state.currentStatus}*/}
                            {/*style={styles.modalDropDown}*/}
                            {/*textStyle={styles.modalDropDownText}*/}
                            {/*dropdownStyle={styles.dropdownStyle}*/}
                            {/*onSelect={(a)=>{console.log(a)}}*/}
                            {/*showsVerticalScrollIndicator={false}*/}
                        {/*/>*/}
                        {/*<Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={[styles.clickButton,{backgroundColor:'#dbdada'}]}
                        onPress={
                            () => this.props.closeModal(2, this.state.ksrq, this.state.jsrq, this.state.jhlx)
                        }>
                        <Text style={{color:'#3d3d3d',fontWeight:'200'}}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.clickButton,{backgroundColor:'#216fd0'}]}
                        onPress={
                            () => this.props.closeModal(1, this.state.ksrq, this.state.jsrq, this.state.jhlx)
                        }>
                        <Text style={{color:'#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getDict() {
        let jhlxList = [100, 200, 300];
        let jhlxmcList = ['我的待办', '我参与的', '全部计划'];
        this.setState({
            jhlxList,
            jhlxmcList,
        });
    }
}

const styles = StyleSheet.create({
    earlierStageListModalView: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position:'absolute',
        width:width,
        zIndex:3,
    },
    containerStyle:{
        backgroundColor:'#fff',
        height:width*0.12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    nameStyle:{
        color:'#216fd0',
        fontSize:width*0.035
    },
    indicateView:{
      flexDirection:'row',
        alignItems:'center'
    },
    indicateImage:{
        width:width*0.02,
        height:width*0.02,
        marginLeft:width*0.02
    },
    modalDropDownText:{
        fontSize:width*0.035,
    },
    dropdownStyle:{
        width:width*0.55,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonView:{
        height:width*0.3,
        width:width,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    clickButton:{
        width:width*0.3,
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    }
});
