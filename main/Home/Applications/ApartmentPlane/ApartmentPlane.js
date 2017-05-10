/**
 * Created by fan on 2017/05/10.
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
import ApartmentPlaneList from './Component/ApartmentPlaneList.js';
import SearchHeader from '../Component/SearchHeader.js';
import MoreOperation from './Component/MoreOperation.js';
import EarlierStageListModalView from "../EarlierStage/Component/EarlierStageListModalView.js";
export default class ApartmentPlane extends Component{
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
                <StatusBar navigator={this.props.navigator} title="部门计划编制">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={[styles.filtrate, {marginLeft:-width*0.045-10}]} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <ApartmentPlaneList navigator={this.props.navigator}
                    setModalVisible={()=>{this.setState({modalVisible:true})}}/>
                {this.state.isModalVisible &&
                    <EarlierStageListModalView isModalVisible={this.state.isModalVisible}
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
