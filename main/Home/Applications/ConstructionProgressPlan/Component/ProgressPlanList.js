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
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
                />
            </View>
        )
    }
    onPullRelease(resolve) {
        //do refresh
        this.props.refresh(()=>{resolve()})
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
            target.xmmc = item.xmmc + (item.zxmc ? '-' : '') + item.zxmc;
            target.fzr = item.zrr;
            target.bm = item.zrbm;
            target.bfb = item.jdbl ? item.jdbl : 0;
            target.sjd = item.jhkssj.replace(/-/g, '/') + (item.jhjssj ? '-' + item.jhjssj.replace(/-/g, '/') : '');
            target.count = item.count;
            target.gczxId = item.gczxId;
            return target
        })
    }

    loadMore() {
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData: this.props.loadMore()
            },function () {
                if(!this.state.hasMoreData){
                    //Toast.show('没有更多数据') ;
                }
            })
        }
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
