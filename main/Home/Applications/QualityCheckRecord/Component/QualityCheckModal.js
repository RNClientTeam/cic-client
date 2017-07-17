/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import QualityCheckModalCell from "./QualityCheckModalCell";
const {width}  = Dimensions.get('window');

export default class QualityCheckModal extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'提交安全审核'},
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'审批'},
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'记录整改'},
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'复查'},
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'质量检查记录整改'},
                {img:require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png'),name:'检查计划新建'},
                {img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),name:'检查计划编辑'},
                {img:require('../../../../../resource/imgs/home/applications/stopAction.png'),name:'删除'},
            ]
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.containerView}>
                    {this.renderCell()}
                </View>
                {/*<View style={styles.buttonView}>*/}
                    {/*<TouchableOpacity style={[styles.button,{backgroundColor:'#fb5560'}]}>*/}
                        {/*<Text style={{color:'#fff'}}>删除</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
            </TouchableOpacity>
        )
    }
    renderCell = ()=>{
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <QualityCheckModalCell closeModal={()=>{this.props.closeModal()}} navigator={this.props.navigator} key={i} dataSource={this.state.data[i]}/>
            )
        }
        return cs;
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'flex-end'
    },
    containerView: {
        width: width,
        backgroundColor: '#fff'
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:width*0.2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    button:{
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        flex:1,
        margin:width*0.04
    }
});