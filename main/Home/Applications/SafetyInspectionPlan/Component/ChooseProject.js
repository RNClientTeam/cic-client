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
                    <Text style={styles.textNum}>{rowData.xmgh}</Text>
                    <Text style={styles.textInfo}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        () => this.props.addProject(rowData.xmmc, rowData.gczxId, rowData.sgrwId);
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
        }).then(data => {
            console.log(data);
            this.setState({
                isLoading: false
            });
            if (data.code === 1) {
                this.setState({
                    dataSource: data.data && data.data.list ? data.data.list : []
                })
            } else {
                toast.show(data.message)
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
