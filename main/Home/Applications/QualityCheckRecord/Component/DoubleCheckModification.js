/**
 * Created by zhubin on 17/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native'
import LoadMore from "../../../../Component/LoadMore"
import Reload from "../../../../Component/Reload"
import {PullList} from 'react-native-pull';
import ModificationTaskCell from './ModificationTaskCell'

const {width} = Dimensions.get('window');

export default class DoubleCheckModification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    topIndicatorHeight={60}
                    dataSource={this.state.list.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={60}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ModificationTaskCell key={rowID} data={item} navigator={this.props.navigator}/>
        );
    }



    componentDidMount() {
        axios.get('/psmZljcjl/zgrwList', {
            params: {
                userID: GLOBAL_USERID,
                zljcjlId: this.props.id,
                callID: true
            }
        }).then(data => {
            if (data.code === 1) {
                if(data.data){
                    this.setState({
                        dataSource:data.data
                    });
                }
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0.02 * width
    },
    divide: {
        height: 0.02 * width
    }
});
