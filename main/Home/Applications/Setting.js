/**
 * Created by zhubin on 17/5/2.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import StatusBar from '../../Component/StatusBar'
import SettingItem from './Component/SettingItem'

const {width, height} = Dimensions.get('window');

export default class Setting extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar title='常用应用设置' navigator={this.props.navigator}>
                    <TouchableOpacity onPress={this.saveSettings.bind(this)}>
                        <Text style={styles.actionText}>保存</Text>
                    </TouchableOpacity>
                </StatusBar>
                <View style={styles.viewSty}>
                    <View>
                        <View style={styles.frequentApp}>
                            <Text style={styles.frequentAppTitle}>常用设置</Text>
                        </View>
                        {this.createItems()}
                    </View>

                </View>
            </View>
        )
    }
    saveSettings() {

    }

    createItems() {
        var apps = [
            {name: '前期进度计划执行'},
            {name: '工程子项目拆分'},
            {name: '工程范围交接'}
        ];
        return apps.map (function (item, index) {
                    return <SettingItem key={index} app={item}/>
                }
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    viewSty: {
        backgroundColor: '#fdfdfe'
    },
    actionText: {
        color: '#fff'
    },
    frequentApp: {
        height: height*0.07,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        paddingLeft: width*0.02
    },
    frequentAppTitle: {
        color: '#299ce6'
    }
});