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
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import StatusBar from '../Component/StatusBar'
import DepartmentItem from './Component/DepartmentItem'
import EmployeeItem from './Component/EmployeeItem'
import Loading from "../Component/Loading"
import axios from 'axios'

const {width, height} = Dimensions.get('window');

export default class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            isLoading: false,
            //type dep为选择部门, emp为选择员工
            type: 'dep'
        };
    }

    componentDidMount() {
        //监听切换到组织tab
        this.listener = RCTDeviceEventEmitter.addListener('organization', () => {
            this.renderDeps();
        });
        //选择部门 只需查询部门列表
        if (this.state.type === 'dep')
            this.getDeps('ROOT', 0, 1);
        else
            this.getDeps();
        this.listener = DeviceEventEmitter.addListener('enterOrganization',
            (event) => {
                if (event.level === 0) {
                    this.renderDeps();
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
            this.state.deps[0].props &&
            ((this.state.deps[0].props.dep && this.state.deps[0].props.dep.parent) ||
            (this.state.deps[0].props.emp && this.state.deps[0].props.emp.parent))) {
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
        return(
            <View style={styles.container}>
                {this.props.getInfo || this.state.type === 'dep'?
                    <StatusBar navigator={this.props.navigator} title="请选择"
                               backButtonFun = {this.goBack.bind(this, this.state.deps)}>
                        <TouchableOpacity onPress={() => this.submit()}>
                            <Text style={{color: 'white'}}>确定</Text>
                        </TouchableOpacity>
                    </StatusBar> :statusBar}
                <ScrollView
                    style={{height: height}}
                    ref={(scrollView) => { this._scrollView = scrollView}}>

                    <View style={styles.viewSty}>
                        {this.state.deps}
                    </View>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        );
    }

    submit() {
        let deps = this.state.deps.map(dom => dom.props.dep).filter(item => item.isChecked);
        console.log('dddd', deps);
    }

    renderDeps() {
        let dep = [];
        dep.push(<DepartmentItem key={0} getChildren={this.getChildren.bind(this, this.deps)} dep={this.deps}/>);
        this.setState({deps: dep});
    }

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
            //从人员变更接口进入
            if (this.props.getInfo)
                this.getChildren(this.deps);
            else //从组织tab进入
                this.renderDeps();
        });
    }

    onClick(item) {
        item.isChecked = !item.isChecked;
        let tmp = this.state.deps.slice(0);
        this.setState({deps: tmp});
    }



    getChildren(dep) {
        let children = [], deps = [], emps = [];

        if (dep.item && dep.item.length) {
            for (let i = 0; i < dep.item.length; i++) {
                if (dep.item[i].isuser === '0') {
                    if (this.state.type && this.state.type === 'dep') {
                        deps.push(<DepartmentItem dep={dep.item[i]} key={i} type="dep"
                                                  onClick={() => this.onClick(dep.item[i], this.state.deps)}
                                                  isChecked={dep.item[i].isChecked}
                                                  getChildren={this.getChildren.bind(this, dep.item[i])}/> );
                    } else {
                        deps.push(<DepartmentItem dep={dep.item[i]} key={i}
                                                  getChildren={this.getChildren.bind(this, dep.item[i])}/> );
                    }

                }
                else  {
                    if (this.state.type && this.state.type === 'emp') {
                        emps.push(<EmployeeItem getInfo={this.props.getInfo} navigator={this.props.navigator} emp={dep.item[i]} key={i}/>);
                    } else {
                        emps.push(<EmployeeItem getInfo={this.props.getInfo} navigator={this.props.navigator} emp={dep.item[i]} key={i}/>);
                    }
                }

            }
            children = deps.concat(emps);
            this.setState({deps: children});
        }
    }

    goBack(deps) {
        let dep = deps[0].props.dep || deps[0].props.emp;
        if (dep.parent && dep.parent.parent) {
            this.getChildren(dep.parent.parent);
        } else if (dep.parent) {
            this.renderDeps();
        }
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
