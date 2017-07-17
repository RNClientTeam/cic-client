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
                <View style={styles.choiceView}>
                    <View style={styles.tagView}>
                        <TouchableOpacity onPress={()=>this.props.changeRange('我的')} style={[styles.oneTagView,{borderRightColor:'#216fd0',borderRightWidth:1},this.props.range==='我的'?{backgroundColor:'#216fd0'}:{backgroundColor:'#fff'}]}>
                            <Text style={[styles.tagText,this.props.range==='我的'?{color:'#fff'}:{color:'#216fd0'}]}>我的</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.changeRange('全部')} style={[styles.oneTagView,this.props.range==='全部'?{backgroundColor:'#216fd0'}:{backgroundColor:'#fff'}]}>
                            <Text style={[styles.tagText,this.props.range==='全部'?{color:'#fff'}:{color:'#216fd0'}]}>全部</Text>
                        </TouchableOpacity>
                    </View>
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