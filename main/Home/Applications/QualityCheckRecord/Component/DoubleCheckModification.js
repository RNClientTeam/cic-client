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

const {width} = Dimensions.get('window');

export default class DoubleCheckModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            dataSource: [],
            modalVisible: false,
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
                            auth={this.state.modalAuth}
                            operateItem={this.state.operateItem}
                        />
                    </Modal>
                }
            </View>
        )
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ModificationTaskCell
                key={rowID}
                data={item}
                setModalVisible={() => {this.setState({modalVisible: true})}}
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
                data = {
                    "code": 1,
                    "data": [{
                        "id": "8a8180d85b293d36015b3cb1ae032a89",
                        "zljcjlId": "8a8180d85b0561b0015b0d47610c1b14",
                        "wtlb": "3",
                        "zgyq": "线路综合班按照规范要求进行整改，工程部技术员、技术部工程师复验。",
                        "zgzrbmmc": "配网工程部",
                        "zgzrbm": "00000004e00138c242a0d9",
                        "zgzrrmc": "李建春(配网工程部经理)",
                        "zgzrr": "000000092001470309c4c",
                        "wtlbmc": "严重问题",
                        "zgwcsj": "2017-04-10",
                        "sjwcsj": "2017-03-27",
                        "zcjg": "已整改完成。",
                        "dqztmc": "整改完成",
                        "dqzt": "100"}
                    ],
                    "message": "成功"
                };


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
    }
});
