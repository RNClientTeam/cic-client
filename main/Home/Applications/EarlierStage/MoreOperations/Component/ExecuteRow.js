/**
 * Created by zhubin on 17/5/5.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class ExecuteRow extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.main}>
                    <View>
                        <Text style={styles.status}>{this.props.data.status}</Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progress, {width: this.props.data.progress * 0.6 * width}]}>
                            <Text style={styles.progressText}>{100 * this.props.data.progress + '%'}</Text>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                    <View>
                        <Text>{this.props.data.date}</Text>
                    </View>

                </View>
                <View style={styles.sub}>
                    <Text style={styles.subText}>{this.props.data.desc}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingRight: 0.02*width,
        paddingLeft: 0.02*width,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07
    },
    blank: {
        flex: 1
    },
    status: {
        color: '#5476a1',
        marginRight: 0.04*width
    },
    progressBar: {
        width: 0.6 * width,
        height: 0.035 * width,
        backgroundColor: '#e3e3e3'
    },
    progress: {
        height: 0.035 * width,
        backgroundColor: '#ffb432',
        alignItems: 'flex-end',
        paddingRight: 0.02 * width
    },
    progressText: {
        color: '#fff',
        fontSize: 0.033 * width,
        height: 0.035 * width
    },
    sub: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: height*0.04
    },
    subText: {
        color: '#999'
    }
});