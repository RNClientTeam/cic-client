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

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home.js';
import Message from './Message/Message.js';
import User from './User/User.js';
import Organization from './Organization/Organization.js';
var {width,height} = Dimensions.get('window');
var tabImg = [require('../resource/imgs/login/ic_user.png')];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideBottomTab: false,
            selectedTab: 'Home'
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <TabNavigator sceneStyle={[styles.flex, this.state.hideBottomTab && {paddingBottom:0}]}
                    tabBarStyle={this.state.hideBottomTab && styles.tabBarHidden}>
                    {/**首页**/}
                    {this.renderTabItem('首页', tabImg[0], tabImg[0], 'Home', Home)}
                    {/**留言板**/}
                    {this.renderTabItem('留言板', tabImg[0], tabImg[0], 'Message', Message)}
                    {/**组织**/}
                    {this.renderTabItem('组织', tabImg[0], tabImg[0], 'Organization', Organization)}
                    {/**我的**/}
                    {this.renderTabItem('我的', tabImg[0], tabImg[0], 'User', User)}
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
    renderTabItem(title, iconSrc, selIconSrc, tabName, tabComponent) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tabName}
                title={title}
                renderIcon={() => <Image source={iconSrc} style={styles.imgSty}/>}
                renderSelectedIcon={() => <Image source={selIconSrc} style={styles.imgSty}/>}
                renderAsOriginal={true}
                selectedTitleStyle={{color:'#99000b'}}
                onPress={() => {this.setState({selectedTab:tabName});}}>
                <Navigator
                    initialRoute={{
                        name:tabName,
                        component:tabComponent
                    }}
                    configureScene={this.configureScene}
                    renderScene={(route, navigator)=>{
                        return (
                            <route.component
                                {...route.params}
                                navigator={navigator}
                                hideTabbar={this.hideTabbar.bind(this)}/>
                        );
                    }}
                />
            </TabNavigator.Item>
        )
    }

    /**
     * 配置场景动画
     * @param route 路由
     * @param routeStack 路由栈
     * @returns {*} 动画
     */
    configureScene(route, routeStack) {
        if (route.type === 'fade') {
            return Navigator.SceneConfigs.FadeAndroid; // 渐变弹出
        }
        return Navigator.SceneConfigs.PushFromRight; // 默认右侧弹出
    }

    //判断是否需要重新渲染
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.selectedTab === nextState.selectedTab && this.state.hideBottomTab === nextState.hideBottomTab) {
            return false;
        }
        return true;
    }

    //修改底部导航栏的显示状态
    hideTabbar(hidden) {
        this.setState({hideBottomTab: hidden});
    }
}

const styles = StyleSheet.create({
    flex: {
        flex:1
    },
    tabBarHidden: {
        height: 0,
        overflow: 'hidden'
    }
});
