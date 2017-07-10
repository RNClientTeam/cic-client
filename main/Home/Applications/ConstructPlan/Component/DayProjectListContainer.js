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
const {width} = Dimensions.get('window');

export default class DayProjectListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentItem:{}
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
                    <ModalView reload={()=>this.props.reload()} currentItem={this.state.currentItem} navigator={this.props.navigator} hiddenModal={() => {
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
            (<IndexProjectListCell setCurrentItem={(item)=>this.setCurrentItem(item)} item={item} key={index} showModal={() => this.setState({modalVisible: true})}/>)
        )
    }
}

const styles = StyleSheet.create({});