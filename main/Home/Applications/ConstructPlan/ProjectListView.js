/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width}  = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import {PullList} from 'react-native-pull';
import ProjectList from "./Component/ProjectList";

export default class ProjectListView extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="选择子项"/>
                <SearchHeader/>
                <ProjectList navigator={this.props.navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#fff'
}
});