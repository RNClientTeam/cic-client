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
export default class EarlierStageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
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
                    number: 'CX_DS16052',
                    state: '执行中',
                    planName: '人大技术学院配电增容改造技术咨询',
                    contentNum: 18,
                    principal: '杨磊',
                    department: '技术部',
                    schedule: '10%',
                    time: '2017/11/11-2017/12/12'
                }
            ]
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _keyExtractor = (item, index) =>item.id;

    _renderItem = ({item}) => (
        <EarlierStageListCell data={item} key={item.id}/>
    )


}

const styles = StyleSheet.create({});
