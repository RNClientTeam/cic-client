/**
 * Created by Nealyang on 2017/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
const {width} = Dimensions.get('window');

export default class RemindHeaderCell extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.selectTag.bind(this)}>
                <View style={styles.backlogHeaderCell}>
                    <Image style={styles.backlogHeaderImg}
                           source={this.props.src}/>
                    <Text style={this.props.onSelect?styles.backlogHeaderText:[styles.backlogHeaderText,{color:'#ddd'}]}>{this.props.name}({this.props.badge})</Text>
                </View>
                <View style={styles.onSelected}>
                    {this.props.onSelect?<Image style={styles.selectedFlag}
                                                source={require('../../../../resource/imgs/home/backlog/triangle.png')}/>:null}

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    backlogHeaderCell: {
        flex:1,
        height: width * 0.17,
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative',
        top:width*0.01
    },
    backlogHeaderImg: {
        width: width * 0.07,
        height: width * 0.07,
        resizeMode: 'contain',
        marginBottom: width * 0.02
    },
    backlogHeaderText: {
        color: '#fff',
        fontSize: width * 0.03
    },
    onSelected: {
        width: width /2,
        height: width * 0.03,
        flexDirection: 'column-reverse',
        alignItems: 'center',
    },
    selectedFlag: {
        width: width * 0.03,
        resizeMode: 'contain',
        height: width * 0.03,
    }
});