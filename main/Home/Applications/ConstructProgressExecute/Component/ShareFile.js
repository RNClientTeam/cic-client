/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ListView
} from 'react-native'

import ShareFileCell from './ShareFileCell'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import AddData from './AddData'

export default class ShareFile extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData(resolve) {
        axios.get('/psmGxzl/list', {
            params: {
                userID: GLOBAL_USERID,
                bsid: this.props.rowData.gczxId,
                callID: true
            }
        }).then((responseData) => {
            if (responseData.code === 1) {
                this.setState({list: responseData.data});
            }
        }).catch((error) => {

        });
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    topIndicatorHeight={60}
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.state.list)}
                    renderRow={this.renderRow.bind(this)}
                />
                <AddData navigator={this.props.navigator} gczxId={this.props.rowData.gczxId}/>
            </View>
        )
    }


    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ShareFileCell navigator={this.props.navigator} key={rowID} dataSource={item}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    }
});
