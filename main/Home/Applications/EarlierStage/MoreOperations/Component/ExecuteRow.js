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
                        <Text style={styles.status}>完成</Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progress, {width: this.props.data.wcbl * 0.6 * width/100}]}>
                            <Text style={styles.progressText}>{this.props.data.wcbl + '%'}</Text>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                    <View>
                        <Text>{this.props.data.tbsj}</Text>
                    </View>

                </View>
                <View style={styles.sub}>
                    <Text style={styles.subText}>{this.props.data.wcqk}</Text>
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
        height: 0.04 * width,
        backgroundColor: '#e3e3e3'
    },
    progress: {
        height: 0.04 * width,
        backgroundColor: '#ffb432',
        alignItems: 'flex-end',
        justifyContent:'center'
    },
    progressText: {
        color: '#fff',
        fontSize: 0.028 * width,
        marginRight: 0.02 * width,
        textAlign: 'center',
        textAlignVertical: 'center'
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
