/**
 * Created by Nealyang on 2017/5/10.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'
import StatusBar from "../../../Component/StatusBar";
import Calendar from "../Component/Calendar";
import QualityCheckPlanHeader from "./Component/QualityCheckPlanHeader";
import QualityCheckPlanList from "./Component/QualityCheckPlanList";
import QualityCheckFiltrate from "./Component/QualityCheckFiltrate";
import QualityCheckModal from "./Component/QualityCheckModal";
import toast from 'react-native-simple-toast';
import Loading from "../../../Component/Loading";

const {width}  = Dimensions.get('window');

export default class QualityCheckPlan extends Component{
    constructor(props){
        super(props);
        this.state={
            year:new Date().getFullYear(),//当前年份
            month:new Date().getMonth(),//当前月份
            day:new Date().getDate(),
            filtrate:false,
            modalVisible:false,
            calendarState:[],
            rwxz:'请选择任务性质',
            rwzt:'请选择任务状态',
            pageNum:1,
            rwxzid:'all',
            rwztid:'all',
            isLoading:false,
            dataSource:[]
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="质量检查计划">
                    <TouchableOpacity onPress={()=>{this.setState({filtrate:!this.state.filtrate})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <QualityCheckPlanHeader  changeDate={this.changeYearAndMonth.bind(this)}/>
                <Calendar changeDay={(day)=>this.changeDay(day)} day={this.state.day} data={this.state.calendarState} year={this.state.year} month={this.state.month}/>
                <QualityCheckPlanList dataSource={this.state.dataSource}
                                      reload={(resolve)=>this.getTask(1,resolve)}
                                      loadMore={this.loadMore.bind(this)}
                                      navigator={this.props.navigator}
                                      showModal={(jhrwId) => this.setModalVisible(jhrwId)}/>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <QualityCheckModal
                        navigator={this.props.navigator}
                        jhrwId={this.state.jhrwId}
                        closeModal={() => {this.setState({modalVisible: false})
                    }}/>
                </Modal>
                {this.state.filtrate?<QualityCheckFiltrate
                    rwztId={this.state.rwztid}
                    rwxzId={this.state.rwxzid}
                    rwzt={this.state.rwzt}
                    rwxz={this.state.rwxz}
                    closeFiltrate={(type,zt,xz,ztCode,xzCode)=>this.filterData(type,zt,xz,ztCode,xzCode)}/>:null}
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    setModalVisible(jhrwId) {
        console.log('------data', jhrwId);
        this.setState(
            {
                modalVisible: true,
                jhrwId
            }
        );
    }

    //过滤
    filterData(type,zt,xz,ztCode,xzCode){
        this.setState({filtrate:false});
        if(type === 1){
            this.setState({
                rwzt:zt,
                rwxz:xz,
                rwztid:ztCode,
                rwxzid:xzCode
            },function () {
                this.getTask();
                this.getCalendarData();
            })
        }
    }

    // 选择日期
    changeYearAndMonth(data){
        this.setState({
            year:data.substr(0,4),
            month:parseInt(data.substr(-2,data.length-1))-1
        },function () {
            this.getTask();
            this.getCalendarData();
        })
    }

    // 点击某一天
    changeDay(day){
        this.setState({
            day:day
        },function () {
            this.getTask()
        })
    }

    componentDidMount() {
        this.getCalendarData();
        this.getTask()
    }

    getCalendarData(){
        axios.get('/psmZljcjh/calendar4Zljcjh',{
            params:{
                userID:GLOBAL_USERID,
                month:this.state.year+'-'+(this.state.month+1),
                rwzt:this.state.rwztid,
                rwxz:this.state.rwxzid,
                callID:true
            }
        }).then(data=>{
            console.log('-----getCalendarData', data);
            if(data.code === 1){
                this.setState({
                    calendarState:data.data.list
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
    
    loadMore(){
        this.setState({
            pageNum:this.state.pageNum+1
        },function () {
            this.getTask(this.state.pageNum);
        })
    }
    
    getTask(pageNum=1,resolve=()=>{}){
        this.setState({isLoading:true});
        axios.get('/psmZljcjh/list',{
            params:{
                userID:GLOBAL_USERID,
                date:this.state.year+'-'+(this.state.month+1)+'-'+this.state.day,
                rwzt:this.state.rwztid,
                rwxz:this.state.rwxzid,
                pageNum:pageNum,
                pageSize:10,
                callID:true
            }
        }).then(data=>{
            console.log('-----getTask', data);
            this.setState({isLoading:false});
            if(data.code ===1){
                resolve();
                // TODO
                data={
                    "code": 1,
                    "data": {
                        "total": 2,
                        "list": [
                            {
                                "zxmc": "施家胡同配电子项",
                                "rn": 1,
                                "cfxxId": "8a8180d856ec904a0156fe2e64806ea5",
                                "twztmc": "已生效",
                                "xmgh": "JZ_DS16065-16042",
                                "xmmc": "大栅栏廊坊二条等4条街架空线入地工程",
                                "cjbm": "00000004e00138c242a0d9",
                                "zrrmc": "赵春华",
                                "jhjssjt": "2016-12-26 00:00:00",
                                "jhkssjt": "2016-12-26 00:00:00",
                                "rwxz": 6,
                                "zrbm": "00000004e00138c242a0d9",
                                "id": "8a8180d858fa588c015914da35f029f4",
                                "rwnr": "送电",
                                "rwxzmc": "专工验收",
                                "zrr": "ZNDQ2008",
                                "gczxId": "8a8180d856ec904a0156fe35fc8870c3",
                                "twzt": 100,
                                "ssbmmc": "配网工程部",
                                "cjsjt": "2016-12-19 10:12:41",
                                "cjr": "ZNDQ2003"
                            },
                            {
                                "zxmc": "施家胡同电缆子项",
                                "rn": 2,
                                "cfxxId": "8a8180d856ec904a0156fe2e64806ea5",
                                "twztmc": "已生效",
                                "xmgh": "JZ_DS16065-16042",
                                "xmmc": "大栅栏廊坊二条等4条街架空线入地工程",
                                "cjbm": "00000004e00138c242a0d9",
                                "zrrmc": "赵春华",
                                "jhjssjt": "2016-12-26 00:00:00",
                                "jhkssjt": "2016-12-26 00:00:00",
                                "rwxz": 6,
                                "zrbm": "00000004e00138c242a0d9",
                                "id": "8a8180d858fa588c015914d49475284c",
                                "rwnr": "送电",
                                "rwxzmc": "专工验收",
                                "zrr": "ZNDQ2008",
                                "gczxId": "8a8180d857482f62015750bf2ff962b2",
                                "twzt": 100,
                                "ssbmmc": "配网工程部",
                                "cjsjt": "2016-12-19 10:06:32",
                                "cjr": "ZNDQ2003"
                            }
                        ]
                    },
                    "message": "成功"
                };
                if(data.data && data.data.total > 0){
                    if(pageNum===1){
                        this.setState({
                            dataSource:data.data.list
                        })
                    }else{
                        for(let i = 0;i<data.data.list.length;i++){
                            this.state.dataSource.push(data.data.list[i]);
                        }
                        this.setState({
                            dataSource:this.state.dataSource
                        })
                    }
                    return true
                }else{
                    return false
                }
            }
        }).catch(err=>{
            this.setState({isLoading:false});
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});