"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions
} from 'react-native';
import StatusBar from '../Component/StatusBar'
import DepartmentItem from './Component/DepartmentItem'
import EmployeeItem from './Component/EmployeeItem'

const {width, height} = Dimensions.get('window');

export default class Organization extends Component {

    componentWillMount() {
        this.depsConstructor(this.deps);
        this.renderDeps();
    }
    render() {
        return(
            <View style={styles.container}>
                <StatusBar
                    title="组织"
                    backButtonFun = {this.goBack.bind(this, this.state.deps)}
                />
                <ScrollView>
                    <View style={styles.viewSty}>
                        {this.state.deps}
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderDeps() {
        let dep = [];
        // for (let i = 0; i < this.deps.length; i++) {
        //     deps.push(<DepartmentItem getChildren={this.getChildren.bind(this, this.deps[i])} dep={this.deps[i]}/>);
        // }
        dep.push(<DepartmentItem getChildren={this.getChildren.bind(this, this.deps)} dep={this.deps}/>);
        this.setState({deps: dep});
    }

    getChildren(dep) {
        let children = [], deps = [], emps = [];

        // if (dep.parent) {
        //     alert(dep.parent.name);
        // } else {
        //     alert('null');
        // }

        if (dep.hasChildren && dep.children.length) {
            for (let i = 0; i < dep.children.length; i++) {
                if (dep.children[i].isDep)
                    deps.push(<DepartmentItem dep={dep.children[i]}
                                              getChildren={this.getChildren.bind(this, dep.children[i])}/> );
                else
                    emps.push(<EmployeeItem emp={dep.children[i]}/>);
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

    deps ={
        name: 'root',
        isDep: true,
        hasChildren: true,
        children:     [
            {
                name: '科技部',
                isDep: true,
                hasChildren: true,
                children: [
                    {
                        name: '开发部',
                        isDep: true,
                        hasChildren: true,
                        children: [
                            {name: 'neal.zhu', isDep: false},
                            {name: 'neal.yang', isDep: false}
                        ]
                    },
                    {
                        name: 'bin.zhu',
                        isDep: false
                    },
                    {
                        name: '产品部',
                        isDep: true
                    },
                ]
            },
            {
                name: '人事部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '人事部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '人事部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '人事部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '人事部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            },
            {
                name: '财务部',
                isDep: true,
                hasChildren: false,
                children: []
            }
        ]
    };

    /**
     * 递归给每个item添加父类
     */
    depsConstructor(dep) {
        if (dep.hasChildren && dep.children.length) {
            for (let i = 0; i < dep.children.length; i++) {
                dep.children[i].parent = dep;
                this.depsConstructor(dep.children[i]);
            }
        } else {
            return
        }
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
        // alignItems:'center',
        // justifyContent:'center'
    }
});
