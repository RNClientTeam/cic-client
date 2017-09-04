/**
 * Created by Nealyang on 2017/5/20.
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
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import Reload from "../../../../Component/Reload";
import ProjectListCell from "./ProjectListCell";
export default class ProjectList extends Component {
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
        this.props.getDataFromNet(()=>{resolve()});
        this.setState({
            hasMoreData:true
        })
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        item.selected = false;
        if(this.props.zxid.indexOf(item.zxid)>-1){
            item.selected = true
        }
        return (
            <ProjectListCell key={rowID} navigator={this.props.navigator} choiceThisCell={()=>this.choiceThisCell(item)} data={item} target="EarlierStageDetail"/>
        );
    }

    choiceThisCell(item){
        item.selected = !item.selected;
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
