/**
 * Created by Nealyang on 2017/4/30.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar'
import EarlierStageList from './Component/EarlierStageList'
import EarlierStageListHeader from './Component/EarlierStageListHeader'
import Modal from 'react-native-simple-modal';
import EarlierStageListModalView from "./Component/EarlierStageListModalView";
export default class EarlierStage extends Component{
    constructor(props){
        super(props);
        this.state={
            modalOpen:false
        }
    }
    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="前期进度计划执行">
                    <TouchableOpacity onPress={()=>this.setState({modalOpen:!this.state.modalOpen})}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                {this.state.modalOpen?<EarlierStageListModalView  closeModal={()=>this.setState({modalOpen:false})} />:null}
                <EarlierStageListHeader/>
                <EarlierStageList/>
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