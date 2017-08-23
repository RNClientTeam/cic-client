"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Navigator,
    Dimensions,
    Image,
    DeviceEventEmitter,
    Platform,
    AppState
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home.js';
import Message from './Message/Message.js';
import User from './User/User.js';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Organization from './Organization/Organization.js';
var {width,height} = Dimensions.get('window');
import toast from 'react-native-simple-toast';
import JPush, {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';
import JGNotification from "./Home/Applications/Component/JGNotification.js";
import ArticleDetail from "./Home/Applications/ArticleApproval/Component/ArticleDetail.js";
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
            selectedTab: 'Home',
            showNotification: false,
            notificationTitle: '通知标题',
            notificationContent: '通知的内容',
            notificationType: 1
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
                {this.state.showNotification && <JGNotification
                    title={this.state.notificationTitle}
                    showNotification={this.state.showNotification}
                    content={this.state.notificationContent}
                    type={this.state.notificationType}
                    hideNotification={this._hideNotification.bind(this)}/>}
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
                onPress={() => this.changeTab(tabName)}>
                <Component navigator={this.props.navigator}/>
            </TabNavigator.Item>
        )
    }

    changeTab(tabName) {
        this.setState({selectedTab:tabName});
        //抛出进入组织tab的事件
        if (tabName === 'Organization') {
            DeviceEventEmitter.emit('enterOrganization', {level: 0});
        }
    }

    componentDidMount() {
        //添加推送相关
        this.addPush();
        if (Platform.OS === 'android') {
            storage.load({
                key: 'notificationInfo'
            }).then((res)=>{
                if (res) {
                    let extra = JSON.parse(res._data['cn.jpush.android.EXTRA']);
                    this.showNoti(extra, res);
                    storage.remove({key: 'notificationInfo'});
                }
            }).catch(err => {

            });
        }
    }

    _hideNotification() {
        this.setState({
            showNotification: false
        });
        if(this.state.notificationType===2){
            this._goToArticleDetail(this.extra);
        }
    }

    addPush() {
        JPush.requestPermissions();
        this.pushlisteners = [
            JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
            JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
        ];
    }

    //app内部接收到推送
    onReceiveMessage(message) {
        if (Platform.OS === 'android') {
            let extra = JSON.parse(message._data['cn.jpush.android.EXTRA']);
            this.showNoti(extra, message);
        } else {
            this.showNoti(message._data);
        }
    }

    showNoti(extra, message) {
        this.extra = extra;
        if (extra.type == 2) {
            this.setState({
                showNotification: true,
                notificationTitle: '推送消息',
                notificationContent: '收到一条公文推送相关消息,点击确定查看消息',
                notificationType: 2
            });
        } else {
            if (Platform.OS === 'android') {
                this.setState({
                    showNotification: true,
                    notificationTitle: message._data['cn.jpush.android.NOTIFICATION_CONTENT_TITLE'],
                    notificationContent: message._data['cn.jpush.android.ALERT'],
                    notificationType: 1
                });
            } else {
                this.setState({
                    showNotification: true,
                    notificationTitle: extra.aps.alert.title,
                    notificationContent: extra.aps.alert.body,
                    notificationType: 1
                });
            }
        }
    }

    //推送
    _goToArticleDetail(extra) {
        axios.get('/msg/getAction', {
            params: {
                msgID: extra.id,
                userID: GLOBAL_USERID,
                callID: true
            }
        }).then(data => {
            if (data.code === 1) {
                this.props.navigator.push({
                    name: "ArticleDetail",
                    component: ArticleDetail,
                    params: {
                        tag: 'jpush',
                        id: data.data.params.id
                    }
                });
            } else {
                toast.show(data.message);
            }
        }).catch(err => {
            toast.show('推送服务异常')
        })
    }

    //从通知栏打开推送
    onOpenMessage(message) {
        if (Platform.OS === 'android') {
            let extra = JSON.parse(message._data['cn.jpush.android.EXTRA']);
            this.showNoti(extra, message);
        } else {
            this.showNoti(message._data);
        }
    }

    componentWillUnmount() {
        //移除推送的监听
        this.pushlisteners.forEach(listener=> {
            JPush.removeEventListener(listener);
        });
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
