"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
export default class ReformTaskCell extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name:'问题类别', value:'一般类别>'},
                {name:'整改责任人', value:'董世坤>'},
                {name:'要求完成时间', value:'2017/3/3'},
                {name:'整改要求', value:''},
                {name:'整改情况', value:''},
                {name:'实际完成时间', value:'2017/3/6>'},
                {name:'附件', value:''}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="整改任务完成情况" navigator={this.props.navigator}/>
                <ListView
                    bounces={false}
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        if (rowID == 3 || rowID == 4) {
            return (
                <View style={[styles.inputView, rowID==4&&{marginBottom:10}]}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.keyText}>{rowData.name}</Text>
                    </View>
                    <TextInput
                        multiline={true}
                        style={styles.textInputSty}
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="请填写"/>
                </View>
            );
        } else {
            return (
                <TouchableOpacity style={styles.viewStyle}>
                    <Text style={styles.keyText}>{rowData.name}</Text>
                    {
                        rowData.name === '附件' ?
                        <Image source={require('../../../../../resource/imgs/home/attachment.png')} style={{width:18,height:18}}/> :
                        <Text style={styles.valueText}>{rowData.value}</Text>
                    }
                </TouchableOpacity>
            );
        }
    }

    renderFooter() {
        return (
            <TouchableOpacity style={styles.bottomBtn} onPress={this.saveAndCommit.bind(this)}>
                <Text style={{fontSize:15,color:'#fff'}}>保存</Text>
            </TouchableOpacity>
        );
    }

    saveAndCommit() {

    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    bottomBtn: {
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#216fd0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.0675 * height,
        width: width - 30
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1',
        width: width * 0.4
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent: 'space-between'
    },
    inputView: {
        width: width,
        height: height * 0.22,
        paddingTop: 10
    },
    textInputSty: {
        flex: 1,
        paddingHorizontal:15,
        fontSize: 15,
        paddingTop: 5,
        backgroundColor: '#fff',
        marginTop: 1
    }
});
