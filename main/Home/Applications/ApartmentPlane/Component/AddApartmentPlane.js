"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableHighlight
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import ChoosePlaneStyle from './ChoosePlaneStyle.js';
const heightArr = [0.0735, 0.0735, 0.087, 0.079, 0.0705, 0.0705, 0.0705, 0.075]

export default class AddApartmentPlane extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name: '工作计划名称', value:'请填写'},
                {name: '所属计划任务', value:'请选择>'},
                {name: '所属项目', value:''},
                {name: '工作计划来源', value:''},
                {name: '计划开始时间', value:'请选择>'},
                {name: '计划结束时间', value:'请选择>'},
                {name: '责任部门', value:'请选择>'},
                {name: '责任人', value:''}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="部门计划任务新增" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
            </View>
        );
    }

    onPress(rowData, rowID) {
        if (rowID == 0 || rowID == 2 || rowID == 3 || rowID ==7) {
            return;
        } else if (rowID == 1) {
            this.props.navigator.push({
                component: ChoosePlaneStyle,
                name: 'ChoosePlaneStyle',
                params: {
                    addPlane: this.addPlane.bind(this)
                }
            })
        }
    }

    addPlane(planeStyle, proStyle, proName) {
        this.state.dataSource[1].value = planeStyle;
        this.state.dataSource[2].value = proStyle;
        this.state.dataSource[3].value = proName;
        this.setState({dataSource: this.state.dataSource});
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor="transparent" onPress={this.onPress.bind(this, rowData, rowID)}>
                <View style={[styles.viewStyle, {height:heightArr[rowID]*height}]}>
                    <Text style={styles.keyText}>{rowData.name}</Text>
                    {
                        rowID == 0 ?
                        <TextInput placeholder={rowData.value}
                            underlineColorAndroid="transparent"
                            placeholderTextColor='#999'
                            style={{width:50, fontSize:15}}
                            autoCapitalize="none"
                            autoCorrect={false}/> :
                        <Text style={styles.valueText}>{rowData.value}</Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }

    createPlane() {

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
        paddingLeft: 15,
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
