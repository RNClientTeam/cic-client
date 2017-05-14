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
import MoreActionsModal from "./MoreActionsModal"

const {width, height} = Dimensions.get('window');
let dataArr = [
    {
        period: '准备设备',
        state: '执行中',
        principal: '杨磊',
        time: '2017/11/11-2017/12/12'
    },
    {
        period: '设备检测',
        state: '执行中',
        principal: '杨磊',
        time: '2017/11/11-2017/12/12'
    },
    {
        period: '开始施工',
        state: '执行中',
        principal: '杨磊',
        time: '2017/11/11-2017/12/12'
    },
    {
        period: '施工收尾',
        state: '执行中',
        principal: '杨磊',
        time: '2017/11/11-2017/12/12'
    },
    {
        period: '施工收尾',
        state: '执行中',
        principal: '杨磊',
        time: '2017/11/11-2017/12/12'
    },
];
let tempArr = dataArr;

export default class MyPlan extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
        this.state = {
            hasMoreData: true,
            modalVisible: false,
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
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreActionsModal navigator={this.props.navigator}
                                      closeModal={() => {this.setState({modalVisible: false})}}/>
                </Modal>
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
            <MyPlanCell key={rowID} data={item} navigator={this.props.navigator}
                              setModalVisible={() => {this.setState({modalVisible: true})}}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        for (let i = 0;i<tempArr.length;i++){
            this.dataSource.push(tempArr[i])
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