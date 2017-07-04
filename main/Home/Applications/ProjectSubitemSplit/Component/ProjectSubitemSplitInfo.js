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
            xmmc:''
        }
    }

    render() {
        return (
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText} numberOfLines={1}>
                        {this.state.xmmc}
                    </Text>
                </View>
                {this.renderKV(this.state.dataSource)}
            </View>
        )
    }

    renderKV = (dataSource)=>{
        let tpl = [];
        for(let i = 0;i<dataSource.length;i++){
            tpl.push(
                <KeyValue key={i} propsKey={dataSource[i].key} propsValue={dataSource[i].value}/>
            )
        }
        return tpl;
    };

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
        // TODO
          if(data.code === 1){
              data = {
                  "code": 1,
                  "data": {
                      "xmjl": "贾世坤",
                      "xmjssj": "2015-09-30 00:00:00",
                      "htkssj": "2015-03-01",
                      "xmmc": "CX_DS14241-15013 - 平谷胡营路标准化改造",
                      "htjssj": "2015-09-30",
                      "ssdw": "市场营销一部",
                      "xmkssj": "2015-03-01 00:00:00"
                  },
                  "message": "成功"
              };
              let temp = [];
              for(let i in data.data){
                  if(i ==='xmmc'){
                      this.setState({
                          xmmc:data.data[i]
                      })
                  }else if(i==='ssdw'){
                      temp.push({key:'所属部门',value:data.data[i]});
                  }else if(i==='xmjl'){
                      temp.push({key:'项目经理',value:data.data[i]});
                  }else if(i==='htjssj'){
                      temp.push({key:'合同结束时间',value:data.data[i]});
                  }else if(i==='htkssj'){
                      temp.push({key:'合同开始时间',value:data.data[i]});
                  }else if(i ==='xmjssj'){
                      temp.push({key:'项目结束时间',value:data.data[i]});
                  }else if(i==='xmkssj'){
                      temp.push({key:'项目开始时间',value:data.data[i]});
                  }
              }
              this.setState({
                  dataSource:temp
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
        height: width * 0.12,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center'
    },
    headerText: {
        fontWeight: '500',
        marginLeft:width*0.02
    }
});