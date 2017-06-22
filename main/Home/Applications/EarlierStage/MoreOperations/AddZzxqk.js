/**
 * Created by zhubin on 17/5/12.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native'
import StatusBar from "../../../../Component/StatusBar";
import Toast from 'react-native-simple-toast'
const {width, height} = Dimensions.get('window');

export default class AddZzxqk extends Component {
    constructor(props){
        super(props);
        this.state={
            wcbl:0,
            wcxx:''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="总执行情况表单"/>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.labelColor}>项目总进度比例</Text>
                        <View style={styles.blank}/>
                        <View>
                            <TextInput style={styles.input}
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text) => this.setState({wcbl: text})}
                                       keyboardType="numeric"/>
                        </View>
                        <Text style={[styles.textColor, styles.leftMargin]}>%</Text>
                    </View>
                    <View style={styles.inputCell}>
                        <View style={styles.inputLabel}>
                            <Text style={styles.label}>项目总体进度描述*</Text>
                        </View>
                        <View>
                            <TextInput
                                multiline={true}
                                underlineColorAndroid="transparent"
                                textAlignVertical="top"
                                numberOfLines={4}
                                defaultValue={this.state.wcxx}
                                onChangeText={(text) => this.setState({wcxx: text})}
                                style={{backgroundColor: '#eee', height: 0.28 * height, borderRadius: 10}}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.blank}/>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    submit() {
        if(parseFloat(this.state.wcbl)>100){
            Toast.show('完成比例请填写0~100');
        }else if(parseFloat(this.state.wcbl)<0){
            Toast.show('完成比例请填写0~100');
        }else if(parseFloat(this.state.wcbl)!==parseInt(this.state.wcbl)){
            Toast.show('完成比例请填写整数');
        }else{
            axios.post('/psmQqjdjh/saveZxqk',{
                userID:GLOBAL_USERID,
                jhxxId:this.props.jhxxId,
                wcqk:this.state.wcxx,
                wcbl:this.state.wcbl,
                callID:true
            }).then(data=>{
                if(data.code === 1){
                    Toast.show('添加成功');
                    let that = this;
                    this.props.refreshData(1);
                    setTimeout(function () {
                        that.props.navigator.pop();
                    },1000)
                }else{
                    Toast.show(data.message)
                }
            }).catch((error) => {
                Toast.show('服务端错误');
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    content: {
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.12 * width,
        paddingLeft: 0.02 * width,
        paddingRight: 0.02 * width,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    input: {
        height: 0.08 * width,
        width: 0.15 * width,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#216fd0',
        padding:0
    },
    blank: {
        flex: 1
    },
    textArea: {
        padding: 0.02 * width,
        height: 0.25 * width
    },
    leftMargin: {
        marginLeft: 0.04 * width
    },
    button: {
        backgroundColor: '#216fd0',
        height: 0.12 * width,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        marginTop: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    textColor: {
        color: '#216fd0'
    },
    labelColor: {
        color: '#5476a1'
    },
    inputCell: {
        height: height * 0.35,
        paddingLeft: width * 0.02,
        paddingRight: width * 0.02,
        marginBottom:width*0.04
    },
    inputLabel: {
        height: height * 0.07,
        justifyContent: 'center',
    },
    label: {
        color: '#5476a1'
    },
});
