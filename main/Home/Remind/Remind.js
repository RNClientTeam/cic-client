/**
 * Created by Nealyang on 2017/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const {width} = Dimensions.get('window');
import {getTimestamp} from '../../Util/Util'
import StatusBar from '../../Component/StatusBar'
import RemindHeader from './Component/RemindHeader'
import TodoView from './Component/TodoView'
import OverView from './Component/OverView'
import Loading from "../../Component/Loading";
import toast from 'react-native-simple-toast'
export default class Remind extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styles.remind}>
                <StatusBar navigator={this.props.navigator} title="提醒"/>
                <RemindHeader selectTag={(i) => this.selectTag(i)} currentIndex={this.state.index}/>
                <ScrollView
                    horizontal={true}
                    ref='remindScroll'
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <TodoView showLoading={()=>this.showLoading()} hideLoading={()=>this.hideLoading()} navigator={this.props.navigator}/>
                    <OverView showLoading={()=>this.showLoading()} hideLoading={()=>this.hideLoading()} navigator={this.props.navigator}/>
                </ScrollView>
                {this.state.isLoading ? <Loading/> : null}
            </View>
        )
    }

    showLoading() {
        this.setState({
            isLoading: true
        })
    }

    hideLoading() {
        this.setState({
            isLoading: false
        })
    }

    selectTag(index) {
        this.setState({
            index: index
        });
        this.refs.remindScroll.scrollTo({x: width * index, y: 0, animated: true})
    }
    componentWillUnmount(){
        this.props.reloadHome();
    }

}

const styles = StyleSheet.create({
    remind: {
        backgroundColor: '#fff',
        flex: 1
    }
});