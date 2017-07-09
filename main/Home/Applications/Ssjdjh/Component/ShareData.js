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
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
            list: []
        }
    }

    componentDidMount() {
        this.getDataFromNet(1);
    }

    getDataFromNet(pageNum, resolve) {
        axios.get('/psmGxzl/list', {
            params: {
                userID: GLOBAL_USERID,
                bsid: this.props.xmbh,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            this.setState({
                list: this.state.list.concat(responseData.data),
                hasMoreData: responseData.data.length === 0 ? false : true
            }, () => {
                resolve && resolve();
                // !this.state.hasMoreData && Toast.show('没有更多数据');
            });
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
                    dataSource={this.ds.cloneWithRows(this.state.list)}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                    renderFooter={this.renderFooter.bind(this)}
                />
                <AddData jhxxId={this.props.jhxxId} navigator={this.props.navigator}/>
            </View>
        )
    }

    onPullRelease(resolve) {
        this.state.list = [];
        this.pageNum = 1;
        this.getDataFromNet(1, resolve);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ShareDataCell navigator={this.props.navigator} key={rowID} dataSource={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData && this.state.list.length !== 0? <LoadMore />: null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }
    loadMore(){
        this.state.hasMoreData && this.getDataFromNet(++this.pageNum);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
