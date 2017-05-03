/**
 * Created by fan on 2017/05/02.
 * 前期进度计划执行-进度计划
 */
"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import SchedulePlanCell from './SchedulePlanCell.js';
import MyTask from './MyTask.js';
var {width, height} = Dimensions.get('window');

export default class SchedulePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage:0
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <View style={styles.segmentView}>
                    <TouchableOpacity onPress={this.changePage.bind(this, 0)}>
                        <View style={[styles.leftView,{backgroundColor:this.state.currentPage===0?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.currentPage===0?'white':'#4fa6ef'}}>我的任务</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changePage.bind(this, 1)}>
                        <View style={[styles.rightView,{backgroundColor:this.state.currentPage===1?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.currentPage===1?'white':'#4fa6ef'}}>全部任务</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    ref={"scrollView"}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <MyTask navigator={this.props.navigator}/>
                    <MyTask navigator={this.props.navigator}/>
                </ScrollView>
            </View>
        );
    }

    changePage(page) {
        if (this.state.currentPage !== page) {
            this.setState({currentPage:page});
            this.refs.scrollView.scrollTo({x:page*width,y:0,animated:true});
        }
    }
}

const styles = StyleSheet.create({
    flex: {
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    segmentView: {
        width: width,
        height: 0.0645 * height,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftView: {
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    },
    rightView: {
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    }
});
