/**
 * Created by zhubin on 17/6/2.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import StatusBar from "../../../../Component/StatusBar"
import DoubleCheckDetail from "./DoubleCheckDetail"
import DoubleCheckModification from './DoubleCheckModification'
import DoubleCheckRecord from './DoubleCheckRecord'
import AddModification from "./AddModification";

const {width} = Dimensions.get('window');

export default class QualityDoubleCheckRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addIcon: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录复查">
                    {
                        this.state.addIcon &&
                        <TouchableOpacity
                            onPress={() => this.addModification()}>
                            <Image style={styles.icon} source={require('../../../../../resource/imgs/home/earlierStage/add.png')}/>
                        </TouchableOpacity>
                    }
                </StatusBar>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor:'#51a5f0',height:2}}
                    onChangeTab={(obj) => {
                        this.setState({addIcon:obj.i===1?true:false});
                    }}
                    initialPage={this.props.initialPage||0}
                    tabBarActiveTextColor='#51a5f0'
                    tabBarInactiveTextColor='#3d3d3d'
                    tabBarBackgroundColor="white">
                    <DoubleCheckDetail id={this.props.data.id} tabLabel="检查记录" navigator={this.props.navigator}/>
                    <DoubleCheckModification id={this.props.data.id} nodeId={this.props.data.nodeId} tabLabel="整改任务" navigator={this.props.navigator}/>
                    <DoubleCheckRecord tabLabel="复查" navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View>
        )
    }
    addModification() {
        this.props.navigator.push({
            name:"AddModification",
            component:AddModification,
            params:{
                id:this.props.data.id,
                nodeId:this.props.data.nodeId
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width:width*0.04,
        height:width*0.04,
        marginHorizontal:10
    }
});
