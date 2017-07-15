"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import StatusBar from '../../../../Component/StatusBar.js';
import CheckRecord from './CheckRecord.js';
import ReformTask from './ReformTask.js';
import ReviewRecord from './ReviewRecord.js';

export default class RectifyTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addIcon: false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="下达整改任务" navigator={this.props.navigator}>
                    {
                        this.state.addIcon &&
                        <TouchableOpacity
                            onPress={() => this.addModification()}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/add.png')}/>
                        </TouchableOpacity>
                    }
                </StatusBar>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2, width:width*0.25,marginLeft:width*0.04}}
                    onChangeTab={(obj) => {
                        this.setState({addIcon:obj.i===1?true:false});
                    }}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="#fff">
                    <CheckRecord tabLabel='检查记录' navigator={this.props.navigator} data={this.props.data}/>
                    <ReformTask tabLabel='整改任务' navigator={this.props.navigator} data={this.props.data}/>
                    <ReviewRecord tabLabel="复查记录" navigator={this.props.navigator} data={this.props.data}/>
                </ScrollableTabView>
            </View>
        );
    }

    addModification() {
        // this.props.navigator.push({
        //     name:"AddModification",
        //     component:AddModification,
        //     params:{
        //         id:this.props.data.id,
        //         nodeId:this.props.data.nodeId
        //     }
        // })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    icon: {
        width: 0.04*width,
        height: 0.04*width
    }
})
