/**
 * Created by zhubin on 17/5/5.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class ModificationRow extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.titleView}>
                    <Text style={{color: '#637388'}}>延期变更申请时间: {this.props.data.sqsj}</Text>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.applicant}>
                        <Text style={styles.bold}>
                            申请人:  {this.props.data.sqr}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.textColor, styles.text]}>
                            原计划时间: {this.props.data.yjhkssj} - {this.props.data.yjhjssj}
                        </Text>
                        <Text style={[styles.textColor, styles.text]}>
                            新计划时间: {this.props.data.xjhkssj} - {this.props.data.xjhjssj}
                        </Text>
                        <Text style={[styles.textColor, styles.text]}>
                            变更情况说明: {this.props.data.bgsm}
                        </Text>
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#fff",
        borderColor: '#d2d2d2',
        marginLeft: 0.01 * width,
        marginRight: 0.01 * width,
        marginBottom: 0.02 * width,
        paddingLeft: 0.05 * width,
        paddingRight: 0.05 * width,
        //height: 0.25 * height,
        borderWidth: 0.5
    },
    titleView: {
        height: 0.05 * height,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        justifyContent: 'center'
    },
    detailView: {
        paddingLeft: 0.04 * width,

    },
    applicant: {
        justifyContent: 'center',
        height: 0.07 * height
    },
    text: {
        paddingBottom: 0.02 * width,
        fontSize: 0.035 * width
    },
    bold: {
        fontWeight: 'bold'
    },
    textColor: {
        color: '#666'
    }
});