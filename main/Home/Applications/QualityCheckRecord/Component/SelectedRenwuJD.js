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
export default class SelectedRenwuJD extends Component {
    constructor(props) {
        super(props);
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
                    scrollEnabled={false}
                    enableEmptySections={true}
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
                    <Text style={[styles.textSty, {color:'#5476a1'}]} numberOfLines={1}>{rowData.xmgh}</Text>
                    <Text style={styles.textSty} numberOfLines={1}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _clickItem(rowData) {
        this.props.navigator.pop();
        this.props.getFirstInfo(rowData);
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    getDataFromNet(){
        axios.get('/psmZljcjl/rwjdxz', {
            params: {
                userID: GLOBAL_USERID,
                callID: true
            }
        }).then((res) => {
            if (res.code === 1) {
                if (res.data.list) {
                    this.setState({dataSource: res.data.list});
                }
           } else {
               toast.show(res.message);
           }
        }).then((error) => {

        });
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
        height: 1,
        backgroundColor: '#f1f1f1'
    },
});
