/**
 * Created by zhubin on 17/5/16.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView
} from 'react-native'
import StatusBar from '../../../../Component/StatusBar'

const {width} = Dimensions.get('window');

export default class ArticleDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="公文详情"/>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            标题标题
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            公文类别
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>通告</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            公文重要性
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>一般公文</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            公文性质
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>集团公文</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            拟稿部门
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>配电技术部</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            拟发时间
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>2017/05/10</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            时限
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>普通件</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            密级
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>普通</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            是否发布
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>发布</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            印章名称
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>九州恒通</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            印章数量
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>1</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>
                            发放范围
                        </Text>
                        <View style={styles.verticalPadding}/>
                        <Text>全部</Text>
                    </View>
                    <View style={styles.horizonPadding}/>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            公文内容
                        </Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text>公文内容公文内容公文内容公文内容公文内容公文内容公文内容</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    row: {
        backgroundColor: 'white',
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        height: 0.12 * width,
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textArea: {
        height: 0.36 * width,
        padding: 0.02 * width,
        backgroundColor: 'white'
    },
    verticalPadding: {
        width: 0.2 * width
    },
    horizonPadding: {
        height: 0.02 * width
    },
    bold: {
        fontWeight: 'bold'
    },
    labelColor: {
        color: '#5476a1'
    }
});