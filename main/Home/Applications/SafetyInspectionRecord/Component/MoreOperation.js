/**
 * Created by fan on 2017/5/18.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import NewCreateRecord from './NewCreateRecord.js';
import ExamineAndApprove from './ExamineAndApprove.js';
import RectifyTask from './RectifyTask.js';
import Toast from 'react-native-simple-toast';
const {width} = Dimensions.get('window');
export default class MoreOperation extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        let dataArr = [];
        if (this.props.auth.addAqjcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '增加'
            });
        }
        if (this.props.auth.editAqjcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '修改'
            });
        }
        if (this.props.auth.checkAqjcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '审核'
            });
        }
        if (this.props.auth.checkAndaddZgrw) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '下达整改任务'
            });
        }
        if (this.props.auth.tbZgwcqk) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '填报整改情况'
            });
        }
        if (this.props.auth.tbFcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '填报复查记录'
            });
        }
        if (this.props.auth.deleteAqjcjl) {
            dataArr.push({
                img: require('../../../../../resource/imgs/home/earlierStage/writeCompleteInfo.png'),
                name: '删除'
            });
        }
        this.setState({data: dataArr});
    }

    renderCell() {
        let cs = [];
        for(let i = 0;i<this.state.data.length;i++){
            cs.push(
                <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this, this.state.data[i])} key={this.state.data[i].name}>
                    <Image style={styles.imgStyle} source={this.state.data[i].img}/>
                    <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>{this.state.data[i].name}</Text>
                </TouchableOpacity>
            )
        }
        return cs;
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

    skipPage(rowData){
        if (rowData.name === '增加') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component: RectifyTask,
                params: {
                    add: true,
                    initialPage: 0,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '修改') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component: RectifyTask,
                params: {
                    edit: true,
                    initialPage: 0,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '审核') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component: RectifyTask,
                params: {
                    check: true,
                    initialPage: 0,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '下达整改任务') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component:RectifyTask,
                params: {
                    checkAndZgrw: true,
                    initialPage: 1,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '填报整改情况') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component:RectifyTask,
                params: {
                    tbzgqk: true,
                    initialPage: 1,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '填报复查记录') {
            this.props.navigator.push({
                name: 'RectifyTask',
                component:RectifyTask,
                params: {
                    fcjl: true,
                    initialPage: 2,
                    data: this.props.data,
                    reloadInfo: this.props.reloadInfo
                }
            });
        } else if (rowData.name === '删除') {
            axios.post('/psmAqjcjh/deleteAqjcjl', {
                userID: GLOBAL_USERID,
                id: this.props.data.aqjcjlId,
                callID: true
            }).then((res) => {
                if (res.code ===1) {
                    Toast.show('删除成功');
                    this.props.reloadInfo();
                } else {
                    Toast.show(res.message);
                }
            }).catch((error) => {

            });
        }
        this.props.closeModal();
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
    },
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection:'row',
        height:width*0.14,
        alignItems:'center',
        borderColor:'#ddd',
        borderBottomWidth:1
    },
    imgStyle: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});
