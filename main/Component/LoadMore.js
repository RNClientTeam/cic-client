/**
 * Created by Nealyang on 2017/5/1.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width}  = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
export default class LoadMore extends Component{
    render(){
        return(
            <View style={styles.loadMore}>
                <Spinner style={styles.spinner} isVisible={true} size={50} type='ThreeBounce' color='#216fd0'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadMore:{
        width:width,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:width*0.02
    }
});