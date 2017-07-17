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
                data = {
                    "code": 1,
                    "data": [{
                        "id": "8a8180d85***666db03f5",
                        "zgzrbmmc": "市场音效部",
                        "zgzrrmc": "驾驶坤",
                        "dqztmc": "新建任务",
                        "wtlb": "C112038-13005",
                        "zgyq": "昌平老旧小区配电改造(郝庄家园)",
                        "zgzrr": "00000005000138c242a0d9",
                        "zgzrbm": "",
                        "zgzrbm": "2017-01-20 00:00:00",
                        "zgwcsjt": "2017-01-02 00:00:00",
                        "sjwcsjt": 7,
                        "zcjg": ""
                    }],
                    "message": "成功"
                };
                if(data.data){
                    this.setState({
                        dataSource:data.data
                    })
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
