/**
 * Created by Nealyang on 2017/4/30.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar'
import EarlierStageList from './Component/EarlierStageList'
import EarlierStageListHeader from './Component/EarlierStageListHeader'
import EarlierStageListModalView from "./Component/EarlierStageListModalView";
export default class EarlierStage extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false
        }
    }

    _showModal = () => this.setState({ isModalVisible: true })
    _hideModal = () => this.setState({ isModalVisible: false })

    render(){
        // {this.state.modalOpen?<EarlierStageListModalView  closeModal={()=>this.setState({modalOpen:false})} />:<View></View>}
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="前期进度计划执行">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <EarlierStageListHeader/>
                <EarlierStageList navigator={this.props.navigator}/>
                {this.state.isModalVisible?<EarlierStageListModalView isModalVisible={this.state.isModalVisible}  closeModal={()=>this.setState({isModalVisible:false})} />:<View></View>}
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