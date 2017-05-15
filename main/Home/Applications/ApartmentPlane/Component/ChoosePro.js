"use strict";
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ListView,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import ChoosePlane from './ChoosePlane.js';

export default class ChoosePro extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {proNum: 'JZ_DS14029', proInfo: '计量院昌平基地重力加速度箱变'},
                {proNum: 'JZ_DS14029', proInfo: '计量院昌平基地重力加速度箱变'},
                {proNum: 'JZ_DS14029', proInfo: '计量院昌平基地重力加速度箱变'}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择项目" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    scrollEnabled={false}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
            </View>
        );
    }
    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={this._clickItem.bind(this, rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={styles.textNum}>{rowData.proNum}</Text>
                    <Text style={styles.textInfo}>{rowData.proInfo}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _clickItem(rowData) {
        this.props.navigator.push({
            component: ChoosePlane,
            name: 'ChoosePlane',
            params: {
                planeStyle: this.props.planeStyle,
                proStyle: rowData.proNum,
                addPlane: this.props.addPlane
            }
        })
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    itemView: {
        width: width,
        height: 0.132 * height,
        justifyContent: 'space-between',
        paddingLeft: 20,
        backgroundColor:'#fff',
        paddingVertical: 0.0315 * height
    },
    textNum: {
        fontSize: 15,
        color: '#216fd0'
    },
    textInfo: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
});
