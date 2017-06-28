/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    Switch
} from 'react-native'
import {getCurrentMonE,getCurrentMonS} from '../../../../Util/Util'
import ChoiceDate from "../../../../Component/ChoiceDate";
const {width, height} = Dimensions.get('window');
const Platform = require('Platform');
import ModalDropdown from 'react-native-modal-dropdown';
export default class ProjectSubitemSplitModal extends Component{

    constructor(props){
        super(props);
        this.state={
            startDate:this.props.sDate,
            endDate:this.props.eDate,
            isSplit:this.props.cfzt,
            options:['我的','所有'],
            choiceOption:'我的'
        }
    }

    render(){
        return(
            <View style={[styles.earlierStageListModalView,Platform.OS === 'android' ?{top:44}:{top:64}]}>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>是否拆分</Text>
                    <View style={styles.indicateView}>
                        <Switch
                        value={this.state.isSplit}
                        onValueChange={(value)=>{this.setState({isSplit:value})}}
                        disabled={false}
                        onTintColor={"#216fd0"}
                        />
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>开始时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.startDate} changeDate={(data)=>this.setState({startDate:data})}/>
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>

                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>结束时间</Text>
                    <View style={styles.indicateView}>
                        <ChoiceDate showDate={this.state.endDate} changeDate={(data)=>this.setState({endDate:data})}/>
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.containerStyle}>
                    <Text style={styles.nameStyle}>计划类型</Text>
                    <View style={styles.indicateView}>
                        <ModalDropdown
                            options={this.state.options}
                            animated={true}
                            defaultValue={this.state.choiceOption}
                            style={styles.modalDropDown}
                            textStyle={styles.modalDropDownText}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(a)=>{this.setState({choiceOption:this.state.options[a]})}}
                            showsVerticalScrollIndicator={false}
                        />
                        <Image style={styles.indicateImage}  source={require('../../../../../resource/imgs/home/applications/triangle.png')}/>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={[styles.clickButton,{backgroundColor:'#dbdada'}]} onPress={()=>this.props.closeModal()}>
                        <Text>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clickButton,{backgroundColor:'#216fd0'}]} onPress={()=>{
                        this.props.closeModal();
                        this.props.getDataFromNet(this.state.startDate,this.state.endDate,this.state.isSplit,this.state.choiceOption)
                    }}>
                        <Text style={{color:'#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentDidMount() {
        // console.log(getCurrentMonS(),getCurrentMonE())
    }
}

const styles = StyleSheet.create({
    earlierStageListModalView: {
        height: height - 64,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position:'absolute',
        width:width,
        zIndex:3,
    },
    containerStyle:{
        backgroundColor:'#fff',
        height:width*0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:width*0.02,
        paddingRight:width*0.02,
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    nameStyle:{
        color:'#216fd0',
        fontSize:width*0.035
    },
    indicateView:{
        flexDirection:'row',
        alignItems:'center'
    },
    indicateImage:{
        width:width*0.02,
        height:width*0.02,
        marginLeft:width*0.02
    },
    modalDropDownText:{
        fontSize:width*0.035,
    },
    dropdownStyle:{
        width:width*0.55,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonView:{
        height:width*0.3,
        width:width,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    clickButton:{
        width:width*0.3,
        height:width*0.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    }
});
