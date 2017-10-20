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
        this.state = {
            modalVisible:false,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            operatingItem:{},
            hasMoreData:true
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={() => this.topIndicatorRender()}
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.props.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={60}
                    renderFooter={() => this.renderFooter()}
                    enableEmptySections={true}
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
                                      operatingItem={this.state.operatingItem}
                                      closeModal={() => {this.setState({modalVisible: false})}}/>
                </Modal>
            </View>
        )
    }



    onPullRelease(resolve) {
        //do refresh
        this.props.reload(()=>resolve());
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ArticleCell key={rowID}
                         navigator={this.props.navigator}
                         data={item}
                         setModalVisible={(data) => {this.setState({modalVisible: true,operatingItem:data})}}/>
        );
    }

    renderFooter() {
        return (this.state.hasMoreData&&this.props.dataSource.length>0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData:this.props.loadMore()
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});