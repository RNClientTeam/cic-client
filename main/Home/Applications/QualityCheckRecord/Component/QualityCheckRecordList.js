/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import LoadMore from "../../../../Component/LoadMore";
import Reload from "../../../../Component/Reload";
import QualityCheckRecordListCell from "./QualityCheckRecordListCell";
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';

export default class QualityCheckRecordList extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [
            {
                number: 'CX_DS16052',
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            },
            {
                number: 'CX_DS16052',
                state: '已生效',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            },
            {
                number: 'CX_DS16052',
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            }, {
                number: 'CX_DS16052',
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            }, {
                number: 'CX_DS16052',
                state: '已生效',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            }
        ];
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
        let bgC = '#21cf7f';
        if (item.state === '已生效') {
            bgC = '#fe9a25'
        }
        return (
            <QualityCheckRecordListCell  showModal={()=>this.props.showModal()} bgC={bgC} key={rowID} navigator={this.props.navigator} data={item}/>
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
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            },
            {
                number: 'CX_DS16052',
                state: '已生效',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            },
            {
                number: 'CX_DS16052',
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            }, {
                number: 'CX_DS16052',
                state: '新建任务',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            }, {
                number: 'CX_DS16052',
                state: '已生效',
                task: '人大技术学院配电增容改造技术咨询',
                principal: '杨磊',
                time: '2017/11/11-2017/12/12',
                projectName: '质量检查任务二'
            },
        ];

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
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        position: 'relative',
        zIndex: -1
    }
});