"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import KeyTime from "../../../../Component/KeyTime";
import KeyPercentage from "../../../../Component/KeyPercentage";
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'

export default class FillProgress extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            jhmc:'',
            wcbl:'',
            sjqdsj:'',
            sjwcsj:'',
            wcbz:'',
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="填报进展" navigator={this.props.navigator}/>
                <View style={styles.itemView}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>部门工作计划1</Text>
                </View>
                <KeyPercentage propKey="当前进度" value={this.state.wcbl} textChange={(value)=>this.setState({wcbl:value})}/>
                <KeyTime propKey="实际开始时间" showDate={this.state.sjqdsj} changeDate={(date)=>this.setState({sjqdsj:value})}/>
                {parseInt(this.state.wcbl)===100?
                    <KeyTime propKey="实际完成时间" showDate={this.state.sjwcsj} changeDate={(date)=>this.setState({sjwcsj:value})}/>
                :null}

                <View style={styles.lastItem}>
                    <Text style={styles.textKeySty}>当前完成情况*</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder="在此输入"
                        multiline={true}
                        onChangeText={(value)=>{
                            this.setState({
                                wcbz:value
                            })
                        }}
                        value={this.state.wcbz}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                </View>

                <TouchableOpacity style={styles.btnView} onPress={this.clickBtn.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>
                        确认提交
                    </Text>
                </TouchableOpacity>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }
    clickBtn() {
        alert('确认提交');
    }

    componentDidMount() {
        this.setState({
            isLoading:true
        });
        axios.get('/psmBmjh/detail',{
            params:{
                jhId:this.props.id,
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code === 1){
                this.setState({
                    jhmc:data.jhmc,
                    sjqdsj:data.sjqdsj||data.qdsj,
                    sjwcsj:data.sjwcsj,
                    wcbl:data.wcbl,
                    wcbz:wcbz
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            toast.show('服务端异常');
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        flexDirection: 'row',
        width: width,
        height: 0.0735 * height,
        alignItems: 'center',
        paddingLeft:width*0.02,
        backgroundColor:'#fff',
        justifyContent: 'space-between',
        marginBottom: 1
    },
    btnView: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#216fd0'
    },
    textKeySty: {
        color: '#5476a1',
        fontSize: 15
    },
    textValueSty: {
        fontSize: 15,
        color: '#999'
    },
    lastItem: {
        width: width,
        height: 0.27 * height,
        backgroundColor: '#fff',
        paddingLeft:width*0.02,
        paddingTop: 16,
        paddingBottom: 28,
        justifyContent: 'space-between'
    },
    textInput: {
        width: width - 40,
        height: 0.15 * height,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15
    }
});
