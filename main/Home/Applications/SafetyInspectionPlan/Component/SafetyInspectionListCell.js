/**
 * Created by fan on 2017/05/16.
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
import SafetyInspectionDetail from './SafetyInspectionDetail.js';
export default class SafetyInspectionListCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color:'#216fd0',fontSize:width*0.045,flex:1,marginRight:10}}>{this.props.data.aqjcjhmc}</Text>
                            <Text style={[styles.stateText, this.props.data.ztmc==='新建任务'&&{backgroundColor:'#18d0ca'}]}>{this.props.data.ztmc}</Text>
                        </View>
                        <Text style={styles.projectName}>{this.props.data.xmmc} - {this.props.data.gczxmc}</Text>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <View style={{flexDirection: 'row', paddingBottom: 12}}>
                            <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.zrr}</Text>
                            <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.xmbh}</Text>
                            <TouchableOpacity style={styles.editTouch} onPress={()=>this.props.setModalVisible()}>
                                <Image style={styles.editImg}
                                       source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width*0.7}}>
                            <Text style={styles.textStyle}>{this.props.data.jhkssj+'/'+this.props.data.jhjssj}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        this.props.navigator.push({
            component: SafetyInspectionDetail,
            name: 'SafetyInspectionDetail',
            params: {
                id: this.props.data.id,
                gxzxmc: this.props.data.gxzxmc,
            }
        })
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
        paddingLeft: 10,
        paddingRight: 10
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingVertical: 12
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8
    },
    projectName: {
        lineHeight: 21,
        paddingBottom: 15,
        fontSize: 14,
        color: '#3d3d3d'
    },
    textStyle: {
        color:'#4f74a3',
        fontSize: 14
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03,
        padding: 3,
        borderRadius:3,
        overflow:'hidden',
        backgroundColor: '#fe9a25',
    },
    editTouch: {
        position: 'absolute',
        right: 18,
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        zIndex:3
    },
    editImg: {
        width: 22,
        height: 25,
        marginBottom:4
    },

});
