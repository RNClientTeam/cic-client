/**
 * Created by Nealyang on 2017/4/30.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');

export default class EarlierStageListCell extends Component {
    render() {
        return (
            <View style={styles.earlierStageListCell}>
                <View style={styles.aboutProject}>
                    <View style={styles.numState}>
                        <Text>{this.props.data.number}</Text>
                        <View>
                            <Text>{this.props.data.state}</Text>
                        </View>
                    </View>
                    <View style={styles.projectName}>
                        <Text>{this.props.data.planName}</Text>
                        <Text>{this.props.data.contentNum}</Text>
                        <Text> > </Text>
                    </View>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text>{this.props.data.principal}</Text>
                    <Text>{this.props.data.department}</Text>
                    <Text>{this.props.data.schedule}</Text>
                    <Text>{this.props.data.time}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    aboutProject: {
        width: width * 0.96,
        backgroundColor: '#fff',
        height: width * 0.2
    },
    aboutPrincipal: {
        width: width * 0.96,
        backgroundColor: '#f6f9fa',
        height: width * 0.2
    }, numState: {}, projectName: {}

});