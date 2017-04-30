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

export default class EarlierStageList extends Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:[
                {number:'CX_DS16052',state:'执行中',planName:'人大技术学院配电增容改造技术咨询',contentNum:18}
            ]
        }
    }

    render() {
        return (
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
        )
    }
}

const styles = StyleSheet.create({});
