/**
 * Created by zhubin on 17/5/24.
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
let dataArr = [
    {
        number: 'CX_DS16052',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS16051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS17051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS66051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS36051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    }];
let tempArr = [
    {
        number: 'CX_DS16052',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS16051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS17051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS66051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    },
    {
        number: 'CX_DS36051',
        state: '执行中',
        planName: '人大技术学院配电增容改造技术咨询',
        contentNum: 18,
        principal: '杨磊',
        department: '技术部',
        schedule: '10%',
        time: '2017/11/11-2017/12/12'
    }];
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import DepartmentExecuteListCell from "./DepartmentExecuteListCell.js";
import Reload from "../../../../Component/Reload.js";
export default class DepartmentExecuteList extends Component {
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
            <DepartmentExecuteListCell key={rowID} data={item} navigator={this.props.navigator}
                                    setModalVisible={this.props.showMoreActions}/>
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
