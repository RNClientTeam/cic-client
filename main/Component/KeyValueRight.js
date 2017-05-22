/**
 * Created by Nealyang on 2017/5/21.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TextInput
} from 'react-native'
const {width}  = Dimensions.get('window');

export default class KeyValueRight extends Component{
    constructor(props){
        super(props);
        this.state={
            textValue:this.props.defaultValue
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:'#5476a1'}}>{this.props.propKey}</Text>
                <TextInput
                    style={styles.inputStyle}
                    value={this.state.textValue}
                    placeholder='请填写'
                    underlineColorAndroid="transparent"
                    editable={!this.props.readOnly}
                    onChangeText={(value)=>this.setState({textValue:value})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:width*0.12,
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    inputStyle:{
        height:width*0.12,
        color:'#666',
        width:width*0.5,
        textAlign:'right',
        fontSize:14
    }
});