/**
 * Created by fan on 2017/05/16.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    Modal
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar.js';
import SafetyInspectionList from './Component/SafetyInspectionList.js';
import SearchHeader from '../Component/SearchHeader.js';
import ModalView from "./Component/ModalView.js";
import toast from 'react-native-simple-toast';

export default class SafetyInspectionPlane extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            modalVisible: false,
            dataSource: [],
            ksrq: '2017-01-01',
            jsrq: '2019-01-01',
            jhlx: 300,
            pageNum: 1,
        }
    }

    componentDidMount() {
        this.getList();
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查计划">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader
                    getData={()=>this.getList()}
                    changeZxmc={(keywords)=>this.setState({keywords:keywords})} />
                <SafetyInspectionList
                    navigator={this.props.navigator}
                    dataSource={this.state.dataSource}
                    loadMore={() => this.loadMore()}
                    total={this.state.total}
                />
                {this.state.isModalVisible &&
                    <ModalView
                        jhlx={this.state.jhlx}
                        ksrq={this.state.ksrq}
                        jsrq={this.state.jsrq}
                        isModalVisible={this.state.isModalVisible}
                        closeModal={(type, ksrq, jsrq, jhlx) => this.closeModal(ksrq, jsrq, jhlx)}
                    />
                }
            </View>
        )
    }

    getList(pageNum = 1, callBack = () => {}) {
        const {
            ksrq = '2017-01-01',
            jsrq = '2019-01-01',
            jhlx = 300,
            keywords = '',
        } = this.state;

        axios.get('/psmAqjcjh/list4Aqjcjl', {
            params: {
                userID: GLOBAL_USERID,
                ksrq,
                jsrq,
                jhlx,
                keywords,
                pageNum,
                pageSize: 10,
                callID: true,
            }
        }).then(responseData => {
            console.log('data-------', responseData);
            this.setState({
                isLoading: false
            });
            let tmp = [];
            if (responseData.code === 1) {
                if (pageNum === 1) {
                   this.setState({
                       dataSource: responseData.data.data,
                   })
                } else {
                    tmp = [...this.state.dataSource, ...responseData.data.data];
                    this.setState({
                        dataSource: tmp
                    })
                }
                this.setState({
                    total: responseData.data.total || 0,
                })
            } else {
                toast.show(responseData.message);
            }

        }).catch(err =>{
            this.setState({isLoading:false});
            toast.show('服务端异常');
        })
    }

    loadMore() {
        let pageNum = ++this.state.pageNum;
        this.getList(pageNum);
        this.setState({
            pageNum,
        });
    }

    closeModal(type, ksrq, jsrq, jhlx) {
        console.log(ksrq, jsrq, jhlx);
        this.setState({isModalVisible:false});
        if (type === 1) {
            this.setState({
                ksrq,
                jsrq,
                jhlx
            });
        }
        this.getList();
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
