/**
 * Created by Nealyang on 2017/4/25.
 * 日历的每一个cell
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
const {width} = Dimensions.get('window');

export default class CalendarCell extends Component {
    render() {

        return (
            this.props.date > 0 ?
                <TouchableOpacity onPress={this.checkThisDay.bind(this, this.props.date)}>
                    <View style={styles.calendarCellContainer}>
                        <Text style={styles.singleDay}>{this.props.date + ''}</Text>
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.calendarCellContainer}/>
        )
    }

    checkThisDay(date) {
        alert(date)
    }
}

const styles = StyleSheet.create({
    calendarCellContainer: {
        width: width / 7.01,
        height: width * 0.1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    singleDay: {
        color: '#77787a'
    }
});
