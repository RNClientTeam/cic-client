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
let testData = [
    {
        "wcqk": "asda",
        "id": "000000040015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "100"
    },
    {
        "wcqk": "asda",
        "id": "000000030015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "50"
    },
    {
        "wcqk": "asda",
        "id": "000000020015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "10"
    },
    {
        "wcqk": "asda",
        "id": "000000040015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "100"
    },
    {
        "wcqk": "asda",
        "id": "000000030015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "50"
    },
    {
        "wcqk": "asda",
        "id": "000000020015c342b519a",
        "tbsj": "2017-05-23",
        "wcbl": "10"
    }
];
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import TotalImplementationCell from "./TotalImplementationCell.js";
import Reload from "../../../../Component/Reload.js";
import Toast from 'react-native-simple-toast';
export default class TotalImplementation extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});;
        this.state = {
            hasMoreData: true,
            list: [],
            isLoading: false
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
        axios.get('/psmQqjdjh/list4zxqk', {
            params: {
                userID: GLOBAL_USERID,
                jhxxId: this.props.jhxxId,
                callID: getTimestamp()
            }
        }).then((responseData) => {
            this.setState({
                isLoading: false,
                list: testData
            });
        }).catch((error) => {
            this.setState({isLoading:false});
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
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                    renderFooter={this.renderFooter.bind(this)}
                />
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
            <TotalImplementationCell key={rowID} data={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData && this.state.list.length !== 0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        setTimeout(() => {
            this.setState({
                list: this.state.list.concat(testData)
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
