/**
 * Created by zhubin on 17/5/15.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ListView,
    Modal
} from 'react-native'
import ArticleCell from './ArticleCell'
import {PullList} from 'react-native-pull'
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import MoreActionsModal from "./MoreActionsModal"

const {width} = Dimensions.get('window');

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            }
        ];
        this.state = {
            modalVisible:false,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={() => this.topIndicatorRender()}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
                />
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreActionsModal navigator={this.props.navigator}
                                      closeModal={() => {this.setState({modalVisible: false})}}/>
                </Modal>
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
            <ArticleCell key={rowID} navigator={this.props.navigator} data={item}
                         setModalVisible={() => {this.setState({modalVisible: true})}}/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }
    loadMore() {
        let a = [
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            },
            {
                title: '会议管理实施办法',
                type: '集团公文-一般公文-通告',
                department: '九恒-配网工程部',
                date: '2017-05-11',
                priority: '普通'
            }
        ];
        for (let i = 0; i < a.length; i++) {
            this.dataSource.push(a[i])
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
        flex:1
    }
});