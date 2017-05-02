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

const {width} = Dimensions.get('window');

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
                    <SettingItem/>
                </View>
            </View>
        )
    }
    saveSettings() {

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
    }
});