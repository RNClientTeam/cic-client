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
import KeyValue from "../../../../Component/KeyValue";
const {width} = Dimensions.get('window');

export default class ProjectRangeHandoverInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {key:"所属部门",value:"市场营销一部"},
                {key:"项目经理",value:"王二"},
                {key:"合同工期开始时间",value:"2017-02-16"},
                {key:"合同工期结束时间",value:"2017-09-12"},
                {key:"合同计划开始时间",value:"2017-09-12"},
                {key:"合同计划结束时间",value:"2017-09-12"},
            ]
        }
    }

    render() {
        return (
            <View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText} numberOfLines={1}>
                        【电气业务】{this.props.proNum} {this.props.proName}
                    </Text>
                </View>
                <KeyValue  propsKey='所属部门' propsValue='市场营销一部'/>
                <KeyValue  propsKey='项目经理' propsValue='哈哈哈'/>
                <View style={styles.stateView}>
                    <View style={styles.textContainer}>
                        <Text style={{color:'#5476a1'}}>交接状态</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{backgroundColor:this.props.stateBg,height:width*0.05,width:this.props.proState.length*15,justifyContent:'center',borderRadius:6}}>
                            <Text style={{color:'#fff',fontSize:width*0.034,textAlign:'center'}}>{this.props.proState}</Text>
                        </View>
                    </View>
                </View>
                <KeyValue  propsKey='拆分时间' propsValue='2017-02-16'/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#fff',
        marginTop: width * 0.02,
        height: width * 0.12,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent:'center'
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
        paddingLeft:width*0.02,
        justifyContent:'center'
    }
});