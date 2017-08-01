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
import Toast from 'react-native-simple-toast';

export default class MyPlan extends Component {
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
            modalVisible: false,
            list: [],
            auth: {},
            sgrwId: ''
        }
    }

    componentDidMount() {
        this.fetchData(1, null);
    }

    fetchData(pageNum, resolve) {
        axios.get('/psmSgjdjh/sgjhJhrwlb', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.rowData.gczxId,
                pageNum: pageNum,
                rwlx: this.props.rwlx,
                pageSize: 12,
                callID: true
            }
        }).then((responseData) => {
            console.log(responseData);
            if (responseData.code === 1) {
                this.setState({
                    list: this.state.list.concat(responseData.data.data),
                    hasMoreData: responseData.data.data.length !== 0 ? true : false
                }, () => {
                    resolve && resolve();
                });
            }
        }).catch((error) => {
            console.log(error);
            resolve && resolve();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.state.list)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                />
                {
                    this.state.modalVisible &&
                    <Modal animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible: false})}}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <MoreActionsModal navigator={this.props.navigator}
                            closeModal={() => {this.setState({modalVisible: false})}}
                            auth={this.state.auth} sgrwId={this.state.sgrwId}
                            gczxId={this.props.rowData.gczxId}
                            exchangeSgrwId={this.exchangeSgrwId.bind(this)}
                            reloadInfo={this.onPullRelease.bind(this,null)}/>
                    </Modal>
                }
            </View>
        )
    }

    exchangeSgrwId(newId) {
        let taskIndex = -1;
        this.state.list.forEach((elem, index) => {
            if (elem.sgrwId === this.state.sgrwId) {
                taskIndex = index;
                return;
            }
        });
        if (taskIndex >= 0) {
            this.state.list[taskIndex].sgrwId = newId;
            this.setState({list: this.state.list});
        }
    }

    onPullRelease(resolve) {
        this.pageNum = 1;
        this.state.list = [];
        this.fetchData(1, resolve);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <MyPlanCell key={rowID} data={item} navigator={this.props.navigator}
                              setModalVisible={this.setModalVisible.bind(this,item.id)}/>
        );
    }

    setModalVisible(sgrwId) {
        //获取权限
        axios.get('/psmSgjdjh/operationAuthority4zx', {
            params: {
                userID: GLOBAL_USERID,
                belongTo: 1,
                gczxId: this.props.rowData.gczxId,
                sgrwId: sgrwId,
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                let showToast = true;
                for (var key in res.data) {
                    if (res.data[key] && showToast) {
                        showToast = false;
                    }
                }
                if (showToast) {
                    Toast.show('您没有相关权限');
                } else {
                    this.setState({
                        modalVisible: true,
                        auth: res.data,
                        sgrwId: sgrwId
                    });
                }
            } else {
                Toast.show(res.message);
            }
        }).catch((error) => {

        });
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        this.state.hasMoreData && this.fetchData(++this.pageNum, null);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
