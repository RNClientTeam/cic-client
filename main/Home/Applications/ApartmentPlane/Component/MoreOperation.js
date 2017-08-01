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
export default class MoreOperation extends Component {
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

    renderCell = ()=>{
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <MoreOperationsCell
                    reload={this.props.reload.bind(this)}
                    operatingItem={this.props.operatingItem}
                    closeModal={()=>{this.props.closeModal()}}
                    navigator={this.props.navigator}
                    key={i}
                    dataSource={this.state.data[i]}/>
            )
        }
        return cs;
    };

    componentWillReceiveProps(props) {
        let authList = props.authList;
        let templateArr = [{img:require('../../../../../resource/imgs/home/applications/checkDetail.png'),name:'历史进展情况'}];
        for(let i = 0;i<authList.length;i++){
            if(authList[i].name === 'edit' && authList[i].show){
                templateArr.push({img:require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),name:'修改'})
            }else if(authList[i].name === 'del' && authList[i].show){
                templateArr.push({img:require('../../../../../resource/imgs/home/applications/stopAction.png'),name:'删除'})
            }else if(authList[i].name === 'tbjkqk' && authList[i].show){
                templateArr.push({img:require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),name:'填报进展'})
            }else if(authList[i].name === 'qrwcqk' && authList[i].show){
                templateArr.push( {img:require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),name:'确认完成'})
            }
        }
        this.setState({
            data:templateArr
        })
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
        width:width*0.29,
        backgroundColor:'red',
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    }
});
