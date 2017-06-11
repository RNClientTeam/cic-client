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
let testData = [
    {
        "wcqk": "",
        "yqwcsj": "2016-12-15",
        "sjwcsj": "",
        "rwmc": "12121212",
        "zrrmc": "黄雪琴",
        "RN": 1,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "00000004c00138c242a0d9",
        "zrr": "ZNDQ1933",
        "zt": 80,
        "ztmc": "已生效",
        "phrwId": "eff7c214db5cee179766e1b3039a9c9",
        "zrbmmc": "运营管理中心"
    },
    {
        "wcqk": "",
        "yqwcsj": "2016-12-14",
        "sjwcsj": "",
        "rwmc": "wewewew",
        "zrrmc": "李华凯",
        "RN": 2,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "D0020021",
        "zrr": "ZNDQ2108",
        "zt": 60,
        "ztmc": "已生效",
        "phrwId": "44a4ef9d0ae3e334946d9fa7a1f5a6e",
        "zrbmmc": "客户支持中心(2)"
    },
    {
        "wcqk": "",
        "yqwcsj": "2016-12-15",
        "sjwcsj": "",
        "rwmc": "12121212",
        "zrrmc": "黄雪琴",
        "RN": 1,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "00000004c00138c242a0d9",
        "zrr": "ZNDQ1933",
        "zt": 90,
        "ztmc": "已生效",
        "phrwId": "eff7c214db5cee179766e1b3039a9c9",
        "zrbmmc": "运营管理中心"
    },
    {
        "wcqk": "",
        "yqwcsj": "2016-12-14",
        "sjwcsj": "",
        "rwmc": "wewewew",
        "zrrmc": "李华凯",
        "RN": 2,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "D0020021",
        "zrr": "ZNDQ2108",
        "zt": 100,
        "ztmc": "已生效",
        "phrwId": "44a4ef9d0ae3e334946d9fa7a1f5a6e",
        "zrbmmc": "客户支持中心(2)"
    },
    {
        "wcqk": "",
        "yqwcsj": "2016-12-15",
        "sjwcsj": "",
        "rwmc": "12121212",
        "zrrmc": "黄雪琴",
        "RN": 1,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "00000004c00138c242a0d9",
        "zrr": "ZNDQ1933",
        "zt": 100,
        "ztmc": "已生效",
        "phrwId": "eff7c214db5cee179766e1b3039a9c9",
        "zrbmmc": "运营管理中心"
    },
    {
        "wcqk": "",
        "yqwcsj": "2016-12-14",
        "sjwcsj": "",
        "rwmc": "wewewew",
        "zrrmc": "李华凯",
        "RN": 2,
        "isTodo": 0,
        "wcbl": "",
        "zrbm": "D0020021",
        "zrr": "ZNDQ2108",
        "zt": 100,
        "ztmc": "已生效",
        "phrwId": "44a4ef9d0ae3e334946d9fa7a1f5a6e",
        "zrbmmc": "客户支持中心(2)"
    }
];
export default class CooperateTask extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: false,
            list: testData,
            modalVisible: false,
            isLoading: false,
            pageNum: 1,
            auth:null
        }
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    getDataFromNet() {
        this.setState({
            isLoading: true,
            pageNum: 1,
        });
        axios.get('/psmQqjdjh/list4Phrw', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                pageNum: 1,
                pageSize: 10,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            this.setState({
                list: testData,
                isLoading: false,
                hasMoreData: true
            });
        }).catch((error) => {
            this.setState({isLoading: false});
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
                    <MoreOperations navigator={this.props.navigator} closeModal={() => {
                        this.setState({modalVisible: false})
                    }} auth={this.state.auth}/>
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
            <CooperateTaskCell key={rowID} dataSource={item}
                setModalVisible={this.setModalVisible.bind(this, item.phrwId)}/>
        );
    }

    setModalVisible(phrwId) {
        axios.get('/psmQqjdjh/operationAuthority',{
            params:{
                userID:GLOBAL_USERID,
                belongTo:3,
                objId:phrwId,
                callID:getTimestamp()
            }
        }).then(data=>{
            this.setState({
                modalVisible: true,
                auth:data
            });
        });
    }

    renderFooter() {
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        alert('a');
        this.setState({hasMoreData:true});
        for (let i = 0; i < testData.length; i++) {
            this.state.list.push(testData[i])
        }
        setTimeout(() => {
            this.setState({
                list: this.state.list,
                hasMoreData: false
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
