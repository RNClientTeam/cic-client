/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import toast from 'react-native-simple-toast'
import ProjectList from "./Component/ProjectList";
import Loading from "../../../Component/Loading";


export default class ProjectListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            zxmc: '',
            list: [],
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="选择子项"/>
                <SearchHeader/>
                <ProjectList loadMore={() => this.loadMore()} getDataFromNet={(resolve) => {
                    this.getDataFromNet(1, resolve)
                }} dataSource={this.state.list} navigator={this.props.navigator}/>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    showLoading() {
        this.setState({
            isLoading: true
        })
    }

    hideLoading() {
        this.setState({
            isLoading: false
        })
    }

    componentDidMount() {
        this.getDataFromNet(1, () => {
        })
    }

    loadMore() {
        this.setState({
            pageNum: this.state.pageNum + 1
        }, function () {
            this.getDataFromNet(this.state.pageNum, () => {
            })
        })
    }

    getDataFromNet(pageNum, resolve) {
        console.log(pageNum)
        this.showLoading();
        axios.get('/psmSgrjh/list4gczx', {
            params: {
                userID: GLOBAL_USERID,
                pageNum: pageNum,
                pageSize: 10,
                callID: true,
                zxmc: this.state.zxmc
            }
        }).then(data => {
            this.hideLoading();
            // TODO
            if (pageNum < 10) {
                data = {
                    "code": 1,
                    "data": {
                        "total": 110,
                        "list": [
                            {
                                "zxid": "8a8180b858dc0f0e0158dc430a8f00fd",
                                "xmgh": "CX_DS13140-13224",
                                "xmmc": "人大土建子项",
                                "cfid": "8a8180b858dc0f0e0158dc401f9c00eb"
                            },
                            {
                                "zxid": "8a8180b858dc0f0e0158dc4202ed00f5",
                                "xmgh": "CX_DS13140-13224",
                                "xmmc": "人大配电子项",
                                "cfid": "8a8180b858dc0f0e0158dc401f9c00eb"
                            }
                        ]
                    },
                    "message": "成功"
                };
            } else {
                data = {
                    "code": 1,
                    "data": {
                        "total": 110,
                        "list": []
                    },
                    "message": "成功"
                };
            }
            resolve();
            if (data.data && data.data.list) {
                if (data.data.list.length > 0) {
                    if (pageNum === 1) {
                        this.setState({
                            list: data.data.list,
                            pageNum: 1
                        });
                    } else {
                        for (let i = 0; i < data.data.list.length; i++) {
                            this.state.list.push(data.data.list[i])
                        }
                        this.setState({
                            list: this.state.list
                        })
                    }

                    return true
                } else {
                    return false
                }
            } else {
                return false
            }


        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});