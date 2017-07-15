/**
 * Created by fan on 2017/05/18.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    Modal,
    TouchableWithoutFeedback
} from 'react-native'
const {width}  = Dimensions.get('window');
import NewCreateRecord from './Component/NewCreateRecord.js';
import MoreOperation from './Component/MoreOperation.js';
import StatusBar from '../../../Component/StatusBar.js';
import SafetyList from './Component/SafetyList.js';
import SearchHeader from '../Component/SearchHeader.js';
import ModalView from "./Component/ModalView.js";
import {getCurrentMonS,getCurrentMonE} from '../../../Util/Util'
import toast from 'react-native-simple-toast'
export default class SafetyInspectionRecord extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            modalVisible: false,
            ksrq:getCurrentMonS(),
            jsrq:getCurrentMonE(),
            jhlx:'所有计划',
            keywords:'',
            pageNum:1,
            isLoading:false,
            dataSource:[]
        }
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查记录（5）">
                    <TouchableWithoutFeedback
                        onPress={()=>{this.addBtn()}}
                    >
                        <Image style={{width: 0.04 * width, height: 0.04 * width,position:'absolute',right:width*0.12}}
                               source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}
                    >
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader
                    changeZxmc={(text)=>this.setState({keywords:text})}
                    getData={this._getData.bind(this)}
                />
                <SafetyList
                    refresh={(resolve)=>this._getData(1,resolve)}
                    loadMore={this._loadMore.bind(this)}
                    dataSource={this.state.dataSource}
                    navigator={this.props.navigator}
                    setModalVisible={()=>{this.setState({modalVisible:true})}}/>
                {this.state.isModalVisible &&
                    <ModalView
                        kssj={this.state.ksrq}
                        jssj={this.state.jsrq}
                        jhlx={this.state.jhlx}
                        isModalVisible={this.state.isModalVisible}
                        changeFilter={(kssj,jssj,jhlx)=>this._changeFilter(kssj,jssj,jhlx)}
                        closeModal={()=>this.setState({isModalVisible:false})} />}
                {
                    this.state.modalVisible &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible: false})}}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <MoreOperation navigator={this.props.navigator} closeModal={() => {
                            this.setState({modalVisible: false})
                        }}/>
                    </Modal>
                }

            </View>
        )
    }

    _changeFilter(kssj,jssj,jhlx){
        this.setState({
            ksrq:kssj,
            jsrq:jssj,
            jhlx:jhlx
        },function () {
            this._getData();
        })
    }

    _loadMore(){
        this.setState({
            pageNum:this.state.pageNum++
        },function () {
            this._getData(this.state.pageNum)
        })
    }

    componentDidMount() {
        this._getData();
    }

    _getData(pageNum = 1,resolve=()=>{}){
        let jhlx=300;
        if(this.state.jhlx==='我主责的'){
            jhlx=200
        }else if(this.state.jhlx==='我的待办'){
            jhlx = 100;
        }
        axios.get('/psmAqjcjh/list4Aqjcjl',{
            params:{
                userID:GLOBAL_USERID,
                ksrq:this.state.ksrq,
                jsrq:this.state.jsrq,
                jhlx:jhlx,
                keywords:'y',
                pageNum:pageNum,
                pageSize:10,
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                if(data.data&&data.data.length>0){
                    if(pageNum === 1){
                        this.setState({
                            dataSource:data.data
                        })
                    }else{
                        for(let i = 0;i<data.data.length;i++){
                            this.state.dataSource.push(data.data[i])
                        }
                        this.setState({
                            dataSource:this.state.dataSource
                        })
                    }
                    return true;
                }else{
                    return false
                }
            }else{
                toast.show(data.message)
            }
            resolve();
        }).catch(err=>{
            toast.show('服务端异常');
            resolve();
            // TODO
            let data = {
                "code": 1,
                "data": {
                    "total": 8,
                    "data": [
                        {
                            "jcbm": "00000005100138c242a0d9",
                            "zxmc": "配电室工程",
                            "xmmc": "碧水庄园9#配电室改造",
                            "aqjcjhId": "8a8180d85b5f2339015b5f799bf000bc",
                            "jcsj": "2017-04-12",
                            "RN": 1,
                            "isTodo": "0",
                            "fcfj": "0000002cf0015b649e8d7e",
                            "id": "8a8180d85b638d3e015b69d0047d0b03",
                            "jcr": "ZNDQ2106",
                            "wtlbmc": "正常",
                            "aqjcjhmc": "现场检查",
                            "gczxId": "8a8180d857482f6201574add5b073f67",
                            "jcfj": "0000002ce0015b649e8d7e",
                            "xmbh": "JZ_DS16041-16021",
                            "sfxczg": 0,
                            "jcrmc": "董术义",
                            "stepId": "",
                            "wtlb": "1"
                        },
                        {
                            "jcbm": "00000005100138c242a0d9",
                            "zxmc": "配电室工程",
                            "xmmc": "北京人家4#配电室改造",
                            "aqjcjhId": "8a8180d85b45c261015b56ce688a01a6",
                            "jcsj": "2017-04-10",
                            "RN": 2,
                            "isTodo": "0",
                            "fcfj": "00000016530015b45ce46df",
                            "id": "8a8180d85b45c261015b56d025ee0243",
                            "jcr": "ZNDQ2106",
                            "wtlbmc": "一般问题",
                            "aqjcjhmc": "现场检查",
                            "gczxId": "8a8180d857482f6201574ae3684e40b3",
                            "jcfj": "00000016520015b45ce46df",
                            "xmbh": "JZ_DS16041-16019",
                            "sfxczg": 1,
                            "jcrmc": "董术义",
                            "stepId": "",
                            "wtlb": "2"
                        }
                    ]
                },
                "message": "成功"
            };
            if(data.data&&data.data.data.length>0){
                if(pageNum === 1){
                    this.setState({
                        dataSource:data.data.data
                    })
                }else{
                    for(let i = 0;i<data.data.data.length;i++){
                        this.state.dataSource.push(data.data.data[i])
                    }
                    this.setState({
                        dataSource:this.state.dataSource
                    })
                }
                return true;
            }else{
                return false
            }
        })
    }

    addBtn() {
        this.props.navigator.push({
            component: NewCreateRecord,
            name: 'NewCreateRecord'
        });
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
