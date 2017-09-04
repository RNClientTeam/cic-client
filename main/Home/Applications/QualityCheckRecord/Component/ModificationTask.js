/**
 * Created by zhubin on 17/5/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import ModificationTaskCell from './ModificationTaskCell'

const {width} = Dimensions.get('window');
let dataArr = [
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    },
    {
        problem: '一般问题',
        state: '执行中',
        department: '营销一部',
        principal: '杨磊',
        time: '2017/11/11'
    }
];
let tempArr = dataArr;

export default class ModificationTask extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource)
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
            <ModificationTaskCell key={rowID} data={item} navigator={this.props.navigator}/>
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
        marginTop: 0.02 * width
    }
});
