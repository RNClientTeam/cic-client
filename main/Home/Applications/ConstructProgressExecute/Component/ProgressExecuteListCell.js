/**
 * Created by Nealyang on 2017/4/30.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'

import ProgressExecuteDetail from "../../ConstructProgressExecute/Component/ProgressExecuteDetail.js";

const {width} = Dimensions.get('window');

export default class ProgressExecuteListCell extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color: '#216fd0', fontSize: width * 0.045}}>{this.props.data.xmbh}</Text>
                            <View style={styles.stateView}>
                                <Text style={styles.stateText}>{this.props.data.state}</Text>
                            </View>
                        </View>
                        <View style={styles.projectName}>
                            <Text style={{width:width*0.85,lineHeight:parseInt(width*0.05)}}>{this.props.data.xmmc}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>{this.props.data.count}</Text>
                                <Text style={{color: '#999', fontSize: width * 0.05}}> > </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.zrr}</Text>
                        <Text style={[{width: width * 0.25}, styles.textStyle]}>{this.props.data.zrbm}</Text>
                        <Text style={[{width: width * 0.4,paddingLeft:width*0.04}, styles.textStyle]}>进度{this.props.data.bfb||'0'}%</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{`${this.props.data.jhkssj}／${this.props.data.jhjssj}`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        this.props.navigator.push({
            component: ProgressExecuteDetail,
            name: 'ProgressExecuteDetail'
        });
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
        minHeight: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: width * 0.1,
        alignItems: 'center',
        paddingTop:width*0.01,
        paddingBottom:width*0.01
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color: '#4f74a3',
    },
    stateView: {
        backgroundColor: '#fe9a25',
        width: width * 0.17,
        height: width * 0.05,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03}
});
