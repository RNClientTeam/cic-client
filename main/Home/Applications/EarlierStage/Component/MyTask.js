/**
 * Created by fan on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import SchedulePlanCell from "./SchedulePlanCell.js";
import Reload from "../../../../Component/Reload.js";
import Toast from 'react-native-simple-toast'
export default class MyTask extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
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
        this.props.refresh(()=>{resolve()})
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <SchedulePlanCell xmbh={this.props.xmbh} key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={(rwid,sDate,eDate) => {this.props.setModalVisible(rwid,sDate,eDate);}}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData&&this.props.dataSource.length>0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData:this.props.getMoreData()
            },function () {
                if(!this.state.hasMoreData){
                    Toast.show('没有更多数据了')
                }
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
