/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import ModalCell from "./ModalCell";
const {width, height} = Dimensions.get('window');

export default class ModalView extends Component {

    constructor(props){
        super(props);
        this.state = {
            modals:[
                {src:require('../../../../../resource/imgs/home/constuctPlan/editComplete.png'),name:'填报进展'},
                {src:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'确认完成'}
            ]
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>this.props.hiddenModal()}>
                {this.renderModalCell()}
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.button,{backgroundColor:'#fb5560'}]}>
                        <Text style={{color:'#fff'}}>停工</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'#3999fd'}]}>
                        <Text style={{color:'#fff'}}>复工</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    renderModalCell(){
        let tempCell = [];
        for(let i = 0;i<this.state.modals.length;i++){
            tempCell.push(
                <ModalCell key={i} src={this.state.modals[i].src} name={this.state.modals[i].name}/>
            )
        }
        return tempCell;
    }
}

const styles = StyleSheet.create({
    modalView:{
        width:width,
        height:height,
        justifyContent:'flex-end',
        backgroundColor: 'rgba(0, 0, 0,0.75)'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    button:{
        width:width*0.29,
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    }
});