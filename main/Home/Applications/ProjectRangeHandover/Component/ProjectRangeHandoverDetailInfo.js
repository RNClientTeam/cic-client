/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width}  = Dimensions.get('window');
import toast from 'react-native-simple-toast'

export default class ProjectRangeHandoverDetailInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title={this.state.dataSource.length>0?this.state.dataSource[0].zfbgc:''}/>
                {this.renderItem(this.state.dataSource.length>0?this.state.dataSource[0].listMap:[])}
            </View>
        )
    }

    renderItem(list){
        return list.map((item,index)=>{
            return (
                <View style={styles.textContainer} key={index}>
                    <Text style={styles.textStyle}>
                        {item.fxgc}
                    </Text>
                </View>
            )
        })
    }

    componentDidMount() {
        axios.get('/psmGcfw/zfbfxlist',{
            params:{
                userID:GLOBAL_USERID,
                gczxid:this.props.id,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                // TODO
                data = {
                    "code": 1,
                    "data": {
                        "list": [
                            {
                                "zfbgcId": "ZF000007",
                                "zfbgc": "低压负荷临时倒接供电",
                                "listMap": [
                                    {
                                        "ssfsmc": "电力公司",
                                        "bz": "123",
                                        "ghfsms": "甲供",
                                        "xhjgxs": "1",
                                        "id": "8a8180b85a49f3ea015a4aa39585050b",
                                        "fxgc": "临时低压柜安装",
                                        "fxgcId": "FX000032",
                                        "sl": "1",
                                        "hsfsmc": "退回业主"
                                    },
                                    {
                                        "ssfsmc": "",
                                        "bz": "",
                                        "ghfsms": "",
                                        "xhjgxs": "",
                                        "id": "8a8180b85a49f3ea015a4aa39585050c",
                                        "fxgc": "临时低压电缆安装",
                                        "fxgcId": "FX000033",
                                        "sl": "",
                                        "hsfsmc": ""
                                    },
                                    {
                                        "ssfsmc": "",
                                        "bz": "",
                                        "ghfsms": "",
                                        "xhjgxs": "",
                                        "id": "8a8180b85a49f3ea015a4aa39585050d",
                                        "fxgc": "临时箱变安装",
                                        "fxgcId": "FX000034",
                                        "sl": "",
                                        "hsfsmc": ""
                                    }
                                ]
                            }
                        ]
                    },
                    "message": "成功"
                }
                this.setState({
                    dataSource:data.data.list
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            if(err){
                toast.show('服务端异常');
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    textContainer:{
        height:width*0.12,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingLeft:width*0.02,
        justifyContent:'center'
    },
    textStyle:{

    }
});