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

export default class ChoosePlane extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [
                {proName: '图纸审核记录报批', proTime: '2016/09/17-2016/10/01'},
                {proName: '图纸审核记录报批', proTime: '2016/09/17-2016/10/01'},
                {proName: '图纸审核记录报批', proTime: '2016/09/17-2016/10/01'}
            ]
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择任务" navigator={this.props.navigator}/>
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
                    <Text style={styles.textNum}>{rowData.proName}</Text>
                    <Text style={styles.textInfo}>{rowData.proTime}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _clickItem(rowData) {
        for (var i = 0; i < this.props.navigator.getCurrentRoutes().length; i++) {
            if (this.props.navigator.getCurrentRoutes()[i].name === 'AddApartmentPlane') {
                let popRoute = this.props.navigator.getCurrentRoutes()[i];
                this.props.navigator.popToRoute(popRoute);
                this.props.addPlane(this.props.planeStyle, this.props.proStyle, rowData.proName);
                return;
            }
        }
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
