/**
 * Created by fan on 2017/5/2.
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
const {width} = Dimensions.get('window');
import {getTimestamp} from '../../../../Util/Util.js';
let dataArr = [{
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    }];
let tempArr = [{
            infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
            schedule: '70%',
            time: '2017/11/11'
        },
        {
            infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
            schedule: '70%',
            time: '2017/11/11'
        },
        {
            infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
            schedule: '70%',
            time: '2017/11/11'
        },
        {
            infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
            schedule: '70%',
            time: '2017/11/11'
        },
        {
            infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
            schedule: '70%',
            time: '2017/11/11'
        }];
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import TotalImplementationCell from "./TotalImplementationCell.js";
import Reload from "../../../../Component/Reload.js";
import Toast from 'react-native-simple-toast';
export default class TotalImplementation extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
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
        axios.get('/psmQqjdjh/list4zxqk', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            console.log(responseData);
        }).catch((error) => {
            console.log('总执行情况');
            console.log(error);
            Toast.show('服务端连接错误！')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
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
        return (
            <TotalImplementationCell key={rowID} data={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        for (let i = 0;i<tempArr.length;i++){
            this.dataSource.push(tempArr[i])
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
