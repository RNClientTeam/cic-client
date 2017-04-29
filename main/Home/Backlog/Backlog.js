/**
 * Created by Nealyang on 2017/4/29.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
const {width} = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
import BacklogHeader from './Component/BacklogHeader'
export default class Backlog extends Component {
    constructor(props){
        super(props);
        this.state = {
            index:0
        }
    }
    render() {
        return (
            <View style={styles.backlog}>
                <StatusBar navigator={this.props.navigator} title="待办"/>
                <BacklogHeader selectTag={(i)=>this.selectTag(i)} currentIndex={this.state.index}/>
            </View>
        )
    }

    selectTag(index){
        this.setState({
            index:index
        })
    }
}

const styles = StyleSheet.create({
    backlog:{
        flex:1,
        backgroundColor:"#fff"
    }
});