/**
 * Created by Nealyang on 2017/4/26.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height}  = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
import TakePhoto from './Component/TakePhoto'
import Info from './Component/Info'
export default class Signed extends Component{
    render(){
        return(
            <View style={styles.SignedContainer}>
                <StatusBar navigator={this.props.navigator} title="签到"/>
                <TakePhoto navigator={this.props.navigator}/>
                <Info/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SignedContainer:{
        flex:1,
        backgroundColor:'#ddd'
    }
});