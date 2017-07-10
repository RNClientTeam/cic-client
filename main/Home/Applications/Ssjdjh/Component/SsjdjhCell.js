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
import SsjdjhDetail from "./SsjdjhDetail.js";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

const {width} = Dimensions.get('window');

export default class SsjdjhCell extends Component {
    constructor(props){
        super(props);
        this.state={
            diyiwei:parseInt(parseInt(this.props.data.isTodo)/10),
            dierwei:parseInt(parseInt(this.props.data.isTodo)%10)
        }
    }
    render() {
        let first = '',second='';
        if(this.state.diyiwei===0){
            first = null;
        }else if(this.state.diyiwei === 1){
            first = require('../../../../../resource/imgs/home/11.png')
        }
        if(this.state.dierwei===0){
            second = null
        }else if(this.state.dierwei === 1){
            second = require('../../../../../resource/imgs/home/21.png')
        }else if(this.state.dierwei === 2){
            second = require('../../../../../resource/imgs/home/22.png')
        }else if(this.state.dierwei === 3){
            second = require('../../../../../resource/imgs/home/23.png')
        }else if(this.state.dierwei === 4){
            second = require('../../../../../resource/imgs/home/24.png')
        }else if(this.state.dierwei === 5){
            second = require('../../../../../resource/imgs/home/25.png')
        }

        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <View style={styles.iconView}>
                                {this.state.diyiwei===0?null:<Image style={styles.iconImg} source={first}/>}
                                {this.state.dierwei === 0?null:<Image style={styles.iconImg} source={second}/>}
                            </View>
                            {this.props.data.state ?
                                    (this.props.stateBg ?
                                        <View style={[styles.stateView, {backgroundColor: this.props.stateBg}]}>
                                            <Text style={styles.stateText}>{this.props.data.state}</Text>
                                        </View> :
                                        <View style={[styles.stateView]}>
                                            <Text style={styles.stateText}>{this.props.data.state}</Text>
                                        </View>
                                    ) : <View/>}
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
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.fzr}</Text>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.bm}</Text>
                        <Text style={[{width: width * 0.5,paddingLeft:width*0.04}, styles.textStyle]}>{this.props.data.bfb?this.props.data.bfb+'%':''}</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.sjd}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        this.listener = RCTDeviceEventEmitter.addListener('refreshDetail', () => {
            RCTDeviceEventEmitter.emit('successRefresh', (this.props.data));
        });
        this.props.navigator.push({
            component: SsjdjhDetail,
            name: 'SsjdjhDetail',
            params:{
                xmbh:this.props.data.xmbh,
                jhxxId:this.props.data.jhxxId,
                wcbl:this.props.data.bfb,
                xmmc:this.props.data.xmmc,
                sjd:this.props.data.sjd,
                gczxId: this.props.data.gczxId
            }
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
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
    stateText: {color: '#fff', fontSize: width * 0.03},
    iconView:{
        flexDirection:'row'
    },
    iconImg:{
        width:width*0.05,
        height:width*0.05,
        marginRight:width*0.03
    }
});
