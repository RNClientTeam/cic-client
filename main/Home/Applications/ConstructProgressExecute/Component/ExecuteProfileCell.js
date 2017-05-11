'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
const {width} = Dimensions.get('window');

export default class ExecuteProfileCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.earlierStageListCell} onPress={this.skipPage.bind(this)}>
                <View style={styles.aboutProject}>
                    <Text style={styles.Time}>{this.props.data.time}</Text>
                    <View style={styles.progressView}>
                        <Text style={{color:'#216fd0',fontSize:13,marginRight:10}}>完成进度</Text>
                        <View style={styles.stateView}>
                            <View style={[styles.compView, {width:width*0.55*0.7}]}/>
                        </View>
                        <Text style={{fontSize:13}}>{this.props.data.schedule}</Text>
                    </View>
                </View>
                <View style={styles.aboutPrincipal}>
                    <Text style={styles.infoStyl}>{this.props.data.infomation}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    skipPage() {

    }

    editPress() {

    }
}

const styles = StyleSheet.create({
    earlierStageListCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        paddingHorizontal: width * 0.01,
        paddingVertical: 10
    },
    Time: {
        color: '#216fd0',
        marginTop: 16,
        marginBottom: 16
    },
    stateView: {
        backgroundColor: '#f2f2f2',
        width:width*0.55,
        height:width*0.035,
        marginRight: 15
    },
    progressView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    compView: {
        backgroundColor: '#fe9a25',
        height:width*0.035,
    },
    infoStyl: {
        color: '#3d3d3d',
        fontSize: 14,
        lineHeight: 24
    }
});
