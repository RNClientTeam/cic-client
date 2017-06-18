/**
 * Created by fan on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import {getTimestamp} from '../../../../Util/Util.js';
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import TotalImplementationCell from "./TotalImplementationCell.js";
import Reload from "../../../../Component/Reload.js";
import Toast from 'react-native-simple-toast';
export default class TotalImplementation extends Component {
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});;
        this.state = {
            list: [],
            hasMoreData: true
        }
    }

    componentDidMount() {
        this.getDataFromNet(1);
    }

    getDataFromNet(pageNum, resolve) {
        axios.get('/psmQqjdjh/list4zxqk', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            this.setState({
                list: this.state.list.concat(responseData.data),
                hasMoreData: responseData.data.length === 0 ? false : true
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
                    dataSource={this.ds.cloneWithRows(this.state.list)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        this.state.list = [];
        this.pageNum = 1;
        this.getDataFromNet(1, resolve)
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <TotalImplementationCell key={rowID} data={item}/>
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
        paddingTop:width*0.02
    }
});
