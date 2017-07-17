/**
 * Created by fan on 2017/05/02.
 * 前期进度计划详情页 - 总执行情况cell
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
const {width} = Dimensions.get('window');

export default class TotalImplementationCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <Text style={styles.Time}>{this.props.data.tbsj}</Text>
                        <View style={styles.progressView}>
                            <Text style={{color:'#216fd0',fontSize:13,marginRight:10}}>完成进度</Text>
                            <View style={styles.stateView}>
                                <View style={[styles.compView, {width:width*0.55*this.props.data.wcbl/100}, this.props.data.wcbl==100&&{backgroundColor:'#25cf71'}]}></View>
                            </View>
                            <Text style={{fontSize:13}}>{this.props.data.wcbl||'0'}%</Text>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={styles.infoStyl}>{this.props.data.wcqk}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {

    }

    editPress() {

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
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        paddingHorizontal: width * 0.01,
        paddingVertical: 10
    },
    Time: {
        color: '#216fd0',
        marginTop: 16,
        marginBottom: 16
    },
    stateView: {
        backgroundColor: '#f2f2f2',
        width:width*0.55,
        height:width*0.035,
        marginRight: 15
    },
    progressView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    compView: {
        backgroundColor: '#ffb432',
        height:width*0.035,
    },
    infoStyl: {
        color: '#3d3d3d',
        fontSize: 14,
        lineHeight: 24
    }
});
