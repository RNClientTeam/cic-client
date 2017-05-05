"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ListView,
    Image,
    TouchableHighlight,
    Alert,
    AsyncStorage
} from 'react-native';

import {getKey} from '../Util/Util.js';
import SetGesture from './SetGesture';
import Login from '../Login.js';
var {width, height} = Dimensions.get('window');
var dataSource=['修改密码','修改手势密码','提醒设置','版本更新'];
var imgNames = [
    require('../../resource/imgs/user/lock.png'),
    require('../../resource/imgs/user/gesture.png'),
    require('../../resource/imgs/user/remind.png'),
    require('../../resource/imgs/user/update.png'),
    require('../../resource/imgs/user/logout.png')
];

export default class User extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            username: '王韵杰',
            recommend: '安全勘测工程师',
            department: '安全监测监控部'
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(getKey('userMessage'), (error, result) => {
            if (result) {
                let userMessage = JSON.parse(result);
                this.setState({
                    department: userMessage.companyName,
                    username: userMessage.userID,
                    recommend: userMessage.deptName
                });
            }
        });
    }

    render() {
        return(
            <ListView style={styles.viewSty}
                renderRow={this.renderRow.bind(this)}
                dataSource={this.ds.cloneWithRows(dataSource)}
                renderHeader={this.renderHeader.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                renderSeparator={this.renderSeparator.bind(this)}
                scrollEnabled={false}>
            </ListView>
        );
    }

    onPress(index) {
        const {navigator} = this.props;
        if (index == 0) {
            
        } else if (index == 1) {
            navigator.push({
                component: SetGesture,
                name: 'SetGesture'
            });
        } else if (index == 2) {

        } else if (index == 3) {

        } else {
            Alert.alert('温馨提示', '确定退出登录？',[
                {text: '取消'},
                {text: '确定', onPress() {
                    navigator.replace({
                        component: Login,
                        name: 'Login'
                    });
                }}
            ]);
        }
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this, rowId)}>
                <View style={styles.rowSty}>
                    <Image source={imgNames[rowId]} style={styles.imgSty} resizeMode='contain'/>
                    <Text style={styles.rowDataSty}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <Image source={require('../../resource/imgs/user/user_bg.png')} style={styles.userBg}>
                    <Image source={require('../../resource/imgs/user/default_icon.png')} style={styles.userIcon}/>
                    <Text style={styles.userName}>{this.state.username}</Text>
                    <View style={styles.recommendView}>
                        <Image source={require('../../resource/imgs/user/recommend.png')} style={styles.recommendImg}/>
                        <Text style={styles.recommendText}>{this.state.recommend}</Text>
                    </View>
                    <Text style={styles.department}>单位名称：{this.state.department}</Text>
                </Image>
                <View style={styles.headerTail}>
                </View>
            </View>
        );
    }

    renderFooter() {
        return (
            <View>
                <View style={styles.footerView}>
                </View>
                <TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this)}>
                    <View style={styles.rowSty}>
                        <Image source={imgNames[4]} style={styles.imgSty} resizeMode='contain'/>
                        <Text style={styles.rowDataSty}>退出登录</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    renderSeparator() {
        return (
            <View style={styles.separatorSty}>
                <View style={styles.separatorLine}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    header: {
        width: width,
        height: height * 0.3851,
        backgroundColor: '#216fd0',
        justifyContent: 'flex-end'
    },
    headerTail: {
        width: width,
        height: height * 0.0228,
        backgroundColor: '#f2f2f2',
        marginBottom: -1
    },
    rowSty: {
        flexDirection: 'row',
        width: width,
        height: height*0.0705,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    imgSty: {
        width: 22,
        height: 22
    },
    rowDataSty: {
        marginLeft: 15,
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorSty: {
        height:1,
        paddingLeft: 57,
        backgroundColor:'white'
    },
    separatorLine: {
        flex: 1,
        backgroundColor:'#f2f2f2'
    },
    footerView: {
        backgroundColor:'#f2f2f2',
        height: 17,
        width: width
    },
    userIcon: {
        width: 0.0997*height,
        height: 0.0997*height
    },
    userName: {
        marginTop: 12,
        color: 'white',
        fontSize: 17
    },
    recommendView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 5
    },
    recommendText: {
        fontSize: 12,
        color: 'white'
    },
    recommendImg: {
        width: 13,
        height: 15,
        marginRight: 10
    },
    department: {
        color: 'white',
        fontSize: 11,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    userBg: {
        width: width,
        height: height * 0.2624,
        alignItems: 'center'
    }
});
