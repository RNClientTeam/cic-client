"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ReviewRecord extends Component {
    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>复查时间</Text>
                    <Text style={styles.valueText}>2017/3/18</Text>
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>复查人</Text>
                    <Text style={styles.valueText}>潘俊涛</Text>
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>附件</Text>
                    <Text style={{fontSize:15,color:'#216fd0'}}>复查记录.pdf</Text>
                </View>

                <View style={[styles.viewStyle, {marginTop:10}]}>
                    <Text style={styles.keyText}>整改复查结果</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.valueText}>整改完成</Text>
                </View>

                <View style={styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={this.saveAndCommit.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                            <Text style={styles.btnText}>保存并提交</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                            <Text style={styles.btnText}>保存</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }

    saveAndCommit() {

    }

    save() {

    }

}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 9
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1',
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        marginTop:1,
        justifyContent: 'space-between'
    },
    bottomView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnView: {
        height: 0.06 * height,
        width: 0.4 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    }
});
