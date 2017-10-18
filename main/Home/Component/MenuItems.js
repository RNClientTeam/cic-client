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
                <MenuItem reloadHome = {this.props.reloadHome} navigator={this.props.navigator}  src={require('../../../resource/imgs/home/commission.png')} name='待办' badge={this.props.badges.todo}/>
                <MenuItem reloadHome = {this.props.reloadHome} navigator={this.props.navigator} src={require('../../../resource/imgs/home/remind.png')} name='提醒' badge={this.props.badges.remind}/>
                <MenuItem reloadHome = {this.props.reloadHome} navigator={this.props.navigator} src={require('../../../resource/imgs/home/watch.png')} name='监控' badge="0"/>
                <MenuItem reloadHome = {this.props.reloadHome} navigator={this.props.navigator} src={require('../../../resource/imgs/home/applications.png')} name='应用'/>
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
