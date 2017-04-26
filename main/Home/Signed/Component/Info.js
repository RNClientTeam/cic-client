/**
 * Created by Nealyang on 2017/4/26.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native'
const {width}  = Dimensions.get('window');
import {getCurrentTime} from '../../../Util/Util'
import InfoCell from './InfoCell'
export default class Info extends Component{

    constructor(props){
        super(props);
        this.state = {
            location:'北京市北京市朝阳区安贞街道胜古南里21号楼1单元202',
            currentTime:getCurrentTime(),
            remark:''
        }
    }

    render(){
        return(
            <View style={styles.info}>
                <InfoCell src={require('../../../../resource/imgs/home/signed/location.png')} data={this.state.location}/>
                <InfoCell src={require('../../../../resource/imgs/home/signed/time.png')} data={this.state.currentTime}/>
                <InfoCell src={require('../../../../resource/imgs/home/signed/remark.png')} data=''/>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        autoFocus={true}
                        placeholder='请填写备注信息'
                        onChangeText={(remark) => this.setState({remark})}
                    />
                </View>
                <TouchableOpacity onPress={this.getSigned.bind(this)}>
                    <Image style={styles.signedButton} source={require('../../../../resource/imgs/home/signed/signedButton.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    getSigned(){
        this.setState({
            currentTime:getCurrentTime()
        })
    }
}

const styles = StyleSheet.create({
    info:{
        alignItems:'center',
    },
    inputView:{
        backgroundColor:'#fff',
        paddingBottom:20,
        width:width
    },
    textInput:{
        height:width*0.3,
        backgroundColor:'#f2f2f2',
        width:width*0.84,
        marginLeft:width*0.1,
        borderRadius:10,
        fontSize:15
    },
    signedButton:{
        width:width*0.2,
        height:width*0.2,
        marginTop:width*0.1
    }
});