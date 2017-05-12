/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ListView
} from 'react-native'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import ShareFileCell from './ShareFileCell'
import AddData from './AddData'

const {width, height} = Dimensions.get('window');

export default class ShareFile extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '王东', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
        ];
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                />
                <AddData navigator={this.props.navigator}/>
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
            <ShareFileCell navigator={this.props.navigator} key={rowID} dataSource={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore />: null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }
    loadMore(){
        let a = [
            {dataName: "共享资料一", author: '杨磊', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '婷婷', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: 'bin.zhu', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '张帆', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '哈哈', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},
            {dataName: "共享资料一", author: '肚肚', shareTime: "2017/01/01", specification: '施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定施工前请务必阅读并严格遵守手册中的规定'},

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
        backgroundColor: '#f2f2f2',
        flex: 1
    }
});
