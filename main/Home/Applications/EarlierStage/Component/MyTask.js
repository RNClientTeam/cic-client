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
let dataArr = [{
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
let tempArr = [{
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
import SchedulePlanCell from "./SchedulePlanCell.js";
import Reload from "../../../../Component/Reload.js";
export default class MyTask extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.props.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        //do refresh
        this.props.refresh(()=>{resolve()})
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <SchedulePlanCell xmbh={this.props.xmbh} key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={(rwid,sDate,eDate) => {this.props.setModalVisible(rwid,sDate,eDate);}}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData&&this.props.dataSource.length>0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData:this.props.getMoreData()
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
