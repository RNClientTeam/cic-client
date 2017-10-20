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
    Text,
    ListView
} from 'react-native'
const {width} = Dimensions.get('window');
import ApplicationListCellWithIcon from '../../Component/ApplicationListCellWithIcon'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import CooperateTaskCell from "./CooperateTaskCell";
import Reload from "../../../../Component/Reload";
import Toast from 'react-native-simple-toast'
import EarlierStageListCell from "../../Component/ApplicationListCell";
export default class EarlierStageList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={10}
                    renderFooter={this.renderFooter.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        //do refresh
        this.props.refresh(()=>{resolve()});
        this.setState({
            hasMoreData:true
        })
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let stateBg = '#fe9a25';
        if(item.ztmc === '已生效'){
            stateBg='#29b0f5';
        }else if(item.ztmc === '新计划'){
            stateBg='#1f92e2';
        }else if(item.ztmc === ''){
            stateBg='#18d0ca';
        }
        let temp = {
            xmbh:item.xmbh,//项目编号
            xmmc:item.xmmc,//项目名称
            state:item.ztmc,//项目状态
            fzr:item.xmjl,//负责人
            bm:item.tbdw,//部门
            bfb:item.wcbl,//百分比
            sjd:'',//时间段
            count:item.count,
            jhxxId:item.jhxxId,
            isTodo:item.isTodo
        };
        if(item.sDate&&item.eDate){
            temp.sjd = item.sDate+' / '+item.eDate
        }
        return (
            <EarlierStageListCell stateBg={stateBg} key={rowID} navigator={this.props.navigator} data={temp} target="EarlierStageDetail"/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length ? <LoadMore /> : null)
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
        backgroundColor: '#f2f2f2'
    }
});
