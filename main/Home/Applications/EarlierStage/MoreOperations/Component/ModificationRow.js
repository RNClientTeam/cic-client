/**
 * Created by zhubin on 17/5/5.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class ModificationRow extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.titleView}>

                </View>
                <Text>666</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#fff",
        borderColor: '#d2d2d2',
        marginLeft: 0.01 * width,
        marginRight: 0.01 * width,
        marginBottom: 0.02 * width,
        paddingLeft: 0.05 * width,
        paddingRight: 0.05 * width,
        height: 0.25 * height,
        borderWidth: 0.5
    },
    titleView: {
        height: 0.05 * height,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    }
});