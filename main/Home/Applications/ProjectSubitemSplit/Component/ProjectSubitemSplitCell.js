/**
 * Created by Nealyang on 2017/5/5.
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

import ProjectSubitemSplitDetail from "./ProjectSubitemSplitDetail";
const {width} = Dimensions.get('window');

export default class ProjectSubitemSplitListCell extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color:'#216fd0',fontSize:width*0.045}}>{this.props.data.xmbh}</Text>
                            <View style={[styles.stateView,{backgroundColor:this.props.stateBg}]}>
                                <Text style={styles.stateText}>{this.props.data.gcfwjjztmc}</Text>
                            </View>
                        </View>
                        <View style={styles.projectName}>
                            <Text>{this.props.data.xmmc}</Text>
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Text>{this.props.data.zxcount}</Text>
                                <Text style={{color:'#999',fontSize:width*0.05}}> > </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.xmjl}</Text>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.ssdw}</Text>
                        {/*<Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.schedule}</Text>*/}
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.cfsj}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage(){
        let cfzt = 0;
        if(this.props.cfzt){
            cfzt = 1;
        }
        this.props.navigator.push({
            component: ProjectSubitemSplitDetail,
            name: 'ProjectSubitemSplitDetail',
            params:{
                cfzt:cfzt,
                xmgh:this.props.data.xmbh,
                cfxxid:this.props.data.id
            }
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
        height: width * 0.2,
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
        height: width * 0.1,
        alignItems: 'center'
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color:'#4f74a3'
    },
    stateView: {
        backgroundColor: '#1f92e2',
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:3,
        paddingRight:3
    },
    stateText: {color: '#fff', fontSize: width * 0.03}


});