/**
 * Created by Nealyang on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Modal
} from 'react-native'
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import CooperateTaskCell from "./CooperateTaskCell";
import Reload from "../../../../Component/Reload";
import MoreOperations from "./MoreOperations";
import Toast from 'react-native-simple-toast';
import {getTimestamp} from '../../../../Util/Util.js';
export default class CooperateTask extends Component {
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: [],
            modalVisible: false,
            hasMoreData: true,
            auth:null,
            rwid:'',
            zrrmc: ''
        }
    }

    componentDidMount() {
        this.getDataFromNet(1);
    }

    getDataFromNet(pageNum, resolve) {
        axios.get('/psmQqjdjh/list4Phrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: pageNum,
                pageSize: 10,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            console.log(responseData);
            this.setState({
                list: this.state.list.concat(responseData.data.data),
                hasMoreData: responseData.data.data.length === 0 ? false : true
            }, () => {
                resolve && resolve();
            });
        }).catch((error) => {
            Toast.show('服务端连接错误！')
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
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreOperations reloadInfo={this.onPullRelease.bind(this, null)} navigator={this.props.navigator} closeModal={() => {
                        this.setState({modalVisible: false})
                    }} auth={this.state.auth} zrrmc={this.state.zrrmc} rwid={this.state.rwid}
                    jhxxId={this.props.jhxxId} tag="配合任务" exchangeRwid={this.exchangeRwid.bind(this)}/>
                </Modal>
            </View>
        )
    }

    onPullRelease(resolve) {
        this.state.list = [];
        this.pageNum = 1;
        this.getDataFromNet(1, resolve);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <CooperateTaskCell key={rowID} dataSource={item}
                setModalVisible={this.setModalVisible.bind(this, item.phrwId, item.zrrmc)}/>
        );
    }

    exchangeRwid(newId) {
        let tempIndex = -1;
        this.state.list.forEach((elem, index) => {
            if (elem.phrwId === this.state.rwid) {
                tempIndex = index;
                return;
            }
        });
        if (tempIndex >= 0) {
            this.state.list[tempIndex].phrwId = newId;
            this.setState({list:this.state.list});
        }
    }

    setModalVisible(phrwId, zrrmc) {
        axios.get('/psmQqjdjh/operationAuthority',{
            params:{
                userID:GLOBAL_USERID,
                belongTo:2,
                objId:phrwId,
                callID:getTimestamp()
            }
        }).then(data=>{
            if (data.code === 1) {
                let showToast = true;
                data.data.workflow = true;
                for(var key in data.data) {
                    if (data.data[key]) {
                        showToast = false;
                        this.setState({
                            modalVisible: true,
                            auth:data.data,
                            rwid: phrwId,
                            zrrmc: zrrmc
                        });
                        return;
                    }
                }
                if (showToast) {
                    Toast.show('您没有相关权限');
                }
            } else {
                Toast.show(data.message);
            }
        }).catch((error) => {
            Toast.show('服务端出错');
        });
    }

    renderFooter() {
        return (this.state.hasMoreData && this.state.list.length !== 0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        this.state.hasMoreData && this.getDataFromNet(++this.pageNum);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
