/**
 * Created by Nealyang on 2017/5/5.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    ListView
} from 'react-native'
const {width} = Dimensions.get('window');
import ProjectSubitemSplitListCell from './ProjectSubitemSplitCell'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import Reload from "../../../../Component/Reload";
export default class ProjectSubitemSplitSearchHeader extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [
            {
                number: 'CX_DS16052',
                state: '拆分审核中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS16051',
                state: '新建',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS17051',
                state: '已交接',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS66051',
                state: '已拆分子项',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS36051',
                state: '已拆分子项',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            }
        ];
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }

    render() {
        return (
            <View style={styles.psHeader}>
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
        let stateBg = '#fe9a25';
        if(item.state === '新建'){
            stateBg='#29b0f5';
        }else if(item.state === '已拆分子项'){
            stateBg='#1f92e2';
        }else if(item.state === '已交接'){
            stateBg='#18d0ca';
        }
        return (
            <ProjectSubitemSplitListCell stateBg={stateBg} key={rowID} navigator={this.props.navigator} data={item}/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        let a = [
            {
                number: 'CX_DS16052',
                state: '已交接',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS16051',
                state: '已交接',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS17051',
                state: '已拆分子项',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS66051',
                state: '拆分审核中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS36051',
                state: '新建',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10%',
                time: '2017/11/11-2017/12/12'
            }];

        for (let i = 0; i < a.length; i++) {
            this.dataSource.push(a[i])
        }

        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
    }
}

const styles = StyleSheet.create({
    psHeader: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});