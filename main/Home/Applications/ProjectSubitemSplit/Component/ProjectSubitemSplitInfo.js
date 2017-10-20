/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import KeyValue from "../../../../Component/KeyValueLeft";
import toast from 'react-native-simple-toast'
const {width} = Dimensions.get('window');

export default class ProjectSubitemSplitInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            xmmc:'',
            data:{}
        }
    }

    render() {
        return (
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        {this.state.data.xmmc}
                    </Text>
                </View>
                <KeyValue propsKey='所属部门' propsValue={this.state.data.ssdw}/>
                <KeyValue propsKey='项目经理' propsValue={this.state.data.xmjl}/>
                <KeyValue propsKey='合同工期开始时间' propsValue={this.state.data.htkssj}/>
                <KeyValue propsKey='合同工期结束时间' propsValue={this.state.data.htjssj}/>
                <KeyValue propsKey='项目计划开始时间' propsValue={this.state.data.xmkssj}/>
                <KeyValue propsKey='项目计划结束时间' propsValue={this.state.data.xmjssj}/>
            </View>
        )
    }


    componentDidMount() {
      axios.get('/psmGczx/xmDetail',{
          params:{
              userID:GLOBAL_USERID,
              cfxxid:this.props.cfxxid,
              xmgh:this.props.xmgh,
              cfzt:this.props.cfzt,
              callID:true
          }
      }).then(data=>{
          if(data.code === 1){
              this.setState({
                  data:data.data
              })
          }else{
              toast.show(data.message)
          }
      })
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#fff',
        marginTop: width * 0.02,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center',
        paddingTop:13,
        paddingBottom:14
    },
    headerText: {
        fontWeight: '500',
        marginLeft:width*0.02
    }
});