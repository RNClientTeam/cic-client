"use strict";
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';

export default class SafetyInspectionDetail extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name: '安全检测任务1', value:''},
                {name: '项目编号', value:'CX_DS16051-1032'},
                {name: '项目名称', value:'十三陵基地配电增容'},
                {name: '工程子项名称', value:'工程子项1'},
                {name: '施工任务', value:'施工任务名称1'},
                {name: '当前状态', value:'新建任务'},
                {name: '计划开始时间', value:'2017/3/16'},
                {name: '计划结束时间', value:'2017/4/5'},
                {name: '责任人', value:'阿拉蕾'},
                {name: '创建时间', value:'2017/3/15'}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="项目安全检查计划详情" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this.renderRow.bind(this)}
                    scrollEnabled={false}
                    renderFooter={this.renderFooter.bind(this)}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.viewStyle}>
                <Text style={[styles.keyText,rowID==0&&{fontSize:16,color:'black',fontWeight:'400'}, {width: width * 0.4}]}>{rowData.name}</Text>
                <Text style={styles.valueText}>{rowData.value}</Text>
            </View>
        );
    }

    onPress() {

    }

    renderFooter() {
        return (
            <View>
                <View style={styles.footSeparator}></View>
                <TouchableOpacity style={styles.footerView} onPress={this.onPress.bind(this)}>
                    <Image source={require('../../../../../resource/imgs/home/applications/editBtn.png')}
                        style={{width:20, height:20, marginRight:5}}/>
                    <Text style={styles.keyText}>填报检查记录</Text>
                </TouchableOpacity>
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
        height: 0.0779*height,
        paddingLeft: 15,
        backgroundColor:'#fff'
    },
    footSeparator: {
        width: width,
        height: 0.03*height,
        backgroundColor: '#f1f1f1'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
    footerView: {
        width: width,
        flexDirection: 'row',
        height: 0.075 * height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    keyText: {
        fontSize: 15,
        color: '#5476a1'
    },
    valueText: {
        fontSize: 15,
        color: '#999'
    }
});
