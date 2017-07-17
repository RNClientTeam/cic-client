/**
 * Created by zhubin on 17/5/10.
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

import {PullList} from 'react-native-pull'
import ProgressExecuteListCell from './ProgressExecuteListCell.js';
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"

const {width} = Dimensions.get('window');

export default class ProgressExecuteList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render() {
        return(
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={() => this.topIndicatorRender()}
                    topIndicatorHeight={60}
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
                />
            </View>
        )
    }
    onPullRelease(resolve) {
        this.props.refreshData(()=>{resolve()});
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ProgressExecuteListCell
                key={rowID} data={item}
                navigator={this.props.navigator}
                target="ProgressExecuteDetail"/>
        );
    }

    renderFooter() {
        return (this.props.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        this.props.hasMoreData && this.props.loadMore();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 0.02 * width
    }
});
