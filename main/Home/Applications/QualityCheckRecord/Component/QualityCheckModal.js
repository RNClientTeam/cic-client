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
            data:[]
        }
    }

    componentDidMount() {
        let dataArr = [];
        if (this.props.auth.addZljcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/createItem.png'),
                name: '增加'
            });
        }
        if (this.props.auth.workFlow) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/workflow.png'),
                name: '查看已完成步骤'
            });
        }
        if (this.props.auth.editZljcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/modification.png'),
                name: '修改'
            });
        }
        if (this.props.auth.checkZljcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/checkDetail.png'),
                name: '审核'
            });
        }
        if (this.props.auth.checkAndaddZgrw) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/inspectionPlan.png'),
                name: '下发整改任务'
            });
        }
        if (this.props.auth.tbZgwcqk) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/implementationSchedule.png'),
                name: '填报整改情况'
            });
        }
        if (this.props.auth.tbFcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/schedulePlanning.png'),
                name: '填报复查记录'
            });
        }
        if (this.props.auth.deleteZljcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/applications/delete.png'),
                name: '删除'
            });
        }
        this.setState({data: dataArr});
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
    renderCell = ()=>{
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <QualityCheckModalCell
                    closeModal={()=>{this.props.closeModal()}}
                    navigator={this.props.navigator} key={i}
                    dataSource={this.state.data[i]}
                    data={this.props.data}
                    reloadInfo={this.props.reloadInfo}/>
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
