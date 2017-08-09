/**
 * Created by fan on 2017/05/10.
 */
import React, {Component} from 'react'
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

const {width} = Dimensions.get('window');
import StatusBar from '../../../Component/StatusBar.js';
import ApartmentPlaneList from './Component/ApartmentPlaneList.js';
import SearchHeader from '../Component/SearchHeader.js';
import MoreOperation from './Component/MoreOperation.js';
import AddApartmentPlane from './Component/AddApartmentPlane.js';
import Loading from "../../../Component/Loading";
import {getCurrentMonS, getCurrentMonE} from '../../../Util/Util'
import ApartmentListModalView from "./Component/ApartmentListModalView";
import toast from 'react-native-simple-toast'

export default class ApartmentPlane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            modalVisible: false,
            isLoading: false,
            dataType: '我的',//1,全部:2
            jhmc: '',
            sDate: getCurrentMonS(),
            eDate: getCurrentMonE(),
            pageNum: 1,
            rwzt: '请选择任务状态',
            rwztmc: '请选择任务状态',
            dataList: [],
            operatingItem: {},
            authList: [],
        }
    }

    addBtn() {
        this.props.navigator.push({
            component: AddApartmentPlane,
            name: 'AddApartmentPlane',
            params: {
                reload: () => this.getDataFromNet()
            }
        });
    }

    render() {
        return (
            <View style={styles.earlierStage}>
                <StatusBar navigator={this.props.navigator} title="部门计划">
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.addBtn()
                        }}
                    >
                        <Image style={{
                            width: 0.045 * width,
                            height: 0.045 * width,
                            position: 'absolute',
                            right: width * 0.15
                        }}
                               source={require('../../../../resource/imgs/home/earlierStage/add.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isModalVisible: !this.state.isModalVisible})
                        }}
                    >
                        <Image style={styles.filtrate}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                {/*添加功能*/}
                <SearchHeader changeZxmc={(text) => this.setState({jhmc: text})} getData={() => this.getDataFromNet()}/>
                <ApartmentPlaneList
                    loadMore={() => this.loadMore()}
                    dataSource={this.state.dataList}
                    navigator={this.props.navigator}
                    refresh={(resolve) => this.getDataFromNet(1, resolve)}
                    getOperatingItem={(item) => this.getOperatingItem(item)}
                    setModalVisible={(item) => this._getAuthList(item)}/>
                {this.state.isModalVisible &&
                <ApartmentListModalView
                    rwzt={this.state.rwzt}
                    rwztmc={this.state.rwztmc}
                    sDate={this.state.sDate}
                    eDate={this.state.eDate}
                    isModalVisible={this.state.isModalVisible}
                    changeFilter={(sDate, eDate, rwzt, rwztmc) => this.changeFilter(sDate, eDate, rwzt, rwztmc)}
                    choiceRwzt={(rwzt) => this.setState({rwzt: rwzt})}
                    closeModal={() => this.setState({isModalVisible: false})}
                />}
                {
                    this.state.modalVisible &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false})
                        }}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <MoreOperation
                            operatingItem={this.state.operatingItem}
                            reload={this.getDataFromNet.bind(this)}
                            navigator={this.props.navigator}
                            authList={this.state.authList}
                            closeModal={() => this.setState({modalVisible: false})}/>
                    </Modal>
                }
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    getOperatingItem(item) {
        this.setState({
            operatingItem: item
        })
    }

    showLoading() {
        this.setState({
            isLoading: true
        })
    }

    changeFilter(sDate, eDate, rwzt, rwztmc) {
        this.setState({
            sDate: sDate,
            eDate: eDate,
            rwzt: rwzt,
            rwztmc: rwztmc,
            pageNum: 1
        }, function () {
            this.getDataFromNet(1);
        })
    }

    loadMore() {
        this.setState({
            pageNum: this.state.pageNum + 1
        }, function () {
            this.getDataFromNet(this.state.pageNum)
        })
    }

    hideLoading() {
        this.setState({
            isLoading: false
        })
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    _getAuthList(jhId) {
        this.showLoading();
        this.setState({modalVisible: true});
        axios.get('/psmBmjh/getOperationAuthority4Bmjh', {
            params: {
                userID: GLOBAL_USERID,
                jhId: jhId,
                callID: true
            }
        }).then(data => {
            this.hideLoading();
            if (data.code === 1) {
                let arr = [];
                for (let item in data.data) {
                    let templateObj = {};
                    templateObj.name = item;
                    templateObj.show = data.data[item];
                    arr.push(templateObj);
                }
                this.setState({
                    modalVisible: true,
                    authList: arr
                })
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            this.hideLoading();
            toast.show('服务端异常');
        })
    }

    getDataFromNet(pageNum = 1, resolve = () => {
    }) {
        this.showLoading();
        let rwzt = 'all';
        axios.get('/psmBmjh/list', {
            params: {
                userID: GLOBAL_USERID,
                dataType: 2,
                jhmc: this.state.jhmc,
                sDate: this.state.sDate,
                eDate: this.state.eDate,
                rwzt: this.state.rwzt === '请选择任务状态' ? rwzt : this.state.rwzt,
                pageNum: pageNum,
                pageSize: 10,
                callID: true
            }
        }).then(data => {
            this.hideLoading();
            if (data.code === 1) {
                if (pageNum === 1) {
                    this.setState({
                        dataList: data.data.list
                    })
                } else {
                    for (let i = 0; i < data.data.list.length; i++) {
                        this.state.dataList.push(data.data.list[i])
                    }
                    this.setState({
                        dataList: this.state.dataList
                    })
                }
                resolve();
                return data.data.list.length > 0;
            } else {
                toast.show(data.message)
            }
        }).catch(err => {
            this.hideLoading();
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    earlierStage: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    filtrate: {
        width: width * 0.045,
        height: width * 0.045
    }
});
