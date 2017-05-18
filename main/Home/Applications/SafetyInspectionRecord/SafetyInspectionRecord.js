/**
 * Created by fan on 2017/05/18.
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
import NewCreateRecord from './Component/NewCreateRecord.js';
import MoreOperation from './Component/MoreOperation.js';
import StatusBar from '../../../Component/StatusBar.js';
import SafetyList from './Component/SafetyList.js';
import SearchHeader from '../Component/SearchHeader.js';
import ModalView from "./Component/ModalView.js";
export default class SafetyInspectionRecord extends Component{
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
                <StatusBar navigator={this.props.navigator} title="安全检查记录（5）">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={[styles.filtrate, {marginLeft:-width*0.045-10}]} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.addBtn()}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <SafetyList navigator={this.props.navigator}
                    setModalVisible={()=>{this.setState({modalVisible:true})}}/>
                {this.state.isModalVisible &&
                    <ModalView isModalVisible={this.state.isModalVisible}
                        closeModal={()=>this.setState({isModalVisible:false})} />}
                {
                    this.state.modalVisible &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible: false})}}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <MoreOperation navigator={this.props.navigator} closeModal={() => {
                            this.setState({modalVisible: false})
                        }}/>
                    </Modal>
                }
            </View>
        )
    }

    addBtn() {
        this.props.navigator.push({
            component: NewCreateRecord,
            name: 'NewCreateRecord'
        });
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
