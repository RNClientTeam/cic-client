"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class EditSafetyCheck extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name: '项目名称', value:'2016平谷甘营路网架结构优化>'},
                {name: '工程子项', value:'线路工程'},
                {name: '任务性质', value:'施工任务>'},
                {name: '计划开始时间', value:'2017/1/3'},
                {name: '计划结束时间', value:'2017/1/6'},
                {name: '责任人', value:'吴晓磊>'},
                {name: '创建时间', value:'2017/1/1'}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="安全检查计划编辑" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    scrollEnabled={false}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
                <TouchableOpacity style={styles.btnView} onPress={this.saveBtn.bind(this)}>
                    <Text style={{color:'#fff',fontSize:15}}>保存</Text>
                </TouchableOpacity>
            </View>
        );
    }

    saveBtn() {

    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.keyText}>{rowData.name}</Text>
                <Text style={styles.valueText}>{rowData.value}</Text>
            </View>
        );
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
        height: 0.0779*height,
        paddingHorizontal: 15,
        backgroundColor:'#fff',
        justifyContent: 'space-between'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
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
    btnView: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 15,
        height: 0.06 * height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#216fd0'
    }
});
