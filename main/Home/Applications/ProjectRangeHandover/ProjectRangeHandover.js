/**
 * Created by Nealyang on 2017/5/7.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
const {width}  = Dimensions.get('window');
import SearchHeader from '../Component/SearchHeader'
import ProjectRangeHandoverList from './Component/ProjectRangeHandoverList'
import ProjectRangeHandoverModal from "./Component/ProjectRangeHandoverModal";
import {getCurrentMonS,getCurrentMonE} from '../../../Util/Util'
export default class ProjectRangeHandover extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            sDate:getCurrentMonS(),
            eDate:getCurrentMonE(),
            keywords:''
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="工程范围交接">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader sDate={this.state.sDate} eDate={this.state.eDate}/>
                <ProjectRangeHandoverList navigator={this.props.navigator}/>
                {this.state.isModalVisible?<ProjectRangeHandoverModal sDate={this.state.sDate} eDate={this.state.eDate} isModalVisible={this.state.isModalVisible}  closeModal={()=>this.setState({isModalVisible:false})} />:<View></View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});
