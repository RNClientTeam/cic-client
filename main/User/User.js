"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

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
            department: '单位名称：安全监测监控部'
        }
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

    onPress(rowData) {
        const {navigator} = this.props;
        switch (rowData) {
            case '修改密码':

                break;
            case '修改手势密码':
                if (navigator) {
                    navigator.push({
                        component: SetGesture,
                        name: 'SetGesture'
                    });
                }
                break;
            case '提醒设置':

                break;
            case '版本更新':

                break;
            case '退出登录':
                if (navigator) {
                    navigator.replace({
                        component: Login,
                        name: 'Login'
                    });
                }
                break;
            default:

        }
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this, rowData)}>
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
                    <Text style={styles.department}>{this.state.department}</Text>
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
                <TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this,'退出登录')}>
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
        marginVertical: 15,
        color: 'white',
        fontSize: 17
    },
    recommendView: {
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop: 22,
        backgroundColor: 'transparent'
    },
    userBg: {
        width: width,
        height: height * 0.2624,
        alignItems: 'center'
    }
});
