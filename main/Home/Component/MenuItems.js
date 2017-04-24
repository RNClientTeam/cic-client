/**
 * Created by Nealyang on 2017/4/24.
 * 首页菜单栏
 */
import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');
import MenuItem from './MenuItem'
export default class MenuItems extends Component{
    render(){
        return(
            <View style={styles.containerStyle}>
                <MenuItem src={require('../../../resource/imgs/home/commission.png')} name='代办' badge="118"/>
                <MenuItem src={require('../../../resource/imgs/home/remind.png')} name='提醒' badge="39"/>
                <MenuItem src={require('../../../resource/imgs/home/watch.png')} name='监控' badge="0"/>
                <MenuItem src={require('../../../resource/imgs/home/applications.png')} name='应用'/>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    containerStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#fdfdfe',
        borderBottomColor:'#dcdcdc',
        borderBottomWidth:1,
        minHeight:width*0.33,
        alignItems:'center'
    }
});
