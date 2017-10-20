/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import KeyValue from "../../../../Component/KeyValueLeft";
const {width} = Dimensions.get('window');

export default class ProjectRangeHandoverInfo extends Component {
    render() {
        console.log(this.props);
        return (
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>
                        {this.props.data.xmlbmc}【{this.props.xmbh}】 {this.props.proName}
                    </Text>
                </View>
                <KeyValue  propsKey='所属部门' propsValue={this.props.ssbm}/>
                <KeyValue  propsKey='项目经理' propsValue={this.props.xmjl}/>
                <KeyValue  propsKey='交接状态' propsValue={this.props.jjzt}/>
                {/*<View style={styles.stateView}>*/}
                    {/*<View style={styles.textContainer}>*/}
                        {/*<Text style={{color:'#5476a1'}}>交接状态</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex:1,justifyContent:'center',backgroundColor:'red'}}>*/}
                        {/*<View style={{backgroundColor:'#fe9a25',height:width*0.05,width:this.props.jjzt.length*15,justifyContent:'center',borderRadius:6}}>*/}
                            {/*<Text style={{color:'#fff',fontSize:width*0.034,textAlign:'center'}}>{this.props.jjzt}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <KeyValue  propsKey='拆分时间' propsValue={this.props.cfsj}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#fff',
        marginTop: width * 0.02,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10
    },
    headerText: {
        fontWeight: '500',
        marginLeft:width*0.02
    },
    stateView:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:width*0.12,
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    textContainer:{
        flex:1,
        paddingLeft:15,
        justifyContent:'center',
        width:width*0.04
    }
});
