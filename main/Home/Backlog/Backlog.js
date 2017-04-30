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
import CopyToView from './Component/CopyToView'
export default class Backlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    render() {
        return (
            <View style={styles.backlog}>
                <StatusBar navigator={this.props.navigator} title="待办"/>
                <BacklogHeader selectTag={(i) => this.selectTag(i)} currentIndex={this.state.index}/>
                <ScrollView
                    horizontal={true}
                    ref='todoScroll'
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <TodoView/>
                    <SendView/>
                    <ApproveView/>
                    <CopyToView/>
                </ScrollView>
            </View>
        )
    }


    selectTag(index) {
        this.setState({
            index: index
        });
        this.refs.todoScroll.scrollTo({x: width * index, y: 0, animated: true})
    }
}

const styles = StyleSheet.create({
    backlog: {
        flex: 1,
        backgroundColor: "#fff"
    }
});