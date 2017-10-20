/**
 * Created by Nealyang on 2017/4/24.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ListView
} from 'react-native'
const {width}  = Dimensions.get('window');
import HomeHeader from './HomeHeader'
import UrlWebView from "../../Component/UrlWebView";
import Toast from 'react-native-simple-toast';
import {PullList} from 'react-native-pull';
export default class Notification extends Component{

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render(){
        return(
            <View style={styles.newNotificationStyle}>
                <View style={styles.headerContainerStyle}>
                    <HomeHeader src={require('../../../resource/imgs/home/notification.png')} title="最新消息"/>
                    <Text style={styles.arrowsStyle}>></Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        )
    }

    _renderRow(rowData,rowID){
        return(
            <TouchableOpacity style={styles.cellStyle} onPress={this._skipPage.bind(this,rowData.url)}>
                <Text style={styles.textContentStyle}>
                    {rowData.text}
                </Text>
            </TouchableOpacity>
        )
    }

    _skipPage(url){
        if(url !== ''&&url){
            if(url.indexOf('http')=== -1){
                this.props.navigator.push({
                    name:'webView',
                    component:UrlWebView,
                    params:{
                        url:`http://${url}`
                    }
                })
            }else{
                this.props.navigator.push({
                    name:'webView',
                    component:UrlWebView,
                    params:{
                        url:url
                    }
                })
            }

        }else{
            Toast.show('没有需要打开的连接');
        }
    }

    componentWillReceiveProps(props) {
        if(props.dataSource){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(props.dataSource)
            })
        }

    }
}

const styles = StyleSheet.create({
    newNotificationStyle:{
        backgroundColor: '#fdfdfe',
        // borderBottomWidth: 1,
        // borderBottomColor: '#dcdcdc',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1,
        marginTop: 10,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingBottom:width*0.04
    },
    headerContainerStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    arrowsStyle:{
        color:'#b3b3b4',
        fontSize:20
    },
    textContentStyle:{
        color:'#333',
        lineHeight:20
    },
    cellStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:width*0.02,
        paddingTop:width*0.02
    }

});