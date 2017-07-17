/**
 * Created by zhubin on 17/5/6.
 */

import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import StatusBar from "../../../../../Component/StatusBar"
import PathRow from "./PathRow"
import toast from 'react-native-simple-toast'
const {width, height}  = Dimensions.get('window');

export default class FinishedPath extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource :[]
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <StatusBar navigator={this.props.navigator} title="已完成流程步骤"/>
                <ScrollView>
                    {
                        this.props.fromCheckFlowInfo &&
                        <View style={[styles.titleContent, {width:(item.text.length*15+0.1*width)}]}>
                            <Text style={styles.titleText} numberOfLines={1}>{this.props.from&&this.props.from==='turnover'?'人员变更':'延期申请'}</Text>
                        </View>
                    }
                    {this.props.fromCheckFlowInfo ? this.renderRows(this.state.dataSource): this.renderSection(this.state.dataSource)}
                </ScrollView>
            </View>
        )
    }

    renderRows(arr) {
        return arr.map((item, index) => (<PathRow key={`${item.id}${index}`} data={item}/>))
    }

    renderSection(dataArr){
        return dataArr.map((item,index)=>
            (
                <View key={index}>
                        <View style={[styles.titleContent, {width:(item.text.length*15+0.1*width)}]}>
                            <Text style={styles.titleText} numberOfLines={1}>{item.text}</Text>
                        </View>
                    {this.renderRows(item.data)}
                </View>
            )
        )
    }

    componentDidMount() {
        let params;
        let reqURL;
        if (this.props.fromCheckFlowInfo) {
            params = {
                userID: GLOBAL_USERID,
                resID: this.props.resID,
                wfName: this.props.wfName,
                callID: true
            };
            reqURL = '/workFlow/actionList';
        } else {
            params = {
                userID:GLOBAL_USERID,
                resID:this.props.rwid,
                groupWfName:'ssjdjh-zx-phrw',
                callID:true
            };
            reqURL = '/workFlow/multiActionList';
        }
        if(this.props.tag==='进度计划'){
            params.groupWfName = 'ssjdjh-zx-zrw'
        }
        axios.get(reqURL,{
            params:params
        }).then(data=>{
            if(data.message === '成功'){
                this.setState({
                    dataSource:data.data
                });
            }else{
                toast.show(data.message);
            }
        })
    }
}

const styles = StyleSheet.create(
    {
        containerStyle:{
            backgroundColor:'#f2f2f2',
            flex:1
        },
        titleContent: {
            backgroundColor: '#f99e3d',
            justifyContent: 'center',
            height: 0.035 * height,
            paddingLeft: 0.06 * width,
            paddingRight: 0.02 * width,
            marginTop: 0.02 * width,
            marginBottom: 0.04 * width,
            borderTopRightRadius: 0.035/2 * height,
            borderBottomRightRadius: 0.035/2 * height
        },
        titleText: {
            color: 'white',
            fontSize: 14
        }
    }
);
