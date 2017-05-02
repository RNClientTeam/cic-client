/**
 * Created by zhubin on 17/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class EmployeeItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.handleOnClick.bind(this)}>
                <View style={styles.empItem}>
                    <View style={styles.nameLabel}>
                        <Text>{this.props.emp.name}</Text>
                    </View>
                    <View style={styles.blank}></View>
                    <View>
                        <Text> ... </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    handleOnClick() {

    }
}

const styles = StyleSheet.create({
    empItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 15,
        backgroundColor:'#fdfdfe',
        borderBottomColor:'#dcdcdc',
        borderBottomWidth: 1
    },
    nameLabel: {

    },
    blank: {
        flex: 1
    }
});