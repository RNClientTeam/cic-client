/**
 * Created by Nealyang on 2017/4/30.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
const {width}  = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
import RemindHeader from './Component/RemindHeader'
import TodoView from './Component/TodoView'
import OverView from './Component/OverView'
export default class Remind extends Component{

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    render(){
        return(
            <View style={styles.remind}>
                <StatusBar navigator={this.props.navigator} title="提醒"/>
                <RemindHeader selectTag={(i) => this.selectTag(i)} currentIndex={this.state.index}/>
                <ScrollView
                    horizontal={true}
                    ref='remindScroll'
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <TodoView/>
                    <OverView/>
                </ScrollView>
            </View>
        )
    }

    selectTag(index) {
        this.setState({
            index: index
        });
        this.refs.remindScroll.scrollTo({x: width * index, y: 0, animated: true})
    }
}

const styles = StyleSheet.create({
    remind:{
        backgroundColor:'#fff',
        flex:1
    }
});