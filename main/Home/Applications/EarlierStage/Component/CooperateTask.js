/**
 * Created by Nealyang on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import CooperateTaskCell from "./CooperateTaskCell";
import Reload from "../../../../Component/Reload";
export default class CooperateTask extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 100},
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 40},
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 30},
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 10},
            {cooperateName: "配合工作内容一", name: '王东', time: "2017/01/01-2017/12/12", percentage: 90}
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
        return (
            <CooperateTaskCell key={rowID} dataSource={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore(){
        let a = [
            {cooperateName: "配合工作内容一", name: '123', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: 'Neal', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: 'fan', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: 'bin', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: 'Ting', time: "2017/01/01-2017/12/12", percentage: 80},
            {cooperateName: "配合工作内容一", name: '哈哈', time: "2017/01/01-2017/12/12", percentage: 80}
        ];

        for (let i = 0;i<a.length;i++){
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
        backgroundColor: '#f2f2f2'
    }
});