/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import Calendar from "../Component/Calendar";
import QualityCheckRecordHeader from "./Component/QualityCheckRecordHeader";
import QualityCheckRecordList from "./Component/QualityCheckRecordList";
import QualityCheckRecordFiltrate from "./Component/QualityCheckRecordFiltrate";
import QualityCheckModal from "./Component/QualityCheckModal";
const {width}  = Dimensions.get('window');

export default class QualityCheckRecord extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            selectRange:"mine",
            filtrate:false,
            modalVisible:false
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查记录">
                    <TouchableOpacity onPress={()=>{this.setState({filtrate:!this.state.filtrate})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckRecordHeader changeRange={this.changeRange.bind(this)} range={this.state.selectRange} changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar year={this.state.year} month={this.state.month}/>
                <QualityCheckRecordList navigator={this.props.navigator} showModal={()=>this.setState({modalVisible:true})}/>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <QualityCheckModal navigator={this.props.navigator} closeModal={() => {
                        this.setState({modalVisible: false})
                    }}/>
                </Modal>
                {this.state.filtrate?<QualityCheckRecordFiltrate closeFiltrate={()=>this.setState({filtrate:false})}/>:null}
            </View>
        )
    }

    changeYearAndMonth(data){
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1
        })
    }



    changeRange(txt){
        this.setState({
            selectRange:txt
        })
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