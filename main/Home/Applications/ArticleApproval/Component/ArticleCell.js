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
import ArticleDetail from "./ArticleDetail";

const {width} = Dimensions.get('window');

export default class ArticleCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._skipToDetail.bind(this)}>
                    <View style={styles.upper}>
                        <View style={styles.row}>
                            <Text style={[styles.titleColor]}>{this.props.data.gwmc}</Text>
                            <View style={styles.blank}/>
                            <View style={styles.priority}>
                                <Text style={[styles.white, styles.smallFont]}>{this.props.data.gwmj}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text>{this.props.data.gwxz}-{this.props.data.gwzyx}-{this.props.data.gwl}</Text>
                        </View>
                    </View>
                    <View style={styles.lower}>
                        <View>
                            <View style={styles.row}>
                                <Text style={[styles.smallFont, styles.textColor]}>创建部门:</Text>
                                <View style={styles.padding}/>
                                <Text style={[styles.smallFont, styles.textColor]}>{this.props.data.bmmc}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.smallFont, styles.textColor]}>创建时间:</Text>
                                <View style={styles.padding}/>
                                <Text style={[styles.smallFont, styles.textColor]}>{this.props.data.cjsj}</Text>
                            </View>
                        </View>
                        <View style={styles.blank}/>
                        <TouchableOpacity onPress={() => {
                            this.props.setModalVisible(this.props.data)
                        }} style={styles.editTouch}>
                            <Image source={require('../../../../../resource/imgs/home/earlierStage/edit.png')}
                                   style={styles.editImg} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    _skipToDetail() {
        this.props.navigator.push({
            name: "ArticleDetail",
            component: ArticleDetail,
            params: {
                id: this.props.data.id,
                data:this.props.data
            }
        })
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