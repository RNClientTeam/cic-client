/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
    ListView,
    Modal
} from 'react-native'

import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js"
import Reload from "../../../../Component/Reload.js"
import MyPlanCell from "./MyPlanCell"

const {width, height} = Dimensions.get('window');

export default class AllPlan extends Component {
    constructor(props) {
        super(props);
        //this.dataSource = props.dataSource;
        this.state = {
            hasMoreData: true,
            modalVisible: false,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}))
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
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let stateBg = '#21cf7f';
        if (item.rwztmc === '已生效') {
            stateBg = '#fe9a25'
        } if (item.rwztmc === '已提交审核') {
            stateBg = '#216fd0'
        }
        return (
            <MyPlanCell key={rowID}
                        navigator={this.props.navigator}
                        stateBg={stateBg}
                        data={item}
                        setModalVisible={ (rwid) => this.props.setModalVisible(rwid) }
            />
        );
    }

    renderFooter (){
        return (this.state.hasMoreData&&this.props.dataSource.length > 0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        if(this.props.dataSource.length > 0){
            this.setState({
                hasMoreData:this.props.loadMore()
            },function () {
                if(!this.state.hasMoreData){
                    // Toast.show('没有更多数据了');
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
