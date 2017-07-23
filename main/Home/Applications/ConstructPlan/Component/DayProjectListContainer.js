/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Modal
} from 'react-native'
import ProjectTagName from "./ProjectTagName";
import IndexProjectListCell from "./IndexProjectListCell";
import ModalView from "./ModalView";
import {getCurrentDate} from '../../../../Util/Util'
const {width} = Dimensions.get('window');
import toast from 'react-native-simple-toast'
export default class DayProjectListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentItem:{},
            authList:[]
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView >
                    {this.renderContent(this.props.dataSource)}
                </ScrollView>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible})
                    }}
                    style={{backgroundColor: 'rgba(0, 0, 0,0.75)'}}
                >
                    <ModalView authList={this.state.authList} reload={()=>this.props.reload()} currentItem={this.state.currentItem} navigator={this.props.navigator} hiddenModal={() => {
                        this.setState({modalVisible: false})
                    }}/>
                </Modal>
            </View>
        )
    }

    setCurrentItem(item){
        this.setState({
            currentItem:item
        })
    }

    renderContent(list) {
        console.log(list);
        return list.map((items, index) =>
            (
                <View key={index}>
                    <ProjectTagName name={items.zxmc}/>
                    {items.listMap && items.listMap.length > 0 ? this.renderInsert(items.listMap) : null}
                </View>
            )
        )
    }

    renderInsert(list) {
        return list.map((item, index) =>
            (<IndexProjectListCell setCurrentItem={(item)=>this.setCurrentItem(item)} item={item} key={index} showModal={() => this._showModal(item)}/>)
        )
    }

    _showModal(item){

        axios.get('/psmSgrjh/getOperationAuthority4Sgrjh',{
            params:{
                userID:GLOBAL_USERID,
                id:item.rwid,
                sgcy:item.sgcy,
                date:getCurrentDate(),
                callID:true
            }
        }).then(data=>{
           // TODO
            data = {
                "code": 1,
                "data": {
                    "tg": true,
                    "kg": true,
                    " lsxj": true,
                    " tbwcqk ":false,
                    " qrwcqk ": false
                },
                "message": "成功"
            };
            if(data.code === 1){
                let tempArr = [];
                for(let item in data.data){
                    let tempObj = {};
                    tempObj.key=item;
                    tempObj.value=data.data[item];
                    tempArr.push(tempObj)
                }
                this.setState({
                    authList:tempArr,
                    modalVisible: true
                })

            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({});