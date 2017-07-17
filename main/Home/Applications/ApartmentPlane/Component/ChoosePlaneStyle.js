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
import Loading from "../../../../Component/Loading";
import toast from 'react-native-simple-toast'
export default class ChoosePlaneStyle extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            enName:[],
            cnName:[],
            isLoading:false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title="选择任务类型" navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.cnName)}
                    renderRow={this._renderRow.bind(this)}
                    scrollEnabled={false}
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
                    <Text style={styles.textSty}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    _clickItem(rowData) {
        let planStyle = '';
        for(let i = 0;i<this.state.cnName.length;i++){
            if(this.state.cnName[i] === rowData){
                planStyle = this.state.enName[i];
                break;
            }
        }
        this.props.navigator.push({
            component: ChoosePro,
            name: 'ChoosePro',
            params: {
                code: planStyle,
                addPlane: this.props.addPlane
            }
        })
    }

    componentDidMount() {
        this.getDataFromNet();
    }

    getDataFromNet(){
        this.setState({
            isLoading:true
        });
        axios.get('/dictionary/list',{
            params:{
                userID:GLOBAL_USERID,
                root:'JDJH_RWLX',
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            if(data.code ===1){
                for(let i = 0;i<data.data.length;i++){
                    this.state.enName.push(data.data[i].code);
                    this.state.cnName.push(data.data[i].name);
                }
                this.setState({
                    enName:this.state.enName,
                    cnName:this.state.cnName
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
