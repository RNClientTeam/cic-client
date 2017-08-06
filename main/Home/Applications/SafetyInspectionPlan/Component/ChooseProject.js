"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ListView,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import StatusBar from '../../../../Component/StatusBar.js';
import toast from 'react-native-simple-toast'
import Loading from "../../../../Component/Loading";
import ListModal from './ListModal.js';
import {getCurrentMonS, getCurrentMonE} from '../../../../Util/Util.js';
const {width, height} = Dimensions.get('window');

export default class ChooseProject extends Component {
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [],
            isLoading: false,
            kssj: getCurrentMonS(),
            jssj: getCurrentMonE(),
            isModalVisible: false
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择项目" navigator={this.props.navigator}>
                    <TouchableOpacity onPress={() => {this.setState({isModalVisible: !this.state.isModalVisible})}}>
                        <Image style={styles.filtrate}
                               source={require('../../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
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
                {this.state.isModalVisible ?
                    <ListModal
                        changeFilter={(sDate, eDate, lx) => {
                            this.filter(sDate, eDate, lx)
                        }}
                        isModalVisible={this.state.isModalVisible}
                        jhlx={this.state.jhlx}
                        eDate={this.state.kssj}
                        sDate={this.state.jssj}
                        closeModal={() => this.setState({isModalVisible: false})}/> :
                    <View/>}
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    filter(sDate, eDate) {
        this.setState({
            kssj: sDate,
            jssj: eDate
        }, () => {
            this.state.dataSource = [];
            this.pageNum = 1;
            this.getData(1);
        })
    }

    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this._clickItem(rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={styles.textNum} numberOfLines={2}>{rowData.xmbh}</Text>
                    <Text style={styles.textInfo} numberOfLines={2}>{rowData.xmmc}</Text>
                    <Text style={styles.textInfo} numberOfLines={2}>{rowData.gczxmc}</Text>
                    <Text style={styles.textInfo} numberOfLines={2}>{rowData.sgrwmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        this.props.addProject(rowData.xmbh, rowData.xmmc, rowData.gczxmc, rowData.sgrwmc,
            rowData.gczxId, rowData.sgrwId, rowData.cfxxId);
        this.props.navigator.pop();
    }

    componentDidMount() {
        this.getData(1);
    }

    getData(pageNum) {
        this.setState({
            isLoading: true
        });
        axios.get('/psmAqjcjh/sgrwSelect4Aqjcjh', {
            params: {
                userID: GLOBAL_USERID,
                pageNum: pageNum,
                pageSize: 10,
                kssj: this.state.kssj,
                jssj: this.state.jssj,
                callID: true,
            }
        }).then(responseData => {
            this.setState({
                isLoading: false
            });
            if (responseData.code === 1) {
                this.setState({
                    dataSource: this.state.dataSource.concat(responseData.data.data)
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
        this.getData(++this.pageNum);
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        width: width,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 8
    },
    textNum: {
        fontSize: 15,
        color: '#216fd0',
        lineHeight: 19
    },
    textInfo: {
        fontSize: 15,
        color: '#3d3d3d',
        lineHeight: 19
    },
    separatorView: {
        width: width,
        height: 8,
        backgroundColor: '#f1f1f1'
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});
