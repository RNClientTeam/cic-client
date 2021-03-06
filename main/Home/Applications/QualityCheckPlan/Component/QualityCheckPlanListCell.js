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
    TouchableOpacity,
    Image
} from 'react-native'
import QualityCheckPlanDetail from "../QualityCheckPlanDetail";
const {width} = Dimensions.get('window');

export default class QualityCheckPlanListCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.skipToDetail.bind(this)}>
                <View style={styles.topView}>
                    <View style={styles.topTopView}>
                        <Text style={styles.projectNameStyle}>{this.props.data.rwnr}</Text>
                        <View style={[styles.stateView, {backgroundColor: this.props.bgC}]}>
                            <Text style={styles.stateStyle}>{this.props.data.twztmc}</Text>
                        </View>
                    </View>
                    <Text style={styles.topTaskStyle}>
                        {this.props.data.xmmc} - {this.props.data.zxmc}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.bottomLeftView}>
                        <View style={styles.bottomLeftBottomView}>
                            <Text style={[styles.bottomTextStyle,{marginRight:width*0.03}]}>{this.props.data.xmgh}</Text>
                            <Text style={styles.bottomTextStyle}>{this.props.data.zrrmc}</Text>
                        </View>
                        <Text style={styles.bottomTextStyle}>{this.props.data.jhkssjt+'/'+this.props.data.jhjssjt}</Text>
                    </View>
                    <TouchableOpacity style={styles.bottomRightView} onPress={()=>this.props.showModal()}>
                        <Image style={styles.imgSty}
                               source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    skipToDetail(){
        this.props.navigator.push({
            component: QualityCheckPlanDetail,
            name: 'QualityCheckPlanDetail',
            params: {
                id: this.props.data.id,
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.96,
        marginLeft: width * 0.02,
        marginBottom: width * 0.02
    },
    topView: {
        backgroundColor: '#fff',
        minHeight: width * 0.2,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        paddingBottom: width * 0.02
    },
    bottomView: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        flexDirection:'row'
    },
    topTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    projectNameStyle: {
        flex:1,
        marginRight: 10,
        color: '#216fd0'
    },
    stateView: {
        height: width * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingLeft:5,
        paddingRight:5
    },
    stateStyle: {color: '#fff', fontSize: width * 0.03},
    topTaskStyle: {
        lineHeight: parseInt(width * 0.055),
        fontSize: width * 0.04
    },
    bottomLeftView: {
        flex:5,
    },
    bottomRightView: {
        flex: 1,
        height: width * 0.18,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    imgSty:{
        width:width*0.05,
        height:width*0.05,
        marginRight:width*0.01
    },
    bottomLeftBottomView:{
        flexDirection:'row',
        height:width*0.1,
        alignItems:'center',
        marginBottom:width*0.02
    },
    bottomTextStyle:{
        color:'#4f74a3'
    }
});
