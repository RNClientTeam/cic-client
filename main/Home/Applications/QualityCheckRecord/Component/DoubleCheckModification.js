/**
 * Created by zhubin on 17/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import ModificationTaskCell from './ModificationTaskCell'
import ZLZGMoreOperation from "./ZLZGMoreOperation";
import toast from 'react-native-simple-toast'
import CheckFlowInfo from "../../SafetyInspectionRecord/Component/CheckFlowInfo";
const {width} = Dimensions.get('window');

export default class DoubleCheckModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            dataSource: [],
            modalVisible: false,
            auth:{},
            operateItemId:'',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
                {this.props.canFlow?
                    <TouchableOpacity style={styles.shareDataAdd} onPress={this.workFlow.bind(this)}>
                        <Text style={styles.textStyle}>提交审核</Text>
                    </TouchableOpacity>
                    :null
                }

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
                        <ZLZGMoreOperation
                            navigator={this.props.navigator}
                            closeModal={() => {this.setState({modalVisible: false})}}
                            auth={this.state.auth}
                            zljcjlId={this.props.id}
                            nodeId={this.props.data.nodeId}
                            operateItemId={this.state.operateItemId}
                        />
                    </Modal>
                }
            </View>
        )
    }

    /**
     * 流程
     */

    workFlow(){
        this.props.navigator.push({
            name: 'CheckFlowInfo',
            component: CheckFlowInfo,
            params: {
                resID: this.props.id,
                wfName: 'jdjhzljcjl',
                reloadInfo: this.props.reloadInfo(),
                name: 'QualityDoubleCheckRecord'
            }
        })
    }

    /**
     *整改任务权限
     */
    _getAuth(zgrwId){
        if (this.props.fromList || this.props.tbzgqk || this.props.checkAndZgrw) {
            axios.get('/psmZljcjl/getOperationAuthority4ZljcjlZgrw',{
                params:{
                    userID:GLOBAL_USERID,
                    stepId:this.props.data.nodeId,
                    isTodo:this.props.data.sfdb,
                    zgrwId:zgrwId,
                    callID:true
                }
            }).then(data=>{
                if(data.code === 1){
                    let showModal = false;
                    for (let key in data.data) {
                        if (data.data[key]) {
                            showModal = true;
                        }
                    }
                    if (showModal) {
                        this.setState({
                            modalVisible: true,
                            auth:data.data,
                            operateItemId:zgrwId
                        })
                    } else {
                        toast.show('没有相关权限');
                    }
                } else{
                    toast.show(data.message)
                }
            }).catch(err=>{
                toast.show('服务端异常');
            });
        }
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ModificationTaskCell
                key={rowID}
                data={item}
                fromList={this.props.fromList}
                tbzgqk={this.props.tbzgqk}
                checkAndZgrw={this.props.checkAndZgrw}
                setModalVisible={(zgrwId) => {this._getAuth(zgrwId)}}
                navigator={this.props.navigator}/>
        );
    }


    componentDidMount() {
        this._getData();
        this.listener = RCTDeviceEventEmitter.addListener('reloadZLZGList', (value) => {
            // 接受到通知后的处理
            this._getData();
        });
    }

    _getData(){
        axios.get('/psmZljcjl/zgrwList', {
            params: {
                userID: GLOBAL_USERID,
                zljcjlId: this.props.id,
                callID: true
            }
        }).then(data => {
            if (data.code === 1) {
                if (data.data) {
                    this.setState({
                        dataSource: data.data
                    });
                }
            }
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0.02 * width
    },
    divide: {
        height: 0.02 * width
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
