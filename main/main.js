"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Navigator,
    Dimensions,
    Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home.js';
import Message from './Message/Message.js';
import User from './User/User.js';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Organization from './Organization/Organization.js';
var {width,height} = Dimensions.get('window');
var tabImg =
              [require('../resource/imgs/tabItem/home.png'),
              require('../resource/imgs/tabItem/message.png'),
              require('../resource/imgs/tabItem/organization.png'),
              require('../resource/imgs/tabItem/user.png')];
var highLightTab =
              [require('../resource/imgs/tabItem/home_highlight.png'),
              require('../resource/imgs/tabItem/message_highlight.png'),
              require('../resource/imgs/tabItem/organization_highlight.png'),
              require('../resource/imgs/tabItem/user_highlight.png')];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home'
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <TabNavigator sceneStyle={styles.flex}>
                    {/**首页**/}
                    {this.renderTabItem('首页', tabImg[0], highLightTab[0], 'Home', Home)}
                    {/**留言板**/}
                    {this.renderTabItem('留言板', tabImg[1], highLightTab[1], 'Message', Message)}
                    {/**组织**/}
                    {this.renderTabItem('组织', tabImg[2], highLightTab[2], 'Organization', Organization)}
                    {/**我的**/}
                    {this.renderTabItem('我的', tabImg[3], highLightTab[3], 'User', User)}
                </TabNavigator>
            </View>
        );
    }

    /**
     * 底部导航
     * @param title 标题
     * @param iconSrc 默认状态图片资源
     * @param selIconSrc 选中状态图片资源
     * @param tabName 路由名字
     * @param tabComponent 路由
     */
    renderTabItem(title, iconSrc, selIconSrc, tabName, Component) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tabName}
                title={title}
                renderIcon={() => <Image source={iconSrc} style={styles.imgSty} resizeMode="contain"/>}
                renderSelectedIcon={() => <Image source={selIconSrc} style={styles.imgSty} resizeMode="contain"/>}
                renderAsOriginal={true}
                selectedTitleStyle={{color:'#216fd0'}}
                onPress={() => {
                    this.setState({selectedTab:tabName});
                    if (tabName === 'Organization') {
                        RCTDeviceEventEmitter.emit('organization');
                    }
                }}>
                <Component navigator={this.props.navigator}/>
            </TabNavigator.Item>
        )
    }

    //判断是否需要重新渲染
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.selectedTab === nextState.selectedTab) {
            return false;
        }
        return true;
    }
}

const styles = StyleSheet.create({
    flex: {
        flex:1
    },
    tabBarHidden: {
        height: 0,
        overflow: 'hidden'
    },
    imgSty: {
        width: 20,
        height: 20
    }
});
