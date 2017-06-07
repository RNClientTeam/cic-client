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
                    <TodoView/>
                    <OverView/>
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

    componentDidMount() {
        this.showLoading();
        // axios.get('/msg/list4bs', {
        //     params: {
        //         userID: GLOBAL_USERID,
        //         callID: getTimestamp()
        //     }
        // }).then(data => {
        //         this.hideLoading();
        //         console.log(data)
        //     }).catch(err => {
        //     console.error(err);
        //     this.hideLoading();
        // })
        axios.get('/msg/list4bs',{
            params:{
                userID:GLOBAL_USERID,
                callID:getTimestamp()
            }
        }).then(data=>{
            this.hideLoading();
            if(data.code===0||  (data.code&&data.code!==1)){
                toast.show(data.message);
            }
        }).catch(err=>{
            console.error(err);
            toast.show('服务端错误!');
            this.hideLoading();
        })
    }
}

const styles = StyleSheet.create({
    remind: {
        backgroundColor: '#fff',
        flex: 1
    }
});