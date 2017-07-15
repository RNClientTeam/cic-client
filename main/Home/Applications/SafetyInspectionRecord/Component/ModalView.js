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
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.kssj,
            endDate: this.props.jssj,
            planType: this.props.jhlx,
            currentStatus: '新建任务'
        }
    }

    render() {
        return (
            <View style={[styles.earlierStageListModalView, Platform.OS === 'android' ? {top: 44} : {top: 64}]}>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>开始时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.startDate}
                                    changeDate={(date) => this.setState({startDate: date})}/>
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>

                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>结束时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.endDate}
                                    changeDate={(date) => this.setState({endDate: date})}/>
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>计划类型</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={['所有计划', '我主责的', '我的待办']}
                            animated={true}
                            defaultValue={this.state.planType}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a) => {
                                this.setState({
                                    planType: ['所有计划', '我主责的', '我的待办'][a]
                                })
                            }

                            } showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}
                               source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
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
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#dbdada'}]}
                                      onPress={() => this.props.closeModal()}>
                        <Text style={{color: '#3d3d3d', fontWeight: '200'}}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickButton, {backgroundColor: '#216fd0'}]}
                                      onPress={() => {
                                          this.props.closeModal();
                                          this.props.changeFilter(this.state.startDate, this.state.endDate, this.state.planType)
                                      }}>
                        <Text style={{color: '#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earlierStageListModalView: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'absolute',
        width: width,
        zIndex: 3,
    },
    containerStyle: {
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
    modalDropDownText: {
        fontSize: width * 0.035,
    },
    dropdownStyle: {
        width: width * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
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
