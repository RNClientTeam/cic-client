/**
 * Created by fan on 2017/05/02.
 * 前期进度计划详情页 - 进度计划cell
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import IsTodo from "../../Component/IsTodo";
const {width} = Dimensions.get('window');

export default class SchedulePlanCell extends Component {
    render() {
        return (
            <View style={styles.earlierStageListCell}>
                <View style={styles.aboutProject}>
                    {this.props.data.isTodo!='00' &&
                    <View style={styles.numState}>
                        <IsTodo isTodo={this.props.data.isTodo}/>
                    </View>}
                    <View style={[styles.stateView,{width:this.props.data.ztmc.length*width*0.04}]}>
                        <Text style={styles.stateText}>{this.props.data.ztmc}</Text>
                    </View>
                    <Text style={styles.projectName}>{this.props.data.rwmc}</Text>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={[styles.textStyle]}>{this.props.data.zrr}</Text>
                    <Text style={[{marginLeft:width*0.05,marginRight:width*0.05}, styles.textStyle]}>{this.props.data.zrbm}</Text>
                    <Text style={[ styles.textStyle]}>{this.props.data.wcbl||'0'}%</Text>
                    <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.sDate}{this.props.data.sDate&&this.props.data.eDate&&'/'}{this.props.data.eDate}</Text>
                    <TouchableOpacity onPress={this.skipPage.bind(this,this.props.data.rwid,this.props.data.sDate,this.props.data.eDate)} style={styles.editTouch}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                            style={styles.editImg} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    skipPage(rwid,sDate,eDate) {
        this.props.setModalVisible(rwid,sDate,eDate)
    }

}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        paddingVertical: 5
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.1,
        alignItems: 'center',
    },
    projectName: {
        lineHeight: 21
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color:'#4f74a3'
    },
    stateView: {
        backgroundColor: '#fe9a25',
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        alignSelf: 'flex-end'
    },
    stateText: {color: '#fff', fontSize: width * 0.03},
    editTouch: {
        position: 'absolute',
        top: 22,
        right: 18,
    },
    editImg: {
        width: 22,
        height: 25
    },
    iconView:{
        flexDirection:'row'
    },
    iconImg:{
        width:width*0.05,
        height:width*0.05,
        marginRight:width*0.03
    }

});
