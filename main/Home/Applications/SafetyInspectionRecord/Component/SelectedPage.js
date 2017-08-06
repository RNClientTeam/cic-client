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
import Loading from "../../../../Component/Loading.js";
import toast from 'react-native-simple-toast';
export default class SelectedPage extends Component {
    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            isLoading:false,
            dataSource: []
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择任务节点" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    onEndReached={this.loadMore.bind(this)}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }
    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={this._clickItem.bind(this, rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={[styles.textSty, {color:'#5476a1'}]} numberOfLines={1}>{rowData.xmbh}</Text>
                    <Text style={styles.textSty} numberOfLines={1}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        this.props.navigator.pop();
        this.props.getSelInfo(rowData);
    }

    componentDidMount() {
        this.getDataFromNet(1);
    }

    loadMore() {
        // this.getDataFromNet(++this.pageNum);
    }

    getDataFromNet(pageNum){
        // axios.get('/psmAqjcjh/aqjcjhSelect4Aqjcjl', {
        //     params: {
        //         userID: GLOBAL_USERID,
        //         pageNum: pageNum,
        //         pageSize: 10,
        //         callID: true
        //     }
        // }).then((res) => {
        //     if (res.code === 1) {
        //         if (res.data.data) {
        //             this.setState({dataSource: res.data.data});
        //         }
        //    } else {
        //        toast.show(res.message);
        //    }
        // }).then((error) => {
        //
        // });
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        width: width,
        height: 0.08 * height,
        justifyContent: 'space-between',
        paddingLeft: 20,
        backgroundColor:'#fff',
        marginBottom: 1,
        paddingVertical: 5,
        alignItems:'center'
    },
    textSty: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 5,
        backgroundColor: '#f1f1f1'
    },
});
