/**
 * Created by zhubin on 17/5/9.
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

const {width, height} = Dimensions.get('window');

export default class ConstructPlan extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>child2</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 0.02 * width
    }
});
