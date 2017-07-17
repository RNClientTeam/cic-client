/**
 * Created by zhubin on 17/5/15.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

const {width} = Dimensions.get('window');

export default class ArticleCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.row}>
                        <Text style={[styles.titleColor]}>{this.props.data.title}</Text>
                        <View style={styles.blank}/>
                        <View style={styles.priority}>
                            <Text style={[styles.white, styles.smallFont]}>{this.props.data.priority}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text>{this.props.data.type}</Text>
                    </View>
                </View>
                <View style={styles.lower}>
                    <View>
                        <View style={styles.row}>
                            <Text style={[styles.smallFont, styles.textColor]}>创建部门:</Text>
                            <View style={styles.padding}/>
                            <Text style={[styles.smallFont, styles.textColor]}>{this.props.data.department}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.smallFont, styles.textColor]}>创建时间:</Text>
                            <View style={styles.padding}/>
                            <Text style={[styles.smallFont, styles.textColor]}>{this.props.data.date}</Text>
                        </View>
                    </View>
                    <View style={styles.blank}/>
                    <TouchableOpacity onPress={()=>{this.props.setModalVisible()}} style={styles.editTouch}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                               style={styles.editImg} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0.02 * width,
        marginLeft: 0.01 * width,
        marginRight: 0.01 * width
    },
    upper: {
        backgroundColor: 'white',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        paddingTop: 0.01 * width,
        paddingBottom: 0.01 * width
    },
    lower: {
        backgroundColor: '#f6f9fa',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        paddingTop: 0.01 * width,
        paddingBottom: 0.01 * width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        paddingTop: 0.01 * width,
        paddingBottom: 0.01 * width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    priority: {
        backgroundColor: '#26c188',
        width: 0.12 * width,
        height: 0.04 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blank: {
        flex: 1
    },
    padding: {
        width: 0.02 * width
    },
    titleColor: {
        color: '#216fd0'
    },
    textColor: {
        color: '#4f74a3'
    },
    white: {
        color: 'white'
    },
    smallFont: {
        fontSize: 0.03 * width
    },
    editImg: {
        width: 22,
        height: 25
    }
});