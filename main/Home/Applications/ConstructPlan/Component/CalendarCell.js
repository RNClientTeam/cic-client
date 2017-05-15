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
                <TouchableOpacity onPress={() =>this.props.checkThisDay()} style={styles.calendarCellContainer}>
                    <View
                        style={[styles.cellStyle, this.props.beenSelected ? {backgroundColor: '#fe9a25'} : {backgroundColor: '#fff'}]}>
                        <Text
                            style={this.props.beenSelected ? {color: '#fff'} : {color: '#77787a'}}>{this.props.date + ''}</Text>
                        <View
                            style={[styles.pointerView, ((!this.props.hasPlan && this.props.beenSelected)||(this.props.hasPlan && !this.props.beenSelected))?{backgroundColor:'#fe9a25'}:{backgroundColor:'#fff'}]}>
                        </View>
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.calendarCellContainer}/>
        )
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
    cellStyle: {
        width: width / 12.5,
        height: width / 12.5,
        borderRadius: width / 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pointerView: {
        width: 4,
        height: 4,
        borderRadius: 2,
    }
});
