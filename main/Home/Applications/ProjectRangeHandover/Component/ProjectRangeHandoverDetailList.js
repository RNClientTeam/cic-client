/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import ApplicationSubitemCell from "../../Component/ApplicationSubitemCell";
const {width}  = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import toast from 'react-native-simple-toast'
import Reload from "../../../../Component/Reload";
export default class ProjectRangeHandoverDetailList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            hasMoreData: true,
            dataSource:[],
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render() {
        return (
            <View style={styles.ProjectSubitemSplitDetailList}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        //do refresh
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    renderRow(item, sectionID, rowID, highlightRow) {

        let stateBg = '#fe9a25';
        if(item.state === '新建'){
            stateBg='#29b0f5';
        }else if(item.state === '已拆分子项'){
            stateBg='#1f92e2';
        }else if(item.state === '已生效'){
            stateBg='#18d0ca';
        }
        return (
            <ApplicationSubitemCell target="ProjectRangeHandoverDetailInfo"
                                    proName={this.props.proName}
                                    proNum={this.props.proNum}
                                    stateBg={stateBg}
                                    key={rowID}
                                    navigator={this.props.navigator}
                                    data={item}/>
        );
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    componentDidMount() {
        this.getDataFromNet()
    }

    getDataFromNet(){

        axios.get('/psmGcfw/xmzxlist',{
            params:{
                userID:GLOBAL_USERID,
                cfxxid:this.props.cfxxid,
                callID:true
            }
        }).then(data=>{

            if(data.code === 1){
                data = {
                    "code": 1,
                    "data": {
                        "list": [
                            {
                                "id": "8a8180b85a49f3ea015a4a9a1b0403e6",
                                "jhkssj": "2016-01-19",
                                "gcjd": "Grace-Sub-Project-2",
                                "jhztmc": "已生效",
                                "jhjssj": "2016-01-19",
                                "jdqz": 0.33,
                                "ssjlmc": "贾世坤"
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
                toast.show('服务端异常')
            }
        })
    }

}

const styles = StyleSheet.create({
    ProjectSubitemSplitDetailList:{
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});