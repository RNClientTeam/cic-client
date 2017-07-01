/**
 * Created by zhubin on 17/5/10.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    ListView
} from 'react-native'

import {PullList} from 'react-native-pull'
import LoadMore from "../../../../Component/LoadMore.js"
import Reload from "../../../../Component/Reload.js"
import ExecuteProfileCell from './ExecuteProfileCell'
import TotalExecuteProfile from './TotalExecuteProfile'
const {width} = Dimensions.get('window');

export default class ExecuteProfile extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hasMoreData: true,
            list: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(resolve) {
        axios.get('/psmSgjdjh/sgjhJhrwZzxqklb', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.rowData.gczxId,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.setState({list: this.state.list.concat(responseData.data)}, () => {
                    resolve && resolve();
                });
            }
        }).catch((error) => {
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
                    onEndReachedThreshold={60}
                />
                <TouchableOpacity onPress={() => this.addProfile()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>填写总执行情况</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    //填报总执行情况
    addProfile() {
        this.props.navigator.push({
            component: TotalExecuteProfile,
            name: 'AddExecuteProfile',
            params: {
                gczxId: this.props.rowData.gczxId,
                refreshData: this.onPullRelease.bind(this, null)
            }
        });
    }

    //下拉刷新
    onPullRelease(resolve) {
        this.state.list = [];
        this.fetchData(resolve);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ExecuteProfileCell key={rowID} data={item}/>
        );
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 0.02 * width
    },
    button: {
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1
    },
    buttonText: {
        color: '#216fd0'
    },
});
