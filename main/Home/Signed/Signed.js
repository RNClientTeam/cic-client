/**
 * Created by Nealyang on 2017/4/26.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
const {width, height}  = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar'
import TakePhoto from './Component/TakePhoto'
import Info from './Component/Info'
import {getCurrentTime} from '../../Util/Util'
import Loading from '../../Component/Loading'
export default class Signed extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentTime:getCurrentTime()
        }
    }

    render(){
        return(
            <View style={styles.SignedContainer}>
                <StatusBar navigator={this.props.navigator} title="签到"/>
                <Loading/>
                <TakePhoto navigator={this.props.navigator}/>
                <Info currentTime={this.state.currentTime} />
                <TouchableOpacity onPress={this.getSigned.bind(this)}>
                    <Image style={styles.signedButton} source={require('../../../resource/imgs/home/signed/signedButton.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    getSigned(){
        this.setState({
            currentTime:getCurrentTime()
        });
        navigator.geolocation.getCurrentPosition((initialPosition) => {
            this.coord = initialPosition.coords.latitude+','+initialPosition.coords.longitude;
            alert(initialPosition.coords.latitude+','+initialPosition.coords.longitude)
        }, (error) => {});
    }
}

const styles = StyleSheet.create({
    SignedContainer:{
        flex:1,
        backgroundColor:'#ddd',
        alignItems:'center',
    },
    signedButton:{
        width:width*0.2,
        height:width*0.2,
        marginTop:width*0.1
    }
});