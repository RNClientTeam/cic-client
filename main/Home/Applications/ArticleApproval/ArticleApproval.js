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

import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import ArticleList from './Component/ArticleList'

const {width} = Dimensions.get('window');

export default class ArticleApproval extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="公文审批"/>
                <SearchHeader/>
                <ArticleList navigator={this.props.navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    }
});


