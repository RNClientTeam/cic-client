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
var {width, height} = Dimensions.get('window');
var dataSource=['修改密码','修改手势密码','提醒设置','版本更新'];

export default class User extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
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

    onPress(rowData) {
        if (rowData === '修改手势密码') {
            const {navigator} = this.props;
            if (navigator) {
                navigator.push({
                    component: SetGesture,
                    name: 'SetGesture'
                });
            }
        } else {
            alert(rowData);
        }
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this, rowData)}>
                <View style={styles.rowSty}>
                    <Image source={require('../../resource/imgs/login/ic_lock.png')} style={styles.imgSty} resizeMode='contain'/>
                    <Text style={styles.rowDataSty}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderHeader() {
        return (
            <View style={styles.header}>
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
                        <Image source={require('../../resource/imgs/login/ic_lock.png')} style={styles.imgSty} resizeMode='contain'/>
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
        alignItems:'center'
    },
    headerTail: {
        width: width,
        height: height * 0.0228,
        backgroundColor: '#f2f2f2',
        position:'absolute',
        bottom:-1
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
    }
});
