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
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class NewCreateRecord extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name: '检查任务', value:'安全检查任务1>'},
                {name: '项目工号', value:'CX-DS14103-4600>'},
                {name: '项目名称', value:'十三陵基地配电增容'},
                {name: '工程子项名称', value:'工程子项名称1'},
                {name: '问题类型', value:'正常>'},
                {name: '检查时间', value:'2017/1/4>'},
                {name: '监察人', value:'吴晓磊>'},
                {name: '附件', value:require('../../../../../resource/imgs/home/attachment.png')}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="项目安全检查记录" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    scrollEnabled={false}
                    renderFooter={this.renderFooter.bind(this)}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
                <View style={styles.bottomView}>
                    <TouchableHighlight underlayColor="transparent" onPress={this.saveAndCommit.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor:'#41cc85'}]}>
                            <Text style={styles.btnText}>保存并提交</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" onPress={this.save.bind(this)}>
                        <View style={[styles.btnView, {backgroundColor:'#216fd0'}]}>
                            <Text style={styles.btnText}>保存</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    saveAndCommit() {

    }

    save() {

    }

    onPress(rowData, rowID) {
        alert(rowID);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor="transparent" onPress={this.onPress.bind(this, rowData, rowID)}>
                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>{rowData.name}</Text>
                    {
                        rowData.name === '附件' ?
                        <Image source={rowData.value} style={{width:20,height:20}}/> :
                        <Text style={styles.valueText}>{rowData.value}</Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }

    renderFooter() {
        return (
            <View>
                <View style={styles.footSeparator}></View>
                <View style={styles.footIntor}>
                    <Text style={styles.keyText}>检查结果</Text>
                </View>
                <View style={styles.footInfo}>
                    <TextInput style={styles.textinputStyle}
                        multiline={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        placeholder=""/>
                </View>
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
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor:'#fff',
        height: 0.0734*height
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
        height: 0.117 * height,
        paddingVertical: 8,
        paddingHorizontal: 17,
        backgroundColor: '#fff'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#3d3d3d',
        alignItems: 'flex-end'
    },
    textinputStyle: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 5,
        fontSize:15
    },
    btnView: {
        height: 0.045 * height,
        width: 0.36 * width,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 15,
        color: '#fff'
    },
    bottomView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})
