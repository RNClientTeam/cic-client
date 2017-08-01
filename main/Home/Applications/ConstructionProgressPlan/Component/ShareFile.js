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
import {PullList} from 'react-native-pull';
import ShareFileCell from './ShareFileCell'
import AddData from './AddData'

const {width, height} = Dimensions.get('window');

export default class ShareFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            dataSource:[],
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    pageSize={5}
                    initialListSize={5}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
                <AddData bsid={this.props.bsid} navigator={this.props.navigator}/>
            </View>
        )
    }


    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ShareFileCell navigator={this.props.navigator} key={rowID} dataSource={item}/>
        );
    }

    componentDidMount() {
        axios.get('/psmGxzl/list',{
            params:{
                userID:GLOBAL_USERID,
                bsid:this.props.bsid,
                callID:true
            }
        }).then(data=>{
            this.setState({
                dataSource:data.data
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    }
});
