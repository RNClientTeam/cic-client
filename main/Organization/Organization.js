"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import StatusBar from '../Component/StatusBar'
import DepartmentItem from './Component/DepartmentItem'
import EmployeeItem from './Component/EmployeeItem'
import Loading from "../Component/Loading"
import axios from 'axios'

const {width, height} = Dimensions.get('window');

/**
 *  props中type dep为选择部门, emp为选择员工
 */
export default class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            isLoading: false,

            //type: 'emp'
        };
    }

    componentDidMount() {
        //选择部门 只需查询部门列表
        if (this.props.type === 'dep')
            this.getDeps('ROOT', 0, 1);
        else
            this.getDeps(this.props.depId||'');
        //监听切换到组织tab
        this.listener = DeviceEventEmitter.addListener('enterOrganization',
            (event) => {
                if (event.level === 0) {
                    let tmp = [];
                    tmp.push(this.deps);
                    this.setState({deps: this.deps.item});
                }
            });
    }

    //移除通知监听
    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
            this.listener = null;
        }
    }

    render() {
        let statusBar;
        //有parent的部门, status bar才有返回箭头
        if (this.state.deps.length &&
            this.state.deps[0] &&
            this.state.deps[0].parent && this.state.deps[0].parent.parent) {
            statusBar =
                <StatusBar
                    title="组织"
                    backButtonFun = {this.goBack.bind(this, this.state.deps)}
                />
        } else {
            statusBar =
                <StatusBar
                    title="组织"
                    notBack = {true}
                />
        }

        let action;
        if (this.props.type === 'dep' || this.props.type === 'emp') {
            action = <TouchableOpacity onPress={() => this.submit()}>
                <Text style={{color: 'white'}}>确定</Text>
            </TouchableOpacity>;
        } else {
            action = <View/>
        }

        return(
            <View style={styles.container}>
                {this.props.getInfo || this.props.type === 'dep' || this.props.type === 'emp'?
                    <StatusBar navigator={this.props.navigator} title="请选择"
                               notBack={
                                   !(this.state.deps.length &&
                                    this.state.deps[0] &&
                                    this.state.deps[0].parent && this.state.deps[0].parent.parent)
                               }
                               backButtonFun = {this.goBack.bind(this, this.state.deps)}>
                        {action}
                    </StatusBar> :statusBar}
                <ScrollView
                    style={{height: height}}
                    ref={(scrollView) => { this._scrollView = scrollView}}>

                    <View style={styles.viewSty}>
                        {this.renderRows(this.state.deps)}
                    </View>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    submit() {
        let selects = [];
        selects = this.state.deps.filter(item => item.isChecked).map((item) => ({id: item.id, name: item.name}));
        //可以被被调用的外部方法, 返回选中的emp或者dep的数组
        this.props.select(selects);

        this.props.navigator.pop();
    }

    // renderDeps() {
    //     let dep = [];
    //     dep.push(<DepartmentItem key={0} getChildren={this.getChildren.bind(this, this.deps)} dep={this.deps}/>);
    //     this.setState({deps: dep});
    // }

    getDeps(root, deep, includeUser) {
        var userID = GLOBAL_USERID,
            root = root || 'ROOT',
            deep = deep || 0,
            includeUser = includeUser || 0,
            callID = '11';
        let props = {
            userID: userID,
            root: root,
            deep: deep,
            includeUser: includeUser,
            callID: callID
        };
        this.setState({isLoading: true});
        axios.get('/org/list', {
            params: props
        }).then(response => {
            this.setState({isLoading: false});
            this.deps = response.data.item;
            this.depsConstructor(this.deps);
            let tmp = [];
            tmp.push(this.deps);
            this.setState({deps: this.deps.item});
            // //从人员变更接口进入
            // if (this.props.getInfo)
            //     this.setState({deps: this.deps.items});
            // else //从组织tab进入
            //     this.setState({deps: tmp});
        });
    }

    onClick(item) {
        let tmp = this.state.deps.slice(0);
        for(let i = 0;i<tmp.length;i++){
            if(tmp[i].id === item.id){
                tmp[i].isChecked = !tmp[i].isChecked;
            }
        }
        this.setState({deps: tmp});
    }

    getChildren(dep) {
        //let children = [], deps = [], emps = [];
        if (dep.item && dep.item.length) {
            this.setState({deps: dep.item});
        }
    }

    renderRows(items) {
        let depArray = [], empArray = [];
        for (let i = 0; i < items.length; i++) {
            //清空选中状态
            //items[i].isChecked = false;
            if (items[i].isuser === '0') {
                if (this.props.type && this.props.type === 'dep') {
                    depArray.push(<DepartmentItem dep={items[i]} key={i} type="dep"
                                              onClick={() => this.onClick(items[i])}
                                              isChecked={items[i].isChecked}
                                              getChildren={this.getChildren.bind(this, items[i])}/> );
                } else {
                    depArray.push(<DepartmentItem dep={items[i]} key={i}
                                              getChildren={this.getChildren.bind(this, items[i])}/> );
                }

            }
            else  {
                if (this.props.type && this.props.type === 'emp') {
                    empArray.push(<EmployeeItem getInfo={this.props.getInfo}
                                            type="emp"
                                            onClick={() => this.onClick(items[i])}
                                            isChecked={items[i].isChecked}
                                            navigator={this.props.navigator} emp={items[i]} key={i}/>);
                } else {
                    empArray.push(<EmployeeItem getInfo={this.props.getInfo}
                                            navigator={this.props.navigator} emp={items[i]} key={i}/>);
                }
            }

        }
        return depArray.concat(empArray);
    }

    goBack(deps) {
        let dep = deps[0];
        if (dep.parent && dep.parent.parent) {
            this.setState({deps: dep.parent.parent.item});
        }
        // else if (dep.parent) {
        //     let tmp = [];
        //     tmp.push(this.deps);
        //     this.setState({deps: tmp});
        // }
    }


    /**
     * 递归给每个item添加父类
     */
    depsConstructor(dep) {
        if (dep.item && dep.item.length) {
            for (let i = 0; i < dep.item.length; i++) {
                dep.item[i].parent = dep;
                this.depsConstructor(dep.item[i]);
            }
        }
        return
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    viewSty: {
        marginTop: 10,
        backgroundColor:'#fdfdfe',
    }
});
