"use strict";
import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class CheckRecord extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {name:'检验任务', value:'质量检测任务1'},
                {name:'项目工号', value:'CX_DS14154-10001'},
                {name:'项目名称', value:'十三陵基地配电增容'},
                {name:'工程子项名称', value:'工程子项1'},
                {name:'问题类别', value:'一般类别'},
                {name:'检验时间', value:'2017-02-16'},
                {name:'检验人', value:'张帆'},
                {name:'附件', value:''}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
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

    renderRow(rowData) {
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.keyText}>{rowData.name}</Text>
                <Text style={styles.valueText}>{rowData.value}</Text>
            </View>
        );
    }

    renderFooter() {
        return (
            <View style={{paddingTop:10}}>
                <View style={styles.viewStyle}>
                    <Text style={styles.keyText}>检查结果</Text>
                </View>
                <View style={[styles.viewStyle, {marginTop:1,marginBottom:50}]}>
                    <Text style={styles.valueText}>施工安装存在问题</Text>
                </View>
                <TouchableOpacity style={styles.bottomBtn} onPress={this.saveAndCommit.bind(this)}>
                    <Text style={{fontSize:15,color:'#fff'}}>保存并提交</Text>
                </TouchableOpacity>
            </View>
        );
    }

    saveAndCommit() {

    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 10
    },
    bottomBtn: {
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 5,
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
        paddingLeft: 15,
        backgroundColor:'#fff'
    }
});
