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
import toast from 'react-native-simple-toast'
import Loading from "../../../../Component/Loading";

export default class ChoosePro extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [],
            isLoading:false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择项目" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    scrollEnabled={true}
                    enableEmptySections={true}
                    renderSeparator={(sectionID, rowID) => {
                        return (<View key={`${sectionID}-${rowID}`} style={styles.separatorView}/>)
                    }}/>
                {this.state.isLoading?<Loading/>:null}
            </View>
        );
    }
    _renderRow(rowData) {
        return (
            <TouchableHighlight onPress={this._clickItem.bind(this, rowData)} underlayColor="#e8e8e8">
                <View style={styles.itemView}>
                    <Text style={styles.textNum}>{rowData.id}</Text>
                    <Text style={styles.textInfo}>{rowData.xmmc}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _clickItem(rowData) {
        console.log(rowData);
        this.props.navigator.push({
            component: ChoosePlane,
            name: 'ChoosePlane',
            params: {
                planeStyle: this.props.code,
                proStyle: rowData.xmid,
                addPlane: this.props.addPlane,
                xmid:rowData.xmid,
                xmmc:rowData.xmmc
            }
        })
    }

    componentDidMount() {
        this.setState({
            isLoading:true
        });
        axios.get('/psmBmjh/bmJhXmxzList',{
            params:{
                type:this.props.code,
                userID:GLOBAL_USERID,
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            console.log(data)
            if(data.code ===1){
                this.setState({
                    dataSource:data.data&&data.data.list?data.data.list:[]
                })
            }else{
                toast.show(data.message)
            }
        }).catch(err=>{
            this.setState({
                isLoading:false
            });
            toast.show('服务端异常');
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
