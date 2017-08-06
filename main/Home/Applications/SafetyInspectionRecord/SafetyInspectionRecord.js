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
import Loading from "../../../Component/Loading";
import {padStart} from '../../../Util/Util'
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
            dataSource:[],
            auth: {},
            data: {}
        }
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="安全检查记录">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader
                    changeZxmc={(text)=>this.setState({keywords:text})}
                    getData={this._getData.bind(this, 1)}
                />
                <SafetyList
                    refresh={(resolve)=>this._getData(1,resolve)}
                    loadMore={this._loadMore.bind(this)}
                    dataSource={this.state.dataSource}
                    navigator={this.props.navigator}
                    setModalVisible={(auth, data)=>{
                        let tempData = false;
                        for (var key in auth) {
                            if (auth[key] && !tempData) {
                                tempData = true;
                            }
                        }
                        if (tempData) {
                            this.setState({
                                modalVisible:true,
                                auth: auth,
                                data: data
                            });
                        } else {
                            toast.show('没有相关权限');
                        }
                    }}/>
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
                        <MoreOperation navigator={this.props.navigator}
                            closeModal={() => {
                                this.setState({modalVisible: false})
                            }}
                            reloadInfo={() => {this._getData(1)}}
                            auth={this.state.auth}
                            data={this.state.data}
                        />
                    </Modal>
                }
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    _changeFilter(kssj,jssj,jhlx){
        this.setState({
            ksrq:kssj,
            jsrq:jssj,
            jhlx:jhlx
        },function () {
            this._getData(1);
        })
    }

    _loadMore(){
        this.setState({
            pageNum:++this.state.pageNum
        },function () {
            this._getData(this.state.pageNum)
        })
    }

    componentDidMount() {
        this._getData(1);
    }

    _getData(pageNum,resolve=()=>{}){
        this.setState({
            isLoading:true
        });
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
                keywords:'',
                pageNum:pageNum,
                pageSize:10,
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                resolve();
                if(data.data.data){
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

                }
                return data.data.length>0
            }else{
                toast.show(data.message);
                return false;
            }
        }).catch(err=>{
            this.setState({isLoading:false});
            toast.show('服务端异常');
            resolve();
            return false;
        })
    }

    // addBtn() {
    //     this.props.navigator.push({
    //         component: NewCreateRecord,
    //         name: 'NewCreateRecord',
    //         params: {
    //             reloadInfo: this._getData.bind(this, 1)
    //         }
    //     });
    // }

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
