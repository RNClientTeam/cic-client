/**
 * Created by fan on 2017/05/16.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text,
    Modal
} from 'react-native'
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import SafetyInspectionListCell from "./SafetyInspectionListCell.js";
import Reload from "../../../../Component/Reload.js";
import toast from 'react-native-simple-toast'

const {width} = Dimensions.get('window');
export default class SafetyInspectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalVisible:false,
            auth: {
                addZljcjl: true,
            },
        }
    }

    render() {
        if (this.props.dataSource.length) {
            return (
                <View style={styles.container}>
                    <PullList
                        onPullRelease={this.onPullRelease.bind(this)}
                        topIndicatorRender={this.topIndicatorRender.bind(this)}
                        topIndicatorHeight={60}
                        dataSource={this.state.list.cloneWithRows(this.props.dataSource)}
                        renderRow={this.renderRow.bind(this)}
                        onEndReached={this.loadMore.bind(this)}
                        onEndReachedThreshold={60}
                        pageSize={10}
                        renderFooter={this.renderFooter.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            )
        }
        return <View/>
    }

    // _getAuthShowModal(item){
    //     axios.get('/psmAqjcjh/getOperationAuthority4Aqjcjh',{
    //         params:{
    //             userID:GLOBAL_USERID,
    //             aqjcjhId:item.id,
    //             callID:true
    //         }
    //     }).then(data=>{
    //         if(data.code === 1){
    //             data = {
    //                 "code": 1,
    //                 "data": {
    //                     "effectAqjcjh": true,
    //                     "deleteAqjcjh": true,
    //                     "addAqjcjh": true,
    //                     "updateAqjcjh": true,
    //                     "tbAqjcjl": true
    //                 },
    //                 "message": "成功"
    //             };
    //             this.setState({
    //                 modalVisible:true,
    //                 auth:data.data
    //             })
    //         }else{
    //             toast.show(data.message)
    //         }
    //         console.log(data)
    //     }).catch(err=>{
    //         toast.show('服务端异常');
    //     })
    //
    // }

    onPullRelease(resolve) {
        //do refresh
        this.props.reload(resolve);
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <SafetyInspectionListCell

                key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={() => this.props.setModalVisible(item.id)}/>
        );
    }

    renderFooter (){
        return null;
        // return ( (this.props.dataSource.length && (this.props.dataSource.length < this.props.total)) ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        // return <View/>;
        return (<Reload />);
    }

    loadMore(){
        // for (let i = 0;i<tempArr.length;i++){
        //     this.dataSource.push(tempArr[i])
        // }
        //
        // setTimeout(() => {
        //     this.setState({
        //         list: this.state.list.cloneWithRows(this.dataSource)
        //     });
        // }, 1000);
        this.props.loadMore();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        position: 'relative',
        zIndex: -1
    }
});
