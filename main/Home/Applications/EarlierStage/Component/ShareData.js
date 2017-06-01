/**
 * Created by Nealyang on 2017/5/2.
 * 共享资料
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
const {width}  = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import ShareDataCell from "./ShareDataCell";
import AddData from './AddData'
import {getTimestamp} from '../../../../Util/Util.js';
import Toast from 'react-native-simple-toast';
export default class ShareData extends Component{
    constructor(props) {
        super(props);
        this.dataSource = [
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
        ];
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    getDataFromNet() {
        this.setState({
            isLoading: true,
            pageNum: 1,
        });
        axios.get('/psmGxzl/list', {
            params: {
                userID: GLOBAL_USERID,
                bsid: this.props.xmbh,
                callID: getTimestamp()
            }
        }).then((responseData) => {

        }).catch((error) => {
            Toast.show('服务端连接错误！')
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                />
                <AddData navigator={this.props.navigator}/>
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
        return (
            <ShareDataCell navigator={this.props.navigator} key={rowID} dataSource={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore />: null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }
    loadMore(){
        let a = [
            {dataName: "共享资料一", author: '杨磊', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '婷婷', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '朱斌', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '张帆', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '哈哈', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '肚肚', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},

        ];

        for (let i = 0;i<a.length;i++){
            this.dataSource.push(a[i])
        }

        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
