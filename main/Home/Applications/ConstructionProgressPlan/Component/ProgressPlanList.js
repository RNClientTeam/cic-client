/**
 * Created by zhubin on 17/5/8.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    SectionList,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ProgressPlanList extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>cccc</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 0.02 * width
    }
});