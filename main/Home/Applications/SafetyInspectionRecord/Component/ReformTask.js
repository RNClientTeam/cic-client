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
let dataArr = [{
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    }];
let tempArr = [{
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    },
    {
        question: '一般问题',
        state: '新建',
        principal: '贾世超',
        department: '市场营销一部',
        time: '2017/11/11'
    }];
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import ReformTaskCell from "./ReformTaskCell.js";
import Reload from "../../../../Component/Reload.js";
export default class ReformTask extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
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
            <ReformTaskCell key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={() => this.props.setModalVisible()}/>
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
        backgroundColor: '#f2f2f2',
        paddingTop: 10
    }
});
