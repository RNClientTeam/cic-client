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
import AddExecuteProfile from './AddExecuteProfile'

const {width} = Dimensions.get('window');
let dataArr = [{
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    }];

let tempArr = [{
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    },
    {
        infomation: '执行情况说明执行情况说明执行情况说明执行情况说明执行情况',
        schedule: '70%',
        time: '2017/11/11'
    }];

export default class ExecuteProfile extends Component {
    constructor(props) {
        super(props);
        this.dataSource = dataArr;
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                />
                <TouchableOpacity onPress={() => this.addProfile()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>填写总执行情况</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    addProfile() {
        this.props.navigator.push({
            component: AddExecuteProfile,
            name: 'AddExecuteProfile'
        });
    }

    onPullRelease(resolve) {
        //do refresh
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ExecuteProfileCell key={rowID} data={item}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        for (let i = 0;i<tempArr.length;i++){
            this.dataSource.push(tempArr[i])
        }

        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
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