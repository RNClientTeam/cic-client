/**
 * Created by Nealyang on 2017/5/3.
 * 确认完成
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TaskProfile from "./Component/TaskProfile"
import ExecuteProfile from "./Component/ExecuteProfile"
import Modification from "./Component/Modification"
import toast from 'react-native-simple-toast'

const {width}  = Dimensions.get('window');

export default class EnsureComplete extends Component{

    constructor(props){
        super(props);
        this.state={
            rwgk:{},
            zxqk:[],
            yqbgqk:[],
            rybgqk:[]
        }
    }

    render(){
        return(
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="确认完成"/>
                <ScrollableTabView locked={true}
                                   tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                                   tabBarActiveTextColor='#51a5f0'
                                   tabBarInactiveTextColor='#3d3d3d'>
                    <TaskProfile submit={this.affirmComplete.bind(this)} data={this.state.rwgk} tabLabel='任务概况' />
                    <ExecuteProfile submit={()=>this.affirmComplete()} data={this.state.zxqk} tabLabel='执行概况' />
                    <Modification submit={()=>this.affirmComplete()} tag="延期" data={this.state.yqbgqk} tabLabel='延期变更' />
                    <Modification submit={()=>this.affirmComplete()} tag="人员" data={this.state.rybgqk} tabLabel='人员变更' />
                </ScrollableTabView>
            </View>
        )
    }

    componentDidMount() {
        axios.get('/psmQqjdjh/preQrwcqk',{
            params:{
                userID:GLOBAL_USERID,
                rwid:this.props.rwid,
                callID:true
            }
        }).then(data=>{
            // TODO
            // data = {
            //     "code": 1,
            //     "data": {
            //         "rwgk": {
            //             "rwnr": "完成设计业务特批",
            //             "eDate": "2017-03-07",
            //             "zrr": "黄顺鹏",
            //             "zt": "已生效",
            //             "sjkssj": "",
            //             "sDate": "2017-03-16"
            //         },
            //         "zxqk": [
            //             {
            //                 "tbsj": "2016-08-09",
            //                 "wcbl": 20,
            //                 "wcqk": "哈哈哈哈"
            //             },
            //             {
            //                 "tbsj": "2016-08-09",
            //                 "wcbl": 35,
            //                 "wcqk": "已完成20%"
            //             }
            //         ],
            //         "yqbgqk": [
            //             {
            //                 "id": "8a8180b85968894201596c4e182b02a1",
            //                 "sqsj": "2017-01-06",
            //                 "yjhjssj": "2017-01-06",
            //                 "bgsm": "1111",
            //                 "sqr": "张彦成",
            //                 "xjhkssj": "2017-01-05",
            //                 "yjhkssj": "2017-01-03",
            //                 "xjhjssj": "2017-01-13"
            //             },
            //             {
            //                 "id": "8a8180b85968894201596c4e182b02a1",
            //                 "sqsj": "2017-01-06",
            //                 "yjhjssj": "2017-01-06",
            //                 "bgsm": "1111",
            //                 "sqr": "张彦成",
            //                 "xjhkssj": "2017-01-05",
            //                 "yjhkssj": "2017-01-03",
            //                 "xjhjssj": "2017-01-13"
            //             }
            //         ],
            //         "rybgqk": [
            //             {
            //                 "id": "8a8180b85aa6579b015aa7f647b20674",
            //                 "yzrr": "石建喜",
            //                 "sqsj": "2017-03-07",
            //                 "bgsm": "1111",
            //                 "sqr": "石建喜",
            //                 "xzrr": "黄顺鹏"
            //             }
            //         ]
            //     },
            //     "message": "成功"
            // };
            if(data.code === 1){
                this.setState({
                    rwgk:data.data.rwgk,
                    zxqk:data.data.zxqk,
                    yqbgqk:data.data.yqbgqk,
                    rybgqk:data.data.rybgqk
                })
            }else{
                toast.show(dasta.message);
            }
        }).catch(err=>{
            if(err) toast.show('服务端连接错误');
        })
    }

    affirmComplete(){
        axios.post('/psmQqjdjh/qrwcqk',{
            userID:GLOBAL_USERID,
            rwid:this.props.rwid,
            callID:true
        }).then(data=>{
            // TODO
            // data = {
            //     "code": 1,
            //     "message": "成功"
            // };
            if(data.code === 1){
                toast.show('提交成功!');
                const that = this;
                setTimeout(function () {
                    that.props.navigator.pop();
                },1000)
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            if(err) toast.show('服务端错误');
        })
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#fdfdfd',
        flex:1
    }
});
