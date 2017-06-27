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

const {width, height} = Dimensions.get('window');

export default class ConstructPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            currentPage: 1,
            modalVisible: false,
            myTask: []
        };
    }
    componentDidMount() {
        this.getMyTask();
    }

    getMyTask(pageNum = 1, pageSize = 10, callback = () => {}) {
        if (pageNum === 1) {
            this.state.myTask = [];
        }
        axios.get('/psmSgjdjh/sgjhJhrwlb', {
            params: {
                userID: GLOBAL_USERID,
                gczxId: this.props.gczxId,
                pageNum,
                pageSize
            }
        }).then(data => {
            if (data && data.data && data.data.data) {
                let resultData = data.data.data;
                if (resultData.length) {
                    this.setState({
                        myTask: [...this.state.myTask, ...resultData],
                        currentPage: pageNum,
                        total: data.data.total
                    });
                }
            }
            callback();
        })
    }

    loadMore() {
        if (this.state.total && (this.state.myTask.length < this.state.total)) {
            this.getMyTask(this.state.currentPage + 1, 10);
            return true
        }
        return false
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.segmentView}>
                    <TouchableOpacity onPress={this.changePage.bind(this, 0)}>
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
                            loadMore={() => this.loadMore()}
                            dataSource={this.state.myTask}
                            setModalVisible={() => this.setModalVisible()}
                    />
                    <MyPlan navigator={this.props.navigator}
                            loadMore={() => this.loadMore()}
                            dataSource={this.state.myTask}
                            setModalVisible={() => this.setModalVisible()}
                    />
                </ScrollView>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
                >
                    <MoreActionsModal navigator={this.props.navigator}
                                      closeModal={() => {this.setState({modalVisible: false})}}/>
                </Modal>
                <TouchableOpacity onPress={this.create.bind(this)}>
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

    create() {
        this.props.navigator.push({
            component: MyPlanDetail,
            name: 'MyPlanDetail'
        });
    }

    changePage(page) {
        if (this.state.tab !== page) {
            this.setState({tab:page});
            this.refs.scrollView.scrollTo({x:page*width,y:0,animated:true});
        }
    }

    setModalVisible() {
        this.setState({
            modalVisible: true
        })
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
