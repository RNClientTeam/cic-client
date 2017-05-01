/**
 * Created by Nealyang on 2017/4/30.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import EarlierStageListCell from './EarlierStageListCell'
import LoadMore from '../../../../Component/LoadMore'
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
export default class EarlierStageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataArr,
            loadMore:false
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onRefresh={this._onRefresh}
                refreshing={false}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={0}
                automaticallyAdjustContentInsets={false}
                ref="listview"
                ListFooterComponent={this.state.loadMore?LoadMore:null}
            />
        )
    }

    //refresh
    _onRefresh = () => {
        let template = dataArr.slice(0,4);
        this.setState({dataSource:template})
    };


    _keyExtractor = (item, index) => index;
    _renderItem = ({item, index}) => {
        return (
            <EarlierStageListCell navigator={this.props.navigator} data={item} id={index}/>
        )
    };


    //load more
    _onEndReached = ()=> {
        let template = [
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
        this.setState({
            loadMore:true
        });
        setTimeout(()=>{
            for(let i = 0;i<template.length;i++){
                dataArr.push(template[i]);
            }
            this.setState({
                loadMore:false,
                dataSource:dataArr
            });
        },1000);

    }

}

const styles = StyleSheet.create({});
