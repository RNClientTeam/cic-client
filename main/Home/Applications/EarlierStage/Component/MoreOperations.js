/**
 * Created by Nealyang on 2017/5/3.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import MoreOperationsCell from "./MoreOperationsCell";
const {width} = Dimensions.get('window');
export default class MoreOperations extends Component {

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.props.closeModal()}}>
                <View style={styles.containerView}>
                    {this.renderCell()}
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        let dataArr = [];
        if(this.props.auth.rybg){
            dataArr.push({img:require('../../../../../resource/imgs/home/earlierStage/peopleChange.png'),name:'人员变更'})
        }
        if(this.props.auth.yqbg){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png'),name:'延期变更申请'}
            );
        }
        if(this.props.auth.tbwcqk){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),name:'填报完成情况'}
            );
        }
        if(this.props.auth.qrwcqk ){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'确认完成'}
            );
        }
        if(this.props.auth.tbzzxqk){
            dataArr.push(
                {img:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'填报总执行情况'}
            );
        }
        dataArr.push({
            img: require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),
            name: '暂停'
        });
        dataArr.push({
            img: require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),
            name: '恢复'
        });
        this.setState({data:dataArr});
    }

    renderCell = ()=>{
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <MoreOperationsCell sDate={this.props.sDate} eDate={this.props.eDate} jhxxId={this.props.jhxxId} rwid={this.props.rwid} closeModal={()=>{this.props.closeModal()}} navigator={this.props.navigator} key={i} dataSource={this.state.data[i]}/>
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
    }
});
