/**
 * Created by fan on 2017/05/10.
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
import ApartmentPlaneList from './Component/ApartmentPlaneList.js';
import SearchHeader from '../Component/SearchHeader.js';
import MoreOperation from './Component/MoreOperation.js';
import AddApartmentPlane from './Component/AddApartmentPlane.js';
import Loading from "../../../Component/Loading";
import {getCurrentMonS,getCurrentMonE} from '../../../Util/Util'
import ApartmentListModalView from "./Component/ApartmentListModalView";
import toast from 'react-native-simple-toast'
export default class ApartmentPlane extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            modalVisible: false,
            isLoading:false,
            dataType:'我的',//1,全部:2
            jhmc:'',
            sDate:getCurrentMonS(),
            eDate:getCurrentMonE(),
            pageNum:1,
            rwzt:'请选择任务状态',
            dataList:[]
        }
    }

    addBtn() {
        this.props.navigator.push({
            component: AddApartmentPlane,
            name: 'AddApartmentPlane'
        });
    }

    render(){
        return(
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="部门计划">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={[styles.filtrate, {marginLeft:-width*0.045-10}]} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.addBtn()}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <ApartmentPlaneList
                    loadMore={()=>this.loadMore()}
                    dataSource={this.state.dataList}
                    navigator={this.props.navigator}
                    refresh={(resolve)=>this.getDataFromNet(1,resolve)}
                    setModalVisible={()=>{this.setState({modalVisible:true})}}/>
                {this.state.isModalVisible &&
                    <ApartmentListModalView
                        rwzt={this.state.rwzt}
                        sDate={this.state.sDate}
                        eDate={this.state.eDate}
                        isModalVisible={this.state.isModalVisible}
                        changeFilter={(sDate,eDate,rwzt)=>this.changeFilter(sDate,eDate,rwzt)}
                        choiceRwzt={(rwzt)=>this.setState({rwzt:rwzt})}
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
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    showLoading(){
        this.setState({
            isLoading:true
        })
    }

    changeFilter(sDate,eDate,rwzt){
        this.setState({
            sDate:sDate,
            eDate:eDate,
            rwzt:rwzt
        },function () {
            this.getDataFromNet();
        })
    }

    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            this.getDataFromNet(this.state.pageNum)
        })
    }

    hideLoading(){
        this.setState({
            isLoading:false
        })
    }
    componentDidMount() {
        this.getDataFromNet();
    }
    getDataFromNet(pageNum=1,resolve=()=>{}){
        this.showLoading();
        let rwzt='all';
        axios.get('/psmBmjh/list',{
            params:{
                userID:GLOBAL_USERID,
                dataType:2,
                jhmc:this.state.jhmc,
                sDate:this.state.sDate,
                eDate:this.state.eDate,
                rwzt:this.state.rwzt==='请选择任务状态'?rwzt:this.state.rwzt,
                pageNum:pageNum,
                pageSize:10,
                callID:true
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code ===1){
                // TODO
                let result = true;
                data = {
                    "code": 1,
                    "data": {
                        "total": 12,
                        "list": [
                            {
                                "cjrmc": "石建喜",
                                "jhrw": "完成工程实施特批",
                                "xmmc": "京棉A1区北区2#配及A2区2#配户表集中器",
                                "qdsj": "2017-05-15 00:00:00",
                                "zrrmc": "石建喜",
                                "RN": 1,
                                "wcbl": "",
                                "jhrwId": "8a8180b858fcb9990159001bfcff0679",
                                "ly": "91",
                                "jhmc": "ce2",
                                "zrbm": "00000004800138c242a0d9",
                                "id": "000000030015cbfb48e",
                                "lymc": "项目前期计划任务",
                                "gczxmc": "",
                                "zrr": "ZNDQ1943",
                                "zt": "200",
                                "ztmc": "启动",
                                "xmbh": "CX_DS14040",
                                "cjr": "ZNDQ1943",
                                "wcsj": "2017-05-17 00:00:00",
                                "zrbmmc": "市场营销二部"
                            },
                            {
                                "cjrmc": "石建喜",
                                "jhrw": "完成施工招投标",
                                "xmmc": "京棉A1区北区2#配及A2区2#配户表集中器",
                                "qdsj": "2017-05-15 00:00:00",
                                "zrrmc": "石建喜",
                                "RN": 2,
                                "wcbl": "10",
                                "jhrwId": "8a8180b858fcb9990159001bfabe066c",
                                "ly": "91",
                                "jhmc": "ceshi1",
                                "zrbm": "00000004800138c242a0d9",
                                "id": "000000020015cbfb48e",
                                "lymc": "项目前期计划任务",
                                "gczxmc": "",
                                "zrr": "ZNDQ1943",
                                "zt": "200",
                                "ztmc": "启动",
                                "xmbh": "CX_DS14040",
                                "cjr": "ZNDQ1943",
                                "wcsj": "2017-05-15 00:00:00",
                                "zrbmmc": "市场营销二部"
                            }
                        ]
                    },
                    "message": "成功"
                };
                if(data.data && data.data.list && data.data.list.length>0){
                    if(pageNum === 1){
                        this.setState({
                            dataList:data.data.list
                        })
                    }else{
                        for(let i = 0;i<data.data.list.length;i++){
                            this.state.dataList.push(data.data.list[i])
                        }
                        this.setState({
                            dataList:this.state.dataList
                        })
                    }

                }else{
                    result = false
                }

                resolve();
                return result;
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            this.hideLoading();
            toast.show('服务端异常');
        })
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
