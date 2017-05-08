/**
 * Created by Nealyang on 2017/4/26.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width, height} = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <Spinner style={styles.spinner} isVisible={true} size={50} type='ThreeBounce' color='#216fd0'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex:3,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:width,
        height:height,
        backgroundColor:'rgba(0,0,0,.5)'
    }
});