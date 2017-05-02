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
import Test from "./Component/Test";
export default class EarlierStage extends Component{
    constructor(props){
        super(props);
        this.state={
            modalOpen:false
        }
    }
    render(){
        // ()=>this.setState({modalOpen:!this.state.modalOpen})
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="前期进度计划执行">
                    <TouchableOpacity onPress={()=>this.props.navigator.push({name:'test',component:Test})}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                {this.state.modalOpen?<EarlierStageListModalView  closeModal={()=>this.setState({modalOpen:false})} />:<View></View>}
                <EarlierStageListHeader/>
                <EarlierStageList navigator={this.props.navigator}/>
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