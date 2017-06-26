/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
const {width}  = Dimensions.get('window');
import ApplicationListCell from '../../Component/ApplicationListCell'
import {PullList} from 'react-native-pull'
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"

export default class HomeHeader extends Component{

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
                    dataSource={this.state.list.cloneWithRows(this.props.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
                    enableEmptySections={true}
                />
            </View>
        )
    }
    onPullRelease(resolve) {
        //do refresh
        this.props.getData(1,()=>resolve())
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let temp = {
            xmbh:item.xmbh,//项目编号
            xmmc:item.xmmc,//项目名称
            state:item.gcfwjjztmc,//项目状态
            fzr:item.xmjl,//负责人
            bm:item.ssdw,//部门
            bfb:item.wcbl,//百分比
            sjd:item.cfsj,//时间段
            count:item.zxcount,
            id:item.id
        };
        let stateBg = '#fe9a25';
        if(item.state === '新建'){
            stateBg='#29b0f5';
        }else if(item.state === '已拆分子项'){
            stateBg='#1f92e2';
        }else if(item.state === '已交接'){
            stateBg='#18d0ca';
        }
        return (
            <ApplicationListCell stateBg={stateBg} key={rowID} navigator={this.props.navigator} data={temp} target="ProjectRangeHandoverDetail"/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length? <LoadMore /> : null)
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
        paddingTop: 0.02 * width
    }
});
