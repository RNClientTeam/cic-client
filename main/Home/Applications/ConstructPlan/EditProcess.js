/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import EditProcessHeader from "./Component/EditProcessHeader";
import KeyValueRight from "../../../Component/KeyValueRight";
import KeyTime from "../../../Component/KeyTime";
import KeyPercentage from "../../../Component/KeyPercentage";
import Remark from "../../../Component/Remark";
import BottomSaveButton from "../../../Component/BottomSaveButton";
const {width}  = Dimensions.get('window');
import toast from 'react-native-simple-toast'
export default class EditProcess extends Component{
    constructor(props){
        super(props);
        this.state={
            wcqk:'',
            wcbl:''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="填报项目进展"/>
                <ScrollView>
                    <EditProcessHeader xmmc={this.props.currentItem.rwmc}/>
                    <KeyValueRight propKey="负责人" readOnly={true} defaultValue={this.props.currentItem.zrrmc}/>
                    <KeyValueRight propKey="当前状态" readOnly={true} defaultValue={this.props.currentItem.rwztmc}/>
                    <KeyValueRight propKey="开始时间" readOnly={true} defaultValue={this.props.currentItem.kssj}/>
                    <KeyValueRight propKey="结束时间" readOnly={true} defaultValue={this.props.currentItem.wcsj}/>
                    <KeyValueRight propKey="工作地点" readOnly={true} defaultValue={this.props.currentItem.sgdd}/>
                    <KeyValueRight propKey="参与人员" readOnly={true} defaultValue={this.props.currentItem.sgcymc}/>
                    <KeyPercentage propKey="完成比例" textChange={(txt)=>this.setState({wcbl:txt})} readOnly={false}/>
                    <Remark textChange={(txt)=>this.setState({wcqk:txt})} propKey="完成情况" remark=""/>
                </ScrollView>
                <BottomSaveButton submit={()=>this.submit()}/>
            </View>
        )
    }

    submit(){
        if(this.state.wcbl===''){
            toast.show('请填写完成比例');
        }else if(parseInt(this.state.wcbl)<0 || parseInt(this.state.wcbl)>100){
            toast.show('请填写合法的比例')
        }else if(this.state.wcqk === ''){
            toast.show('请填写完成情况说明');
        }else{
            axios.post('/psmSgrjh/rjhWcqk',{
                userID:GLOBAL_USERID,
                rwid:this.props.currentItem.rwid,
                jhrwid:this.props.currentItem.jhrwid,
                jhxxid:this.props.currentItem.jhxxid,
                wcqk:this.state.wcqk,
                wcbl:this.state.wcbl,
                callID:true
            }).then(data=>{
                if(data.code ===1){
                    toast.show('填报成功');
                    let that  = this;
                    setTimeout(function () {
                        that.navigator.pop();
                        that.props.reload();
                    },500)
                }else{
                    toast.show(data.message)
                }
            }).catch(err=>{
                if(err)
                    toast.show('服务端异常');
            })
        }

    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});