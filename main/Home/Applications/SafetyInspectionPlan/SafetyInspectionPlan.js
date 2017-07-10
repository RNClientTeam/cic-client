/**
 * Created by fan on 2017/05/16.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    Modal
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar.js';
import SafetyInspectionList from './Component/SafetyInspectionList.js';
import SearchHeader from '../Component/SearchHeader.js';
import ModalView from "./Component/ModalView.js";
export default class SafetyInspectionPlane extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            modalVisible: false
        }
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查计划">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <SafetyInspectionList navigator={this.props.navigator}/>
                {this.state.isModalVisible &&
                    <ModalView isModalVisible={this.state.isModalVisible}
                        closeModal={()=>this.setState({isModalVisible:false})} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    earlierStage:{
        backgroundColor:'#f2f2f2',
        flex:1
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});
