/**
 * Created by fan on 2017/05/10.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ListView,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore.js";
import ApartmentPlaneListCell from "./ApartmentPlaneListCell.js";
import Reload from "../../../../Component/Reload.js";
export default class ApartmentPlaneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})),
        }
    }

    render() {
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
                    renderFooter={this.renderFooter.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        this.props.refresh(()=>{resolve()})
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <ApartmentPlaneListCell getOperatingItem={(item)=>this.props.getOperatingItem(item)} key={rowID} data={item} navigator={this.props.navigator}
                setModalVisible={(item) => this.props.setModalVisible(item)}/>
        );
    }

    renderFooter (){
        return (this.state.hasMoreData&& this.props.dataSource.length>0 ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload />);
    }

    loadMore(){
        if(this.props.dataSource.length>0){
            this.setState({
                hasMoreData:this.props.loadMore()
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
