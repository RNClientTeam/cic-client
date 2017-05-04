/**
 * Created by zhubin on 17/5/2.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class SettingItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                <View>
                    <Text>{this.props.app.name}</Text>
                </View>
                <View style={styles.blank}></View>
                <View>
                    <Image source={require('../../../../resource/imgs/home/applications/addIcon.png')}
                        style={styles.iconStyle}
                    ></Image>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingRight: width*0.02,
        paddingLeft: width*0.02,
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc'
    },
    blank: {
        flex: 1
    },
    iconStyle: {
        height: width*0.05,
        width: width*0.05
    }
});