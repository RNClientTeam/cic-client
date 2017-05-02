import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class DepartmentItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.getChildren.bind(this)}>
                <View style={styles.depItem}>
                        <View style={styles.depLabel}>
                            <Text>{this.props.dep.name}</Text>
                        </View>
                        <View style={styles.blank}></View>
                        <View style={styles.actionView}>
                            <Text style={styles.action}> > </Text>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    depItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: height*0.07,
        marginLeft: 15,
        borderBottomColor:'#dcdcdc',
        borderBottomWidth: 1
    },
    space: {
        width: 10
    },
    depLabel: {

    },
    blank: {
        flex: 1
    },
    action: {
        color: '#bbbbbb'
    }
});
