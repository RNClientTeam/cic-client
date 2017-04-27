/**
 * Created by Nealyang on 2017/4/26.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
const {width, height}  = Dimensions.get('window');
import CameraPage from '../../Component/CameraPage'
export default class TakePhoto extends Component{
    render(){
        return(
            <View style={styles.getPhoto}>
                <TouchableOpacity onPress={this.takePhoto.bind(this)}>
                    <Image style={styles.cameraIcon} source={require('../../../../resource/imgs/home/signed/getPhoto.png')}/>
                </TouchableOpacity>
                <Text style={styles.photoText}>拍摄上传照片</Text>
            </View>
        )
    }

    takePhoto(){
        this.props.navigator.push({
            name:'CameraPage',
            component:CameraPage
        })
    }
}

const styles = StyleSheet.create({
    getPhoto:{
        width:width,
        height:height*0.23,
        backgroundColor:'#216fd0',
        alignItems:'center',
        justifyContent:'center'
    },
    cameraIcon:{
        width:width*0.17,
        height:width*0.17,
    },
    photoText:{
        fontSize:14,
        color:'#fff',
        marginTop:10
    }
});