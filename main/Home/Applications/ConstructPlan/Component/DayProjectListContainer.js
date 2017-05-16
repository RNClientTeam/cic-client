/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView
} from 'react-native'
import ProjectTagName from "./ProjectTagName";
import IndexProjectListCell from "./IndexProjectListCell";
const {width}  = Dimensions.get('window');

export default class DayProjectListContainer extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView >
                    <ProjectTagName name="工程子项拆分项目1"/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <ProjectTagName name="其他任务"/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});