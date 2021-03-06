/**
 * Created by zhubin on 17/5/30.
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import AddModification from "./AddModification";

const {width} = Dimensions.get('window');

export default class ModificationTaskCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.modificationTaskCell} onPress={this.skipToDetail.bind(this)}>
                <View style={styles.aboutProject}>
                    <Text style={{color:'#216fd0',fontSize:width*0.045,flex:1,marginRight:10}}>{this.props.data.wtlb}</Text>
                    <View style={styles.stateView}>
                        <Text style={styles.stateText}>{this.props.data.dqztmc}</Text>
                    </View>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={[{width: width * 0.3}, styles.textStyle]}>{this.props.data.zgzrrmc}</Text>
                    <Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.zgzrbmmc}</Text>
                    <Text style={[{width: width * 0.7, marginTop:15}, styles.textStyle]}>{this.props.data.zgwcsj}</Text>
                    <TouchableWithoutFeedback onPress={()=>{this.editBtn(this.props.data.id)}}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')} style={styles.editBtnSty}/>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableOpacity>
        )
    }

    skipToDetail(){
        if (this.props.fromList || this.props.tbzgqk || this.props.checkAndZgrw) {
            this.props.navigator.push({
                name:"AddModification",
                component:AddModification,
                params:{
                    id:this.props.data.id,
                    type:'查看详情'
                }
            });
        }
    }

    editBtn(id) {
        this.props.setModalVisible(id);
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
        justifyContent: 'space-between'
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
    textStyle: {
        color:'#4f74a3'
    },
    stateView: {
        backgroundColor: '#23afe9',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        height:width*0.05
    },
    stateText: {
        color: '#fff',
        fontSize: width * 0.03
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
