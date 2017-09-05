/**
 * Created by Nealyang on 2017/4/25.
 * isTodo
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
const {width} = Dimensions.get('window');

export default class IsTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diyiwei: parseInt(parseInt(this.props.isTodo) / 10),
            dierwei: parseInt(parseInt(this.props.isTodo) % 10)
        }
    }
    render() {
        let first = '', second = '';
        if (this.state.diyiwei === 0) {
            first = null;
        } else if (this.state.diyiwei === 1) {
            first = require('../../../../resource/imgs/home/11.png')
        }
        if (this.state.dierwei === 0) {
            second = null
        } else if (this.state.dierwei === 1) {
            second = require('../../../../resource/imgs/home/21.png')
        } else if (this.state.dierwei === 2) {
            second = require('../../../../resource/imgs/home/22.png')
        } else if (this.state.dierwei === 3) {
            second = require('../../../../resource/imgs/home/23.png')
        } else if (this.state.dierwei === 4) {
            second = require('../../../../resource/imgs/home/24.png')
        } else if (this.state.dierwei === 5) {
            second = require('../../../../resource/imgs/home/25.png')
        }
        return (
            <View style={styles.topView}>
                {this.state.diyiwei === 0 ? null : <Image style={styles.iconImg} source={first}/>}
                {this.state.dierwei === 0 ? null : <Image style={styles.iconImg} source={second}/>}
            </View>
        )
    }


}

const styles = StyleSheet.create({
    topView: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        width: width * 0.6,
        paddingVertical: 10
    },
    iconImg: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * 0.03
    }
});
