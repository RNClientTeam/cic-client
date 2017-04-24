/**
 * Created by Nealyang on 2017/4/24.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
const {width}  = Dimensions.get('window');
import HomeHeader from './HomeHeader'
export default class Notification extends Component{
    render(){
        return(
            <View style={styles.newNotificationStyle}>
                <TouchableOpacity style={styles.headerContainerStyle}>
                    <HomeHeader src={require('../../../resource/imgs/home/notification.png')} title="最新消息"/>
                    <Text style={styles.arrowsStyle}>></Text>
                </TouchableOpacity>
                <Text style={styles.textContentStyle}>
                    员工提交项目管理计划审批周期为7天，超时未处理计划需要重新提交审批，请各位同事需知。
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newNotificationStyle:{
        backgroundColor: '#fdfdfe',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
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
    }
});