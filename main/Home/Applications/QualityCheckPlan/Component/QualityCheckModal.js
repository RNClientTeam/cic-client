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
            data:[],
        }
    }

    componentWillMount() {
        this.assignAuthority(this.props.authority)
    }

    componentWillReceiveProps(props) {
        this.assignAuthority(props.authority)
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
                    jhrwId={this.props.jhrwId}
                />
            )
        }
        return cs;
    };

    assignAuthority(authority) {
        let data = [];
        if (authority.addZljcjh) {
            data.push({
                img:require('../../../../../resource/imgs/home/earlierStage/applyForDelay.png'),
                name:'新建'
            });
        }
        if (authority.updateZljcjh) { // 编辑
            data.push({
                img:require('../../../../../resource/imgs/home/earlierStage/approveDealy.png'),
                name:'编辑'
            });
        }
        if (authority.effectZljcjh) { // 生效
            data.push({
                img:require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                name:'生效'
            });
        }
        if (authority.deleteZljcjh) { // 删除
            data.push({
                img:require('../../../../../resource/imgs/home/applications/stopAction.png'),
                name:'删除',
            })
        }
        this.setState({
            data
        });
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
