import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'

const {width} = Dimensions.get('window');

export default class DepartmentItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.getChildren.bind(this)}>
                <View style={styles.depItem}>
                        <View style={styles.depLabel}>
                            <Text>{this.props.dep.name}</Text>
                        </View>
                        <View style={styles.blank}></View>
                        <View>
                            <Text> > </Text>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    depItem: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    depLabel: {

    },
    blank: {
        flex: 1
    }
});
