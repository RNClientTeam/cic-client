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
    Image,
    TouchableWithoutFeedback
} from 'react-native';
const {width, height} = Dimensions.get('window');
import AccomplishProgress from './AccomplishProgress.js';
export default class ReformTaskCell extends Component {
    render() {
        return (
            <View style={styles.modificationTaskCell}>
                <TouchableOpacity  onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <Text style={{color:'#216fd0',fontSize:width*0.04, flex:1,marginRight:10}}>{this.props.data.wtlbmc}</Text>
                        <View style={styles.stateView}>
                            <Text style={styles.stateText}>{this.props.data.dqztmc}</Text>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.3}, styles.textStyle]}>{this.props.data.zgzrrmc}</Text>
                        <Text style={[{width: width * 0.5}, styles.textStyle]} numberOfLines={1}>{this.props.data.zgzrbmmc}</Text>
                        <Text style={[{width: width * 0.7, marginTop:15}, styles.textStyle]}>{this.props.data.zgwcsj}</Text>
                        <TouchableWithoutFeedback onPress={this.editBtn.bind(this)}>
                            <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')} style={styles.editBtnSty}/>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        if (this.props.tbzgqk||this.props.checkAndZgrw||this.props.fromList) {
            this.props.navigator.push({
                component: AccomplishProgress,
                name: 'AccomplishProgress',
                params:{
                    readOnly:true,
                    id:this.props.data.id,
                    type:'查看详情'
                }
            });
        }
    }

    editBtn(){
        this.props.showAuthList();
    }
}

const styles = StyleSheet.create({
    modificationTaskCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 10
    },
    projectName: {
        height: width * 0.1,
        lineHeight: 21
    },
    textStyle: {
        color:'#4f74a3',
        fontSize:width*0.035
    },
    stateView: {
        backgroundColor: '#23afe9',
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03
    },
    blank: {
        flex: 1
    },
    editImg: {
        width: 22,
        height: 25
    },
    editBtnSty: {
        position: 'absolute',
        top: 15,
        right: 20,
        width: 22,
        height: 22
    }
});
