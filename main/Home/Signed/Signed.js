/**
 * Created by Nealyang on 2017/4/26.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
const {width, height}  = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
export default class Signed extends Component{
    render(){
        return(
            <View style={styles.SignedContainer}>
                <StatusBar navigator={this.props.navigator} title="签到"/>
                <View style={styles.getPhoto}>
                    <TouchableOpacity>
                        <Image source={require('../../../resource/imgs/home/signed/getPhoto.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SignedContainer:{
        flex:1,
        backgroundColor:'#ddd'
    },
    getPhoto:{
        width:width,
        height:height*0.23,
        backgroundColor:'#216fd0'
    }
});