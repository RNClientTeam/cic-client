/**
 * Created by zhubin on 17/5/4.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

const {width, height}  = Dimensions.get('window');

export default class TaskProfile extends Component {
    render() {
        return (
            <View style={styles.viewSty}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={styles.label}>责任人</Text>
                            <Text>{this.props.data.zrr}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>当前状态</Text>
                            <Text>{this.props.data.zt}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>计划开始时间</Text>
                            <Text>{this.props.data.sDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>计划完成时间</Text>
                            <Text>{this.props.data.eDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>实际开始时间</Text>
                            <Text>{this.props.data.sjkssj}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>实际结束时间</Text>
                            <Text>{this.props.data.sjjssj}</Text>
                        </View>
                        <View style={{height: width*0.02, backgroundColor: '#f2f2f2'}}/>
                        <View style={styles.row}>
                            <Text style={{color: '#5476a1'}}>主要工作内容详细说明</Text>
                        </View>
                        <View style={styles.textArea}>
                            <Text>{this.props.data.rwnr}</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认完成</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewSty: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    content: {
        backgroundColor: '#fdfdfd',
        marginTop: 0.02*width
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    label: {
        color: '#5476a1',
        width: 0.3*width,
    },
    textArea: {
        height: height*0.15,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
    },
    button: {
        backgroundColor: '#216fd0',
        height: height*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width*0.05,
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});
