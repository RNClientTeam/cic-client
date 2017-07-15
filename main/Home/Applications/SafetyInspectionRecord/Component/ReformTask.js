/**
 * Created by fan on 2017/05/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text
} from 'react-native'
const {width, height} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import ReformTaskCell from "./ReformTaskCell.js";
import toast from 'react-native-simple-toast'
export default class ReformTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
            </View>
        )
    }


    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ReformTaskCell key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={() => this.props.setModalVisible()}/>
        );
    }


    componentDidMount() {
        this._getData();
    }

    _getData(){
        axios.get('/psmAqjcjh/list4Zgrw',{
            params:{
                userID:GLOBAL_USERID,
                aqjcjlId:this.props.item.aqjcjhId,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
             // TODO
                data = {
                    "code": 1,
                    "data": [
                        {
                            "id": "8a8180d85b45c261015b57a73cf839da",
                            "dqztmc": "整改完成",
                            "zgwcsj": "2017-04-10",
                            "wtlbmc": "一般问题",
                            "zgzrbmmc": "安全管理部",
                            "zgzrrmc": "董术义"
                        },
                        {
                            "id": "000000010015ca9c26f1f",
                            "dqztmc": "新建",
                            "zgwcsj": "2016-12-12",
                            "wtlbmc": "严重问题",
                            "zgzrbmmc": "市场营销三部",
                            "zgzrrmc": "刘海军"
                        }
                    ],
                    "message": "成功"
                };
                if(data.data){
                    this.setState({
                        dataSource:data.data
                    })
                }
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常')
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 10
    }
});
