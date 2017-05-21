/**
 * Created by fan on 2017/05/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
const {width, height} = Dimensions.get('window');
import AccomplishProgress from './AccomplishProgress.js';
export default class ReformTaskCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.reformTaskCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <Text style={{color:'#216fd0',fontSize:15}} numberOfLines={1}>{this.props.data.question}</Text>
                        <View style={styles.stateView}>
                            <Text style={styles.stateText}>{this.props.data.state}</Text>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.principal}</Text>
                        <Text style={[{marginRight: 15}, styles.textStyle]}>{this.props.data.department}</Text>
                        <Text style={styles.textStyle}>{this.props.data.time}</Text>
                        <Text style={[styles.textStyle, {flex:1,textAlign:'right'}]}>></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        this.props.navigator.push({
            component: AccomplishProgress,
            name: 'AccomplishProgress'
        });
    }
}

const styles = StyleSheet.create({
    reformTaskCell: {
        marginBottom: width * 0.03,
        marginHorizontal: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
    },
    aboutProject: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 0.084*height,
        paddingBottom: 5
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 0.085 * height,
        flexDirection: 'row'
    },
    projectName: {
        lineHeight: 21,
        paddingBottom: 15,
        fontSize: 14,
        color: '#3d3d3d'
    },
    textStyle: {
        color:'#4f74a3',
        fontSize: 14
    },
    stateView: {
        backgroundColor: '#23aee8',
        width:width*0.12,
        height:width*0.05,
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03},
    editTouch: {
        position: 'absolute',
        top: 22,
        right: 18,
    },
    editImg: {
        width: 22,
        height: 25
    }

});
