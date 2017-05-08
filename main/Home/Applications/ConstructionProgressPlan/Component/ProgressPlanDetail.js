/**
 * Created by zhubin on 17/5/8.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import StatusBar from '../../../../Component/StatusBar'

const {width, height} = Dimensions.get('window');

export default class ProgressPlanDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划编制"/>
                <View>
                    <Text>ccc</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    }
});

