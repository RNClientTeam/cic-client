/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    Modal
} from 'react-native'
import MyPlan from './MyPlan'
import MyPlanDetail from './MyPlanDetail'
import MoreActionsModal from "./MoreActionsModal"
import Toast from 'react-native-simple-toast'
import AllPlan from "./AllPlan";

const {width, height} = Dimensions.get('window');

export default class ConstructPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            rwlx: 100,
            currentPageMy: 1,
            currentPageAll:1,
            modalVisible: false,
            myTask: [],
            allTask:[],
            totalMy:0,
            totalAll:0
        };
    }
    componentDidMount() {
        this.reloadInfo();
    }

    getMyTask(pageNum = 1, pageSize = 10, rwlx = 100, callback = () => {}) {
        if (pageNum === 1) {
            this.state.myTask = [];
        }
        axios.get('/psmSgjdjh/sgjhJhrwlb', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                rwlx,
                pageNum,
                pageSize
            }
        }).then(responseData => {
            if (responseData.code === 1 ) {
                console.log(responseData,'my')
                if (responseData.data && responseData.data.data) {
                    let resultData = responseData.data.data;
                    if (resultData.length) {
                        this.setState({
                            myTask: [...this.state.myTask, ...resultData],
                            currentPageMy: pageNum,
                            totalMy: responseData.data.total
                        });
                    }
                }
                callback();
                return responseData.data.data.length>0
            } else {
                Toast.show(responseData.message);
                callback();
                return false
            }

        })
    }

    getAllTask(pageNum = 1, pageSize = 10, rwlx = 200, callback = () => {}){
        if (pageNum === 1) {
            this.state.allTask = [];
        }
        axios.get('/psmSgjdjh/sgjhJhrwlb', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                rwlx,
                pageNum,
                pageSize
            }
        }).then(responseData => {
            if (responseData.code === 1 ) {
                console.log(responseData,'all')
                if (responseData.data && responseData.data.data) {
                    let resultData = responseData.data.data;
                    if (resultData.length) {
                        this.setState({
                            allTask: [...this.state.myTask, ...resultData],
                            currentPageAll: pageNum,
                            totalAll: responseData.data.total
                        });
                    }
                }
                callback();
                return responseData.data.data.length>0
            } else {
                Toast.show(responseData.message);
                callback();
                return false
            }

        })
    }

    loadMoreMy() {
        if (this.state.totalMy && (this.state.myTask.length < this.state.totalMy)) {
            this.getMyTask(this.state.currentPageMy + 1, 10);
        }else{
            return false
        }

    }

    loadMoreAll(){
        if (this.state.totalAll && (this.state.allTask.length < this.state.totalAll)) {
            this.getAllTask(this.state.currentPageAll + 1, 10);
        }else{
            return false
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.segmentView}>
                    <TouchableOpacity onPress={() => this.changePage(0)}>
                        <View style={[styles.leftView,{backgroundColor:this.state.tab===0?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.tab===0?'white':'#4fa6ef'}}>我的任务</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changePage.bind(this, 1)}>
                        <View style={[styles.rightView,{backgroundColor:this.state.tab===1?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.tab===1?'white':'#4fa6ef'}}>全部任务</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    ref={"scrollView"}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <MyPlan navigator={this.props.navigator}
                            loadMore={() => this.loadMoreMy()}
                            dataSource={this.state.myTask}
                            setModalVisible={(rwid) => this.setModalVisible(rwid)}
                    />
                    <AllPlan
                        navigator={this.props.navigator}
                        loadMore={() => this.loadMoreAll()}
                        dataSource={this.state.allTask}
                        setModalVisible={(rwid) => this.setModalVisible(rwid)}
                    />

                </ScrollView>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreActionsModal navigator={this.props.navigator}
                                      reloadInfo={()=>this.reloadInfo()}
                                      rwid={this.state.rwid}
                                      authority={this.state.authority}
                                      closeModal={() => {this.setState({modalVisible: false})}}/>
                </Modal>
                <TouchableOpacity onPress={() => this.create()}>
                    <View style={styles.button}>
                        <Image
                            source={require('../../../../../resource/imgs/home/earlierStage/addData.png')}
                            style={{height: 0.05 * width, width: 0.05 * width, marginRight: 0.02 * width}}
                        />
                        <Text style={styles.buttonText}>新建计划</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    reloadInfo(){
        this.getMyTask();
        this.getAllTask();
    }

    create() {
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail',
            params: {
                gczxId: this.props.gczxId,
                cfxxId: this.props.cfxxId,
                reloadInfo: () => this.reloadInfo(),
            }
        });
    }

    changePage(page) {
        if (this.state.tab !== page) {
            this.setState({tab:page});
            this.refs.scrollView.scrollTo({x:page*width,y:0,animated:true});
        }
    }

    setModalVisible(rwid) {
        axios.get('/psmSgjdjh/operationAuthority4bz', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                sgrwId: rwid,
                belongTo: 2, // 2,'施工计划'
                callID: true,
            }
        }).then(responseData => {
            if (responseData.code === 1) {
                this.setState({
                    authority: responseData.data,
                    modalVisible: true,
                    rwid,
                })
            } else {
                Toast.show(responseData.data);
            }
        }).catch( error => {
            if (error) {
                Toast.show('服务端异常');
            }
        } );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    segmentView: {
        width: width,
        height: 0.0645 * height,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftView: {
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    },
    rightView: {
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#216fd0'
    }
});
