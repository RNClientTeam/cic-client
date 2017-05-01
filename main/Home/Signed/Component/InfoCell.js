/**
 * Created by Nealyang on 2017/4/26.
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

export default class InfoCell extends Component{
    render(){
        return(
            <View style={styles.InfoCell}>
                <Image style={styles.icon} source={this.props.src}/>
                <View style={[styles.textView,this.props.data === ''?{borderBottomWidth:0}:{borderBottomWidth:1}]}>
                    <Text style={{fontSize:14,color:'#6b6b6b'}} numberOfLines={1}>
                        {this.props.data === ''?<Text>备注:</Text>:this.props.data}
                    </Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    InfoCell:{
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        height:width*0.14
    },
    icon:{
        width:width*0.06,
        height:width*0.06,
        marginLeft:width*0.025,
        marginRight:width*0.025
    },
    textView:{
        borderBottomColor:'#ddd',
        height:width*0.14,
        justifyContent:'center',
        width:width*0.9
    }
});