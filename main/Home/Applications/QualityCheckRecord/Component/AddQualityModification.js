/**
 * Created by zhubin on 17/6/1.
 */
/**
 * Created by zhubin on 17/6/1.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar"

const {width} = Dimensions.get('window');

export default class AddModification extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="新建质量检查记录整改"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});