/**
 * Created by Nealyang on 2017/5/2.
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
import IsTodo from "../../Component/IsTodo";
const {width} = Dimensions.get('window');

export default class CooperateTaskCell extends Component {

    render() {
        return (
            <View style={styles.cooperateTaskCell}>
                {
                    this.props.dataSource.isTodo!='00'&&<IsTodo isTodo={this.props.dataSource.isTodo}/>
                }
                <View style={styles.topView}>
                    <Text style={{color: '#729bdc', fontSize: width * 0.04, flex: 1}}
                          numberOfLines={3}>{this.props.dataSource.rwmc}</Text>
                    <View style={[styles.stateView, {width: this.props.dataSource.ztmc.length * width * 0.04}]}>
                        <Text style={styles.stateText}>{this.props.dataSource.ztmc}</Text>
                    </View>
                    <Text>{this.props.dataSource.zrrmc}</Text>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.leftView}>
                        <View style={styles.leftTopView}>
                            <Text style={styles.leftTopText}>实际/要求完成时间</Text>
                            <Text
                                style={[styles.leftTopText, {marginLeft: width * 0.04}]}>{this.props.dataSource.sjwcsj}{this.props.dataSource.sjwcsj && this.props.dataSource.yqwcsj && '/'}{this.props.dataSource.yqwcsj}</Text>
                        </View>
                        <View style={styles.percentageView}>
                            <View style={styles.processView}>
                                <View
                                    style={[styles.processingView, {width: width * 0.6 * this.props.dataSource.wcbl / 100,}, this.props.dataSource.wcbl == 100 ? {backgroundColor: '#25cf71',} : {backgroundColor: '#ffb432'}]}></View>
                            </View>
                            <Text style={{color: '#c2cddc', fontSize: width * 0.03}}>{this.props.dataSource.wcbl || '0'}%</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rightView} onPress={() => {
                        this.props.setModalVisible()
                    }}>
                        <Image style={styles.imgSty}
                               source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cooperateTaskCell: {
        margin: width * 0.02,
        width: width * 0.96,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ddd"
    },
    topView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        width: width * 0.96,
        paddingVertical: 5
    },
    bottomView: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f6f9fa',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02
    },
    leftView: {
        flex: 5,
        height: width * 0.18,
    },
    rightView: {
        flex: 1,
        height: width * 0.18,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    imgSty: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.01
    },
    leftTopView: {
        flexDirection: 'row',
        height: width * 0.09,
        alignItems: 'center'
    },
    leftTopText: {
        fontSize: width * 0.032,
        color: '#4f74a3'
    },
    percentageView: {
        flexDirection: 'row',
        height: width * 0.09,
        alignItems: 'center'
    },
    processView: {
        backgroundColor: '#dbdada',
        width: width * 0.6,
        height: width * 0.026,
        marginRight: width * 0.02
    },
    processingView: {
        height: width * 0.026,
    },
    stateView: {
        backgroundColor: '#fe9a25',
        height: width * 0.05,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3
    },
    stateText: {color: '#fff', fontSize: width * 0.03},
    iconImg: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.03
    }
});
