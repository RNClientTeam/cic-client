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
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render() {
        return (
            <View style={styles.psHeader}>
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
        this.props.getData(()=>resolve())
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let stateBg = '#fe9a25';
        if(item.gcfwjjztmc === '新建'){
            stateBg='#29b0f5';
        }else if(item.gcfwjjztmc === '已拆分子项'){
            stateBg='#1f92e2';
        }else if(item.gcfwjjztmc === '已交接'){
            stateBg='#18d0ca';
        }
        return (
            <ProjectSubitemSplitListCell
                cfzt={this.state.cfzt}
                stateBg={stateBg} key={rowID} navigator={this.props.navigator}
                                         data={item} target="ProjectSubitemSplitDetail"/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length>0 ? <LoadMore /> : null)
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
    psHeader: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
