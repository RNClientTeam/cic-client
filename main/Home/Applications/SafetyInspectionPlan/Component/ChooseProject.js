"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ListView,
    Dimensions
} from 'react-native';
import StatusBar from '../../../../Component/StatusBar.js';
import toast from 'react-native-simple-toast'
import Loading from "../../../../Component/Loading";

const {width, height} = Dimensions.get('window');

export default class ChooseProject extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [],
            isLoading: false,
        }
    }

    render() {
        if (this.state.dataSource.length) {
            return (
                <View style={styles.flex}>
                    <StatusBar title="选择项目" navigator={this.props.navigator}/>
                    <ListView
                        dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                        renderRow={this._renderRow.bind(this)}
                        scrollEnabled={true}
                        enableEmptySections={true}
                        renderSeparator={(sectionID, rowID) => {
                            return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                        }}
                        onEndReached={this.loadMore.bind(this)}
                        onEndReachedThreshold={60}
                    />
                    {this.state.isLoading ? <Loading/> : null}
                </View>
            );
        }
        return (
            <View style={styles.flex}>
                <StatusBar title="选择项目" navigator={this.props.navigator}/>
            </View>
        )
    }

    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this._clickItem(rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={styles.textNum}>{rowData.xmbh}</Text>
                    <Text style={styles.textInfo}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        this.props.addProject(rowData.xmbh, rowData.xmmc, rowData.gczxmc, rowData.sgrwmc,
            rowData.gczxId, rowData.sgrwId);
        this.props.navigator.pop();
    }

    componentDidMount() {
        this.getData();
    }

    getData(pageNum = 1) {
        this.setState({
            isLoading: true
        });
        axios.get('/psmAqjcjh/sgrwSelect4Aqjcjh', {
            params: {
                userID: GLOBAL_USERID,
                pageNum,
                pageSize: 10,
                kssj: this.props.kssj,
                jssj: this.props.jssj,
                callID: true,
            }
        }).then(responseData => {
            console.log(responseData);
            this.setState({
                isLoading: false
            });
            responseData = {
                "code": 1,
                "data": {
                    "total": 139,
                    "data": [
                        {
                            "sgrwjssj": "2016-09-10",
                            "gczxmc": "总配至分配的电缆敷设",
                            "xmmc": "北大国际医院变配电工程",
                            "gczxId": "8a8180d856b8094b0156ea7109ae5931",
                            "xmbh": "CX_ZY15012-15008",
                            "sgrwkssj": "2016-09-10",
                            "sgrwId": "8a8180d85702071c015705458e0d69e5",
                            "RN": 1,
                            "sgrwmc": "有限空间安全手续施工现场转交工程部"
                        },
                        {
                            "sgrwjssj": "2016-09-11",
                            "gczxmc": "总配至分配的电缆敷设",
                            "xmmc": "北大国际医院变配电工程",
                            "gczxId": "8a8180d856b8094b0156ea7109ae5931",
                            "xmbh": "CX_ZY15012-15008",
                            "sgrwkssj": "2016-09-11",
                            "sgrwId": "8a8180d85702071c015705458e1c69e8",
                            "RN": 2,
                            "sgrwmc": "电缆到达现场，并确定是否强检及取样"
                        }
                    ]
                },
                "message": "成功"
            };

            if (responseData.code === 1) {
                this.setState({
                    dataSource: responseData.data && responseData.data.data ? responseData.data.data : []
                })
            } else {
                toast.show(responseData.message)
            }
        }).catch(err => {
            this.setState({
                isLoading: false
            });
            toast.show('服务端异常');
        })
    }

    loadMore() {
        let pageNum = ++this.state.pageNum;
        this.getData(pageNum);
        this.setState({
            pageNum,
        });
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        width: width,
        height: 0.132 * height,
        justifyContent: 'space-between',
        paddingLeft: 20,
        backgroundColor: '#fff',
        paddingVertical: 0.0315 * height
    },
    textNum: {
        fontSize: 15,
        color: '#216fd0'
    },
    textInfo: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
});
