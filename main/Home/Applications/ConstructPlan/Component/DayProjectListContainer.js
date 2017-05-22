/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React,{Component} from 'react'
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
const {width}  = Dimensions.get('window');

export default class DayProjectListContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            modalVisible:false
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView >
                    <ProjectTagName name="工程子项拆分项目1"/>
                    <IndexProjectListCell showModal={()=>this.setState({modalVisible: true})}/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <ProjectTagName name="其他任务"/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
                    <IndexProjectListCell/>
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
                    <ModalView navigator={this.props.navigator} hiddenModal={()=>{this.setState({modalVisible: false})}}/>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});