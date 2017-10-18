/**
 * Created by Nealyang on 2017/4/29.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const {width} = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
import BacklogHeader from './Component/BacklogHeader'
import TodoView from './Component/TodoView'
import SendView from './Component/SendView'
import ApproveView from './Component/ApproveView'
import Loading from "../../Component/Loading";
export default class Backlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            isLoading:false
        }
    }

    render() {
        return (
            <View style={styles.backlog}>
                <StatusBar navigator={this.props.navigator} title="待办"/>
                <BacklogHeader badge={this.props.badge} selectTag={(i) => this.selectTag(i)} currentIndex={this.state.index}/>
                <ScrollView
                    horizontal={true}
                    ref='todoScroll'
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <TodoView showLoading={()=>this.showLoading()} hideLoading={()=>this.hideLoading()} navigator={this.props.navigator}/>
                    <SendView showLoading={()=>this.showLoading()} hideLoading={()=>this.hideLoading()} navigator={this.props.navigator}/>
                    <ApproveView showLoading={()=>this.showLoading()} hideLoading={()=>this.hideLoading()} navigator={this.props.navigator}/>
                </ScrollView>
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    showLoading(){
        this.setState({
            isLoading:true
        })
    }

    hideLoading(){
        this.setState({
            isLoading:false
        })
    }


    selectTag(index) {
        this.setState({
            index: index
        });
        this.refs.todoScroll.scrollTo({x: width * index, y: 0, animated: true})
    }

    componentWillUnmount(){
        this.props.reloadHome();
    }

}

const styles = StyleSheet.create({
    backlog: {
        flex: 1,
        backgroundColor: "#fff"
    }
});