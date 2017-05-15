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
import ChoosePro from './ChoosePro.js';

export default class ChoosePlaneStyle extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                '前期计划任务',
                '前期配合任务',
                '实施计划任务',
                '实施配合任务',
                '施工任务'
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择任务类型" navigator={this.props.navigator}/>
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
                    <Text style={styles.textSty}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _clickItem(rowData) {
        this.props.navigator.push({
            component: ChoosePro,
            name: 'ChoosePro',
            params: {
                planeStyle: rowData,
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
        height: 0.0735 * height,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor:'#fff'
    },
    textSty: {
        fontSize: 15,
        color: '#3d3d3d'
    },
    separatorView: {
        width: width,
        height: 1,
        backgroundColor: '#f1f1f1'
    },
});
