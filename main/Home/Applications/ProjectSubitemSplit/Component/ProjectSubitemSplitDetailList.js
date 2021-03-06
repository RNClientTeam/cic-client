/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import ApplicationSubitemCell from "../../Component/ApplicationSubitemCell";

const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import toast from 'react-native-simple-toast'

export default class ProjectSubitemSplitDetailList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            dataSource: []
        }
    }

    render() {
        return (
            <View style={styles.ProjectSubitemSplitDetailList}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        this.getDataFromNet(() => {
            resolve()
        });
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        let stateBg = '#fe9a25';
        if (item.state === '新建') {
            stateBg = '#29b0f5';
        } else if (item.state === '已拆分子项') {
            stateBg = '#1f92e2';
        } else if (item.state === '已交接') {
            stateBg = '#18d0ca';
        }
        return (
            <ApplicationSubitemCell target="ProjectSubitemSplitDetailInfo" proName={this.props.proName}
                                    proNum={this.props.proNum} stateBg={stateBg} key={rowID}
                                    navigator={this.props.navigator} data={item}/>
        );
    }

    componentDidMount() {
        this.getDataFromNet()
    }

    getDataFromNet(resolve = () => {
    }) {
        axios.get('/psmGczx/zxcf4List', {
            params: {
                userID: GLOBAL_USERID,
                cfxxid: this.props.cfxxid,
                callID: true
            }
        }).then(data => {
                if (data.code === 1) {
                    this.setState({
                        dataSource: data.data
                    })
                } else {
                    toast.show(data.message)
                }
            }
        ).catch(err => {
            toast.show('服务端异常');
        })
    }

}

const styles = StyleSheet.create({
    ProjectSubitemSplitDetailList: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});