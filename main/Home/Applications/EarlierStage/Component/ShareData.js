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
let testData = [
    {
        "tbsj": 1466127293000,
        "fjid": "5975*********************ff386",
        "ms": "施工前请无比阅读并严格遵守手册中的规定",
        "fjmc": "难点问题",
        "tbr": "孙xx"
    },
    {
        "tbsj": 1466134028000,
        "fjid": "5975*********************ff386",
        "ms": "施工前请无比阅读并严格遵守手册中的规定",
        "fjmc": "难点问题",
        "tbr": "孙xx"
    },
    {
        "tbsj": 1466127293000,
        "fjid": "5975*********************ff386",
        "ms": "施工前请无比阅读并严格遵守手册中的规定",
        "fjmc": "难点问题",
        "tbr": "孙xx"
    },
    {
        "tbsj": 1466134028000,
        "fjid": "5975*********************ff386",
        "ms": "施工前请无比阅读并严格遵守手册中的规定",
        "fjmc": "难点问题",
        "tbr": "孙xx"
    }
]
export default class ShareData extends Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
            list: [],
            isLoading: false
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
            this.setState({
                isLoading: false,
                list: testData
            })
        }).catch((error) => {
            this.setState({isLoading:false});
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
        return (this.state.hasMoreData && this.state.list.length !== 0? <LoadMore />: null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }
    loadMore(){
        setTimeout(() => {
            this.setState({
                list: this.state.list.concat(testData)
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
