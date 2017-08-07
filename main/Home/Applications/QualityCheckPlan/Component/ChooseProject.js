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

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import toast from 'react-native-simple-toast'
import Loading from "../../../../Component/Loading";
import ChooseSubPro from "./ChooseSubPro";
import EarlierStageListHeader from "../../Component/SearchHeader";

export default class ChooseProject extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [],
            isLoading: false,
            xmmc: ''
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择项目" navigator={this.props.navigator}/>
                <EarlierStageListHeader changeZxmc={(txt) => this.changeZxmc(txt)} getData={() => {
                    this.getData()
                }}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    scrollEnabled={true}
                    enableEmptySections={true}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    changeZxmc(txt) {
        this.setState({
            xmmc: txt
        })
    }

    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={this._clickItem.bind(this, rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={styles.textNum}>{rowData.xmgh}</Text>
                    <Text style={styles.textInfo}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        this.props.navigator.push({
            component: ChooseSubPro,
            name: 'ChooseSubPro',
            params: {
                dataSource: rowData,
                addProject: this.props.addProject
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({
            isLoading: true
        });
        axios.get('/psmZljcjh/zxxzList', {
            params: {
                userID: GLOBAL_USERID,
                callID: true,
                xmmc: this.state.xmmc
            }
        }).then(data => {
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
