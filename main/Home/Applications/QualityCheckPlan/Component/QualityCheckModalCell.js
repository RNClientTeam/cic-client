/**
 * Created by Nealyang on 2017/5/3.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import AddOrEditQualityCheck from "../AddOrEditQualityCehck";
const {width} = Dimensions.get('window');
import toast from 'react-native-simple-toast';

export default class QualityCheckModalCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                <Image style={styles.imgStyle}
                       source={this.props.dataSource.img}/>
                <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>{this.props.dataSource.name}</Text>
            </TouchableOpacity>
        )
    }

    skipPage(){
        // if(this.props.dataSource.name === '新建'){
        //     this.props.navigator.push({
        //         name: "AddOrEditQualityCheck",
        //         component: AddOrEditQualityCheck,
        //         params:{
        //             flag:'add'
        //         }
        //     })
        //
        // }else
        if(this.props.dataSource.name === '编辑'){
            this.props.navigator.push({
                name:"AddOrEditQualityCheck",
                component:AddOrEditQualityCheck,
                params:{
                    flag:'edit',
                    jhrwId: this.props.jhrwId,
                    reload:this.props.reloadInfo
                }
            })
        }else if (this.props.dataSource.name === '生效') {
            this.effect(this.props.jhrwId);
        }
        else if(this.props.dataSource.name === '删除'){
            this.delete(this.props.jhrwId);
        }
        this.props.closeModal()
    }

    delete(jhrwId) {
        axios.post('/psmZljcjh/delete', {
            userID: GLOBAL_USERID,
            jhrwId,
            callID:true
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                toast.show('删除成功');
                this.props.reloadInfo();
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }

    effect(jhrwId) {
        axios.post('/psmZljcjh/updateRwzt', {
            userID: GLOBAL_USERID,
            jhrwId,
            callID:true
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                toast.show('生效成功');
                this.props.reloadInfo();
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection:'row',
        height:width*0.14,
        alignItems:'center',
        borderColor:'#ddd',
        borderBottomWidth:1
    },
    imgStyle: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});