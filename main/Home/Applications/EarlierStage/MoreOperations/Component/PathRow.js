/**
 * Created by zhubin on 17/5/6.
 */

import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'

const {width, height}  = Dimensions.get('window');

export default class PathRow extends Component{
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.title}>
                    <Image style={styles.icon}
                           source={require('../../../../../../resource/imgs/home/earlierStage/location.png')}/>
                    <Text style={[styles.titleColor]}>
                        {this.props.data.actionName}
                    </Text>
                    <View style={styles.blank}/>
                </View>
                <View style={{marginTop:width*0.02,paddingLeft: 0.07 * width}}>
                    <Text>{this.props.spyj}</Text>
                </View>
                <View style={styles.detail}>
                    <View style={styles.paddingBottom}>
                        <Text>{this.props.data.spr}</Text>
                    </View>
                    <View>
                        <Text>{this.props.data.spsj}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        content:{
            backgroundColor: '#fff',
            borderColor: '#d2d2d2',
            marginLeft: 0.01 * width,
            marginRight: 0.01 * width,
            marginBottom: 0.02 * width,
            paddingLeft: 0.05 * width,
            paddingRight: 0.05 * width,
            borderWidth: 0.5
        },
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            height: 0.07 * height
        },
        icon: {
            width:width*0.05,
            height:width*0.05,
            marginRight: 0.02 * width
        },
        detail: {
            paddingLeft: 0.07 * width,
            paddingTop: 0.04 * width,
            paddingBottom: 0.04 * width,
            flexDirection:'row',
            justifyContent:'space-between'
        },
        paddingBottom: {
            paddingBottom: 0.02 * width,
            marginRight:width*0.04
        },
        blank: {
            flex: 1
        },
        titleColor: {
            color: '#637388'
        },
        actionColor: {
            color: '#216fd0'
        }
    }
);
