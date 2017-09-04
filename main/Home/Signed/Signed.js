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
import {getCurrentTime,getRandomId} from '../../Util/Util'
import Loading from '../../Component/Loading'
import toast from 'react-native-simple-toast'
export default class Signed extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentTime:getCurrentTime(),
            ids:getRandomId(),
            bz:'',
            isLoading:false,
            isSuccess:false
        }
    }

    render(){
        return(
            <View style={styles.SignedContainer}>
                <StatusBar navigator={this.props.navigator} title="签到"/>
                {/*<Loading/>*/}
                <TakePhoto
                    showToast={(txt)=>this.showToast(txt)}
                    showLoading={()=>this.showLoading()}
                    hideLoading={()=>this.hideLoading()}
                    ids={this.state.ids}
                    navigator={this.props.navigator}/>
                <Info inputBz={(txt)=>this.setState({bz:txt})} currentTime={this.state.currentTime} />
                <TouchableOpacity onPress={this.getSigned.bind(this)}>
                    <Image style={styles.signedButton} source={require('../../../resource/imgs/home/signed/signedButton.png')}/>
                </TouchableOpacity>
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

    showToast(txt){
        if(txt === '图片上传成功'){
            toast.show(txt);
            this.setState({
                isSuccess:true
            })
        }else{
            toast.show('图片上传失败，请重试');
            this.setState({
                isSuccess:false
            })
        }
    }

    getSigned(){
        let reqData = {};
        this.showLoading();
        if(this.state.isSuccess){
            navigator.geolocation.getCurrentPosition((initialPosition) => {
                reqData.qdsj = getCurrentTime();
                reqData.ids = this.state.ids;
                reqData.lng = initialPosition.coords.longitude;
                reqData.lat = initialPosition.coords.latitude;
                reqData.bz = this.state.bz;
                reqData.userID = GLOBAL_USERID;
                reqData.callID = true;
                axios.get('/user/sigin',{
                    params:reqData
                }).then(data=>{
                    this.hideLoading();
                    console.log(data)
                    if(data.code === 1){
                        toast.show('签到成功!');
                        let that = this;
                        setTimeout(function () {
                            that.props.navigator.pop();
                        },800)
                    }else{
                        toast.show(data.message);
                    }
                }).catch(err=>{
                    toast.show('服务端异常');
                })
            }, (error) => {});
        }else{
            toast.show('请拍摄当前照片');
        }

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