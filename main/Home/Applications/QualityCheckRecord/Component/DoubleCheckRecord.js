/**
 * Created by zhubin on 17/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import KeyValueLeft from "../../../../Component/KeyValueLeft"
import KeyValueRight from "../../../../Component/KeyValueRight"
import KeyTime from "../../../../Component/KeyTime"
import LabelTextArea from "../../../../Component/LabelTextArea"

const {width} = Dimensions.get('window');

export default class DoubleCheckRecord extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.divide}/>
                    <KeyTime propKey="复查时间"/>
                    <KeyValueRight propKey="复查人" defaultValue="王娜"/>
                    <LabelTextArea label="整改复查结果"/>
                    <View style={styles.divide}/>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>附件</Text>
                    </View>
                    <View style={styles.attachment}>
                        <View style={styles.attachmentLabel}>
                            <Text style={{color: '#666'}}>文件名.pdf</Text>
                        </View>
                        <View style={styles.attachmentContent}>
                            <View style={styles.square}>
                                <Text style={{fontSize: 0.1 * width, color: "#d2d2d2"}}>+</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divide}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    divide: {
        height: 0.02 * width
    },
    row: {
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        height: 0.12 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    attachment: {
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        backgroundColor: 'white'
    },
    attachmentLabel: {
        height: 0.12 * width,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    attachmentContent: {
        paddingTop: 0.02 * width,
        paddingBottom: 0.02 * width
    },
    square: {
        height: 0.2 * width,
        width: 0.2 * width,
        borderWidth: 1.5,
        borderColor: '#d2d2d2',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelColor: {
        color: '#5476a1'
    }
});