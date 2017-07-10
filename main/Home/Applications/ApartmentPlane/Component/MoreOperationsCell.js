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

const {width} = Dimensions.get('window');
import CompletionForm from './CompletionForm.js';
import toast from 'react-native-simple-toast'
import ApartmentPlaneDetail from "./ApartmentPlaneDetail";
import EditApartmentPlane from "./EditApartmentPlane";
export default class MoreOperationsCell extends Component {
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
        if (this.props.dataSource.name === '填报进展') {
            this.props.navigator.push({
                component: CompletionForm,
                name: 'CompletionForm'
            });
        }else if(this.props.dataSource.name === '删除'){
            axios.post('/psmBmjh/delete',{
                userID:GLOBAL_USERID,
                jhId:this.props.operatingItem.id,
                callID:true
            }).then(data=>{
                if(data.code === 1){
                    toast.show('删除成功');
                }
            })
        }else if(this.props.dataSource.name === '查看详情'){
            this.props.navigator.push({
                component:ApartmentPlaneDetail,
                name:"ApartmentPlaneDetail",
                params:{
                    id:this.props.operatingItem.id
                }
            })
        }else if(this.props.dataSource.name === '修改'){
            this.props.navigator.push({
                component:EditApartmentPlane,
                name:"EditApartmentPlane",
                params:{
                    id:this.props.operatingItem.id
                }
            })
        }
        this.props.closeModal();
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
