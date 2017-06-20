/**
 * Created by zhubin on 17/5/8.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    SectionList,
    ListView,
    Modal,
    StyleSheet,
    Dimensions
} from 'react-native';

import ApplicationListCell from '../../Component/ApplicationListCell'
import {PullList} from 'react-native-pull'
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"


const {width, height} = Dimensions.get('window');

export default class ProgressPlanList extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                number: 'CX_DS16052',
                state: '执行中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS16051',
                state: '执行中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS17051',
                state: '执行中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS66051',
                state: '执行中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10',
                time: '2017/11/11-2017/12/12'
            },
            {
                number: 'CX_DS36051',
                state: '执行中',
                planName: '人大技术学院配电增容改造技术咨询',
                contentNum: 18,
                principal: '杨磊',
                department: '技术部',
                schedule: '10',
                time: '2017/11/11-2017/12/12'
            }
        ];
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={() => this.topIndicatorRender()}
                    topIndicatorHeight={60}
                    enableEmptySections={true}
                    dataSource={this.state.list.cloneWithRows(this.convert(this.props.dataSource))}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
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
            <ApplicationListCell key={rowID} navigator={this.props.navigator} data={item} target="ProgressPlanDetail"/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length>0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    convert(source) {
        if (!source)
            return [];
        return source.map((item) => {
            let target = {};
            target.xmbh = item.xmbh;
            target.state = item.state;
            target.xmmc = item.planName;
            target.fzr = item.principal;
            target.bm = item.department;
            target.bfb = item.schedule;
            target.sjd = item.time;
            return target
        })
    }

    loadMore() {

        // for (let i = 0; i < a.length; i++) {
        //     this.dataSource.push(a[i])
        // }
        //
        // let target = this.convert(this.dataSource);
        //
        // setTimeout(() => {
        //     this.setState({
        //         list: this.state.list.cloneWithRows(target)
        //     });
        // }, 1000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 0.02 * width
    }
});
