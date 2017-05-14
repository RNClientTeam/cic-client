/**
 * Created by Nealyang on 2017/5/10.
 */
/**
 * Created by Nealyang on 2017/5/10.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import ConstructPlanChoiceDate from "../../../../Component/ConstructPlanChoiceDate";
const {width} = Dimensions.get('window');

export default class ConstructPlanHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.indicateView}>
                    <ConstructPlanChoiceDate/>
                    <Image style={styles.indicateImage}
                           source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                </View>
                <TouchableOpacity style={styles.todayView}>
                    <Text style={styles.today}>今天</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: width * 0.12,
        backgroundColor: '#fff',
        flexDirection: "row"
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent:'center'
    },
    indicateImage: {
        width: width * 0.02,
        height: width * 0.02,
        marginLeft: width * 0.02
    },
    todayView: {
        backgroundColor: '#fab05f',
        height: width * 0.08,
        width: width * 0.12,
        position: 'absolute',
        right: width * 0.02,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        marginTop:width*0.02
    },
    today:{
        color:'#fff'
    }
});