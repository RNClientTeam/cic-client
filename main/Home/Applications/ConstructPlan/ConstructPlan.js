/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import ConstructPlanHeader from "./Component/ConstructPlanHeader";
import Calendar from "./Component/Calendar";
const {width}  = Dimensions.get('window');

export default class ConstructPlan extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工日计划"/>
                <ConstructPlanHeader/>
                <Calendar/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    }
});