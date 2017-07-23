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

export default class QualityCheckPlanHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.choiceView}>
                </View>
                <View style={styles.indicateView}>
                    <ConstructPlanChoiceDate changeDate={this.props.changeDate.bind(this)}/>
                    <Image style={styles.indicateImage}
                           source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                </View>
                <View style={styles.rightView}>
                    <TouchableOpacity style={styles.todayView}>
                        <Text style={styles.today}>今天</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    choiceView: {
        flex: 1,
        justifyContent:'center',
    },
    tagView: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#216fd0',
        width: width * 0.2,
        flexDirection: 'row',
        marginLeft:width*0.02,
        height:width*0.06,
        borderRadius:4
    },
    oneTagView:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    tagText:{
        fontSize:width*0.03
    },
    container: {
        height: width * 0.12,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    indicateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.02,
        marginRight: width * 0.02
    },
    today: {
        color: '#fff'
    },
    rightView: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    }
});