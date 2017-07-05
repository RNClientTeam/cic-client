/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import {PullList} from 'react-native-pull';
import ProjectList from "./Component/ProjectList";

export default class ProjectListView extends Component {
    constructor(props){
        super(props);
        this.state={
            pageNum:1,
            zxmc:'',
            list:[]
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="选择子项"/>
                <SearchHeader/>
                <ProjectList navigator={this.props.navigator}/>
            </View>
        )
    }

    componentDidMount() {
        this.getDataFromNet(1,()=>{})
    }
    getDataFromNet(pageNum,resolve){
        axios.get('/psmSgrjh/list4gczx',{
            params:{
                userID:GLOBAL_USERID,
                pageNum:this.state.pageNum,
                pageSize:10,
                callID:true,
                zxmc:this.state.zxmc
            }
        }).then(data=>{
            console.log(data);
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});