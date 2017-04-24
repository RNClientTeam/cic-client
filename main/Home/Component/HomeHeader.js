/**
 * Created by Nealyang on 2017/4/24.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class HomeHeader extends Component{
    render(){
        return(
            <View style={styles.homeHeaderStyle}>
                <Image style={styles.iconStyle} source={this.props.src}/>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeHeaderStyle:{
        flexDirection:'row',
        alignItems:'center',
        height:width*0.13
    },
    iconStyle:{
        width:width*0.06,
        height:width*0.06,
        marginRight:10
    },
    textStyle:{
        color:'#000'
    }
});
