/**
 * Created by Nealyang on 2017/4/24.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class ManageCount extends Component{
    render(){
        return(
            <View style={styles.manageCountStyle}>
                <Text style={styles.countStyle}>{this.props.count}</Text>
                <Text style={styles.nameStyle}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    manageCountStyle:{
        width:width*0.92/3,
        alignItems:'center',
        height:width*0.2,
        justifyContent:'center'
    },
    countStyle:{
        color:'#f28214',
        fontWeight:'bold',
        fontSize:15
    },
    nameStyle:{
        color:'#666',
        fontSize:14,
        marginTop:7
    }
});