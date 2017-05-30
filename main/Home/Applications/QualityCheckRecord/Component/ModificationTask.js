/**
 * Created by zhubin on 17/5/30.
 */
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

const {width} = Dimensions.get('window');

export default class ModificationTask extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>任务</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0.02 * width
    }
});