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
import KeyValueLeft from "../../../../Component/KeyValueLeft";

const {width} = Dimensions.get('window');

export default class ArticleDetail extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         gwlb:'',
    //         gwzyx:''
    //     }
    // }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="公文详情"/>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            {this.props.data.gwmc}
                        </Text>
                    </View>
                    <KeyValueLeft propsKey="公文类别" propsValue={this.props.data.gwlb}/>
                    <KeyValueLeft propsKey="公文重要性" propsValue={this.props.data.gwzyx}/>
                    <KeyValueLeft propsKey="公文性质" propsValue={this.props.data.gwxz}/>
                    <KeyValueLeft propsKey="拟稿部门" propsValue={this.props.data.bmmc}/>
                    <KeyValueLeft propsKey="拟发时间" propsValue={this.props.data.cjsj}/>
                    <KeyValueLeft propsKey="时限" propsValue={this.props.data.gwsx}/>
                    <KeyValueLeft propsKey="密级" propsValue={this.props.data.gwmj}/>
                    <KeyValueLeft propsKey="是否发布" propsValue={this.props.data.sffb}/>
                    <KeyValueLeft propsKey="印章名称" propsValue={this.props.data.yzmc}/>
                    <KeyValueLeft propsKey="印章数量" propsValue={this.props.data.yzsl}/>
                    <KeyValueLeft propsKey="发放范围" propsValue={this.props.data.fwtype}/>
                    <View style={styles.horizonPadding}/>
                    <View style={styles.row}>
                        <Text style={[styles.bold]}>
                            公文内容
                        </Text>
                    </View>
                    <View style={styles.textArea}>
                        <Text>{this.props.data.nr}</Text>
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