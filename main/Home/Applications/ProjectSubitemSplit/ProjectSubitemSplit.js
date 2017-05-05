/**
 * Created by Nealyang on 2017/5/5.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width} = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import ProjectSubitemSplitList from './Component/ProjectSubitemSplitList'
export default class ProjectSubitemSplit extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalVisible:false
        }
    }

    render() {
        return (
            <View style={styles.projectSubitemSplit}>
                <StatusBar navigator={this.props.navigator} title="工程子项拆分">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <ProjectSubitemSplitList navigator={this.props.navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    projectSubitemSplit:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});