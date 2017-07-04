/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
const {width}  = Dimensions.get('window');
import toast from 'react-native-simple-toast';
var imgSource = [
    require('../../../../../resource/imgs/user/push_in.png'),
    require('../../../../../resource/imgs/home/applications/down.png')
];

export default class ProjectRangeHandoverDetailInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            sectionSelected: []
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title={this.state.dataSource.length>0?this.state.dataSource[0].zfbgc:''}/>
                <ScrollView>
                    {this.renderSection(this.state.dataSource.length>0?this.state.dataSource:[])}
                    <View style={{flex:1,backgroundColor:'#ddd'}}>
                    </View>
                </ScrollView>
            </View>
        )
    }

    pressHeader(index) {
        this.state.sectionSelected[index] = !this.state.sectionSelected[index];
        this.setState({sectionSelected:this.state.sectionSelected});
    }

    renderSection(list){
        return list.map((item,index)=>{
            return (
                <View key={`${index}+${item.zfbgc}`}>
                    <TouchableOpacity onPress={this.pressHeader.bind(this, index)}
                        style={styles.headerView}>
                        <Text style={styles.headerTitle}>{item.zfbgc}</Text>
                        <Image source={this.state.sectionSelected[index]?imgSource[1]:imgSource[0]} style={styles.imgSty} resizeMode="contain"/>
                    </TouchableOpacity>
                    {this.state.sectionSelected[index] && this.renderRow(item.listMap)}
                    <View style={{width:width,height:12,backgroundColor:'#ddd'}}>
                    </View>
                </View>
            );
        })
    }

    renderRow(listMap) {
        return listMap.map((item, index) => {
            return (
                <View style={styles.textContainer} key={index}>
                    <Text style={styles.textStyle}>
                        {item.fxgc}
                    </Text>
                </View>
            )
        });
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
                            },
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
                            },
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
                            },
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
                            },
                        ]
                    },
                    "message": "成功"
                }
                data.data.list.forEach(() => {
                    this.state.sectionSelected.push(true);
                });
                this.setState({
                    dataSource:data.data.list,
                    sectionSelected: this.state.sectionSelected
                });
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            console.log(err);
            if(err){
                toast.show('服务端异常');
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f0f0'
    },
    textContainer:{
        height:width*0.13,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        paddingLeft:35,
        justifyContent:'center',
    },
    textStyle:{
        color:'#3d3d3d',
        fontSize: 15
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    headerTitle: {
        fontSize: 15,
        color: '#216fd0'
    },
    imgSty: {
        width:15,height:15
    }
});
