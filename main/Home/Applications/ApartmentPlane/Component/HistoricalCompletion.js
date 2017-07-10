/**
 * Created by fan on 2017/05/10.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableHighlight,
    Text,
    ListView
} from 'react-native'
const {width, height}  = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class HistoricalCompletion extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource:  [
                {
                    time: '2017/2/16',
                    progress: 100,
                    infomation: '已完成相关工作的100%，进展顺利'
                },
                {
                    time: '2017/2/1',
                    progress: 80,
                    infomation: '已完成相关工作的80%，进展顺利'
                },
                {
                    time: '2017/1/20',
                    progress: 60,
                    infomation: '已完成相关工作的60%，进展顺利'
                },
                {
                    time: '2017/1/17',
                    progress: 40,
                    infomation: '已完成相关工作的40%，进展顺利'
                }
            ]
        }
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="历史完成情况" />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}/>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.topView}>
                    <Text style={styles.timeSty}>{rowData.tbsj}</Text>
                    <View style={styles.progressView}>
                        <Text style={styles.timeSty}>完成进度</Text>
                        <View style={styles.bgView}>
                            <View style={{width:rowData.wcbl/200*width,height: 15, backgroundColor:rowData.wcbl==100?'#24cf71':'#ffb432'}}></View>
                        </View>
                        <Text style={[styles.timeSty, {flex:1, textAlign:'right'}]}>{rowData.wcbl}%</Text>
                    </View>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.infoText}>{rowData.jzms}</Text>
                </View>
            </View>
        );
    }

    componentDidMount() {
        axios.get('/psmBmjh/jzqkList',{
            params:{
                userID:GLOBAL_USERID,
                callID:true,
                jhid:this.props.id
            }
        }).then(data=>{
            if(data.code === 1){
                // TODO
                data = {
                    "code": 1,
                    "data": {
                        "total": 1,
                        "list": [
                            {
                                "id": "0000000330015c3855a4a4",
                                "tbsj": "2017-05-25 08:44:29",
                                "gzndid": "",
                                "jzms": "11",
                                "tbrmc": "刘姗姗",
                                "tbbm": "00000004800138c242a0d9",
                                "bz": "",
                                "gzndnr": "",
                                "tbbmmc": "市场营销二部",
                                "wcbl": 10,
                                "tbr": "ZNDQ1948"
                            }
                        ]
                    },
                    "message": "查询成功"
                }

                this.setState({
                    dataSource:data.data.list
                })

            }
        })
    }


}

const styles = StyleSheet.create({
    earlierStage:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    itemStyle: {
        marginHorizontal: 9,
        marginTop: 10,
        width: width - 18,
        height: 0.192 * height,
        borderWidth: 1,
        borderColor: '#d2d2d2'
    },
    topView: {
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#fff',
        flex: 1
    },
    infoView: {
        width: width - 20,
        height: 0.072 * height,
        backgroundColor: '#f6f9fa',
        justifyContent: 'center',
        paddingLeft: 15
    },
    infoText: {
        fontSize: 14,
        color: '#666'
    },
    timeSty: {
        fontSize: 14,
        color: '#2d649b'
    },
    progressView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bgView: {
        width: 0.5 * width,
        height: 15,
        marginLeft: 12,
        marginRight: 25,
        backgroundColor: '#dbdada'
    }
});
