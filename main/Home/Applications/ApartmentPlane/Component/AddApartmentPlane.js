"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableHighlight,
    ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import ChoosePlaneStyle from './ChoosePlaneStyle.js';
import KeyTime from "../../../../Component/KeyTime";
const heightArr = [0.0735, 0.0735, 0.087, 0.079, 0.0705, 0.0705, 0.0705, 0.075];
import {getCurrentMonE,getCurrentMonS} from '../../../../Util/Util'
import Organization from "../../../../Organization/Organization";
import toast from 'react-native-simple-toast'

export default class AddApartmentPlane extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name: '所属计划任务', value:'请选择>'},
                {name: '所属项目', value:''},
                {name: '工作计划来源', value:''},
            ],
            jhrwId:'',
            xmbh:'',
            ly:'',
            jhmc:"",
            zrbm:'',
            zrbmmc:'',
            zrr:'',
            zrrmc:"",
            jhkssj:'',
            jhjssj:'',
            wcbz:''
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="部门计划任务新增" navigator={this.props.navigator}/>
                <ScrollView>
                    <TouchableHighlight underlayColor="transparent">
                        <View style={[styles.viewStyle, {height:0.0735*height,marginBottom:1}]}>
                            <Text style={styles.keyText}>工作计划名称</Text>
                            <TextInput placeholder='请填写'
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor='#999'
                                       onChangeText={(text)=>this.setState({jhmc:text})}
                                       textAlign="right"
                                       style={{width:width*0.5, fontSize:15}}
                                       autoCapitalize="none"
                                       autoCorrect={false}/>
                        </View>
                    </TouchableHighlight>
                    <ListView
                        dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                        renderRow={this.renderRow.bind(this)}
                        scrollEnabled={false}
                        renderSeparator={(sectionID, rowID) => {
                            return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                        }}/>
                    <KeyTime onlyDate={true} propKey="计划开始时间" showDate={this.state.jhkssj} changeDate={(date)=>this.setState({jhkssj:date})}/>
                    <KeyTime onlyDate={true} propKey="计划结束时间" showDate={this.state.jhjssj} changeDate={(date)=>this.setState({jhjssj:date})}/>
                    <TouchableHighlight underlayColor="transparent" onPress={this.choiceZrbm.bind(this)}>
                        <View style={[styles.viewStyle, {height:0.0735*height,marginBottom:1}]}>
                            <Text style={styles.keyText}>责任部门</Text>
                            <Text style={styles.valueText}>{this.state.zrbmmc===''?'请选择>':this.state.zrbmmc}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" onPress={this.choiceZrr.bind(this)}>
                        <View style={[styles.viewStyle, {height:0.0735*height,marginBottom:1}]}>
                            <Text style={styles.keyText}>责任人</Text>
                            <Text style={styles.valueText}>{this.state.zrrmc===''?'请选择>':this.state.zrrmc}</Text>
                        </View>
                    </TouchableHighlight>
                    <View>
                        <View style={styles.footSeparator}></View>
                        <View style={styles.footIntor}>
                            <Text style={styles.keyText}>工作成果／完成标准</Text>
                        </View>
                        <View style={styles.footInfo}>
                            <TextInput style={styles.textinputStyle}
                                       multiline={true}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       underlineColorAndroid="transparent"
                                       onChangeText={(text)=>this.setState({wcbz:text})}
                                       placeholder="请填写"/>
                        </View>
                        <TouchableHighlight onPress={this.createPlane.bind(this)} underlayColor="transparent">
                            <View style={styles.btnView}>
                                <Text style={styles.btnText}>创建</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }

    choiceZrbm(){
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                select: (data) => {
                    let cn = [];
                    let en = [];
                    for (let i = 0; i < data.length; i++) {
                        cn.push(data[i].name);
                        en.push(data[i].id);
                    }
                    this.setState({
                        zrbmmc: cn.join(','),
                        zrbm: en.join(',')
                    });

                },
                type: 'dep'
            }
        })
    }

    choiceZrr(){
        this.props.navigator.push({
            component: Organization,
            name: 'Organization',
            params: {
                select: (data) => {
                    let cn = [];
                    let en = [];
                    for (let i = 0; i < data.length; i++) {
                        cn.push(data[i].name);
                        en.push(data[i].id);
                    }
                    this.setState({
                        zrrmc: cn.join(','),
                        zrr: en.join(',')
                    });

                },
                type: 'emp',
                depId:this.state.zrbm.indexOf(',')>-1?'':this.state.zrbm
            }
        })
    }

    onPress(rowData, rowID) {
       if (rowData.name === '所属计划任务') {
            this.props.navigator.push({
                component: ChoosePlaneStyle,
                name: 'ChoosePlaneStyle',
                params: {
                    addPlane: this.addPlane.bind(this)
                }
            })
        }
    }

    addPlane(rwid,rwmc,xmid,xmmc,ly,lymc){
        this.state.dataSource[0].value = rwmc;
        this.state.dataSource[1].value = xmmc;
        this.state.dataSource[2].value = lymc;
        this.setState({
            jhrwId:rwid,
            xmbh:xmid,
            ly:ly
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor="transparent" onPress={this.onPress.bind(this, rowData, rowID)}>
                <View style={[styles.viewStyle, {height:heightArr[rowID]*height}]}>
                    <Text style={styles.keyText}>{rowData.name}</Text>
                    {
                        rowID === 0 ?
                        <TextInput placeholder={rowData.value}
                            underlineColorAndroid="transparent"
                            placeholderTextColor='#999'
                            textAlign="right"
                            style={{width:width*0.5, fontSize:15}}
                            autoCapitalize="none"
                            autoCorrect={false}/> :
                        <Text style={styles.valueText}>{rowData.value}</Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }

    createPlane() {
        if(this.state.jhmc === ''){
            toast.show('请填写计划名称')
        }else if(this.state.wcbz===''){
            toast.show('请填写完成标准')
        }else if(this.state.jhkssj===''){
            toast.show('请填写计划开始时间')
        }else if(this.state.jhjssj===''){
            toast.show('请填写计划结束时间')
        }else if(this.state.zrr===''){
            toast.show('请选择责任人')
        }else if(this.state.zrbm===''){
            toast.show('请选择责任部门')
        }else if(this.state.jhrwId===''){
            toast.show('所属计划任务未填写')
        }else{
            axios.post('/psmBmjh/save',{
                userID:GLOBAL_USERID,
                jhrwId:this.state.jhrwId,
                xmbh:this.state.xmbh,
                ly:this.state.ly,
                jhmc:this.state.jhmc,
                zrbm:this.state.zrbm,
                zrr:this.state.zrr,
                jhkssj:this.state.jhkssj,
                jhjssj:this.state.jhjssj,
                wcbz:this.state.wcbz,
                callID:true
            }).then(data=>{
                if(data.code === 1){
                    toast.show(data.message);
                    let that = this;
                    setTimeout(function () {
                        that.props.reload();
                        that.props.navigator.pop();
                    },500);
                }else{
                    toast.show(data.message)
                }
            }).catch(err=>{
                toast.show('服务端异常');
            })
        }
    }

    componentDidMount() {
        storage.load({
            key:'userMessage'
        }).then(data=>{
            this.setState({
                zrrmc: data.userName,
                zrr: data.userID,
                zrbmmc: data.deptName,
                zrbm: data.deptID
            })
        })
    }

    renderFooter() {
        return (
            <View>
                <View style={styles.footSeparator}></View>
                <View style={styles.footIntor}>
                    <Text style={styles.keyText}>工作成果／完成标准</Text>
                </View>
                <View style={styles.footInfo}>
                    <TextInput style={styles.textinputStyle}
                        multiline={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        placeholder="请填写"/>
                </View>
                <TouchableHighlight onPress={this.createPlane.bind(this)} underlayColor="transparent">
                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>创建</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        paddingLeft: width*0.02,
        paddingRight: 21,
        justifyContent: 'space-between',
        backgroundColor:'#fff'
    },
    footSeparator: {
        width: width,
        height: 0.0165*height,
        backgroundColor: '#f1f1f1'
    },
    footIntor: {
        width: width,
        height: 0.07 * height,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    footInfo: {
        width: width,
        height: 0.12 * height,
        paddingVertical: 0.019*height,
        paddingHorizontal: 17,
        backgroundColor: '#fff'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#999'
    },
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5
    },
    btnView: {
        marginTop: 5,
        marginHorizontal: 12,
        height: 0.067 * height,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#216fd0'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    }
})
