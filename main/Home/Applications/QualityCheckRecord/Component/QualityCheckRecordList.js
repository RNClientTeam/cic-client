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
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import {PullList} from 'react-native-pull';
import QualityCheckRecordListCell from "./QualityCheckRecordListCell"

export default class QualityCheckRecordList extends Component {
    constructor(props) {
        super(props);
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
        this.props.reload(()=>{resolve()})
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let bgC = '#21cf7f';
        if (item.state === '已生效') {
            bgC = '#fe9a25'
        }
        return (
            <QualityCheckRecordListCell
                showModal={this.props.showModal}
                bgC={bgC} key={rowID}
                navigator={this.props.navigator}
                data={item}/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length>0  ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData:this.props.loadMore()
            })
        }
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
