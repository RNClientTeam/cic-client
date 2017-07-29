'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import SafetyCheckPlanModalCell from "./SafetyCheckPlanModalCell";
const {width}  = Dimensions.get('window');

export default class SafetyCheckPlanModal extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentWillMount() {
        this.assignAuthority(this.props.authority)
    }

    componentWillReceiveProps(props) {
        this.assignAuthority(props.authority)
    }

    // componentDidMount() {
    //     let dataArr = [];
    //     if (this.props.auth&&this.props.auth.addAqjcjh) {
    //         dataArr.push({
    //             img: require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
    //             name: '增加'
    //         });
    //     } else if (this.props.auth&&this.props.auth.updateAqjcjh) {
    //         dataArr.push({
    //             img: require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
    //             name: '修改'
    //         });
    //     } else if (this.props.auth&&this.props.auth.effectAqjcjh) {
    //         dataArr.push({
    //             img: require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
    //             name: '生效'
    //         });
    //     } else if (this.props.auth&&this.props.auth.tbAqjcjl) {
    //         dataArr.push({
    //             img: require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
    //             name: '填报'
    //         });
    //     }else if (this.props.auth&&this.props.auth.deleteAqjcjh) {
    //         dataArr.push({
    //             img: require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
    //             name: '删除'
    //         });
    //     }
    //
    //     this.setState({data: dataArr});
    // }

    assignAuthority(authority) {
        console.log('-------data', authority);
        let data = [];
        // 新建
        if (authority.addAqjcjh) {
            data.push({
                img:require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png'),
                name:'新增'
            });
        }
        if (authority.updateAqjcjh) { // 编辑
            data.push({
                img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
                name:'编辑'
            });
        }
        if (authority.effectAqjcjh) { // 生效
            data.push({
                img:require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                name:'生效',
            })
        }
        if (authority.deleteAqjcjh) { // 删除
            data.push({
                img:require('../../../../../resource/imgs/home/applications/stopAction.png'),
                name:'删除',
            })
        }
        this.setState({
            data
        });
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
                <SafetyCheckPlanModalCell
                    closeModal={()=>{this.props.closeModal()}}
                    navigator={this.props.navigator} key={i}
                    dataSource={this.state.data[i]}
                    id={this.props.id}
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
