/**
 * Created by fan on 2017/05/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text,
    Modal,
    TouchableOpacity
} from 'react-native'

const {width, height} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import ReformTaskCell from "./ReformTaskCell.js";
import toast from 'react-native-simple-toast'
import ZGMoreOperation from "./ZGMoreOperation";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import CheckFlowInfo from "./CheckFlowInfo";
export default class ReformTask extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
            dataSource: [],
            modalVisible: false,
            modalAuth: {},
            operateItem: {}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    topIndicatorHeight={60}
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
                {this.props.showWrokFlow ?
                    <TouchableOpacity style={styles.shareDataAdd} onPress={this.workFlow.bind(this)}>
                    <Text style={styles.textStyle}>提交审核</Text>
                </TouchableOpacity>
                    : null}

                {
                    this.state.modalVisible &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false})
                        }}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <ZGMoreOperation
                            navigator={this.props.navigator}
                            closeModal={() => {
                                this.setState({modalVisible: false})
                            }}
                            auth={this.state.modalAuth}
                            operateItem={this.state.operateItem}
                        />
                    </Modal>
                }
            </View>
        )
    }

    workFlow(){
        this.props.navigator.push({
            name: "CheckFlowInfo",
            component: CheckFlowInfo,
            params: {
                resID: this.props.aqjcjlId,
                reloadInfo: this.props.reloadInfo(),
                // TODO
                wfName: 'jdjhaqjcjl',
                name: 'RectifyTask'
            }
        })
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ReformTaskCell showAuthList={this.showAuthList.bind(this, item)} key={rowID} data={item}
                            navigator={this.props.navigator} tbzgqk={this.props.tbzgqk}
                            checkAndZgrw={this.props.checkAndZgrw} fromList={this.props.fromList}/>
        );
    }

    /**
     * 权限操作
     */
    showAuthList(item) {
        if (this.props.fromList || this.props.tbzgqk || this.props.checkAndZgrw) {
            axios.get('/psmAqjcjh/getsubOperationAuthority4Aqjcjl', {
                params: {
                    userID: GLOBAL_USERID,
                    stepId: this.props.item.stepId,
                    isTodo: this.props.item.isTodo,
                    zgrwId: item.id,
                    callID: true
                }
            }).then(data => {
                if (data.code === 1) {
                    console.log(data);
                    this.setState({
                        modalVisible: true,
                        modalAuth: data.data,
                        operateItem: item
                    });
                } else {
                    toast.show(data.message);
                }
            }).catch(err => {
                toast.show('服务端异常');
            });
        }
    }

    componentDidMount() {
        this._getData();
        this.listener = RCTDeviceEventEmitter.addListener('reloadZGList', (value) => {
            // 接受到通知后的处理
            this._getData();
        });
    }

    _getData() {
        axios.get('/psmAqjcjh/list4Zgrw', {
            params: {
                userID: GLOBAL_USERID,
                aqjcjlId: this.props.aqjcjlId,
                callID: true
            }
        }).then(data => {
            console.log(data);
            if (data.code === 1) {
                this.setState({
                    dataSource: data.data
                });
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            toast.show('服务端异常')
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 10
    },
    shareDataAdd: {
        width: width,
        height: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    textStyle: {
        color: '#216fd0',
        fontSize: width * 0.035,
        marginLeft: width * 0.02
    }
});
