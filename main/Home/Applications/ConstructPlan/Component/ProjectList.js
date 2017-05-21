/**
 * Created by Nealyang on 2017/5/20.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    ListView
} from 'react-native'
const {width} = Dimensions.get('window');
import {PullList} from 'react-native-pull';
import LoadMore from "../../../../Component/LoadMore";
import Reload from "../../../../Component/Reload";
import ProjectListCell from "./ProjectListCell";
export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            },
            {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            },
        ];
        this.state = {
            hasMoreData: true,
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    onPullRelease={this.onPullRelease.bind(this)}
                    topIndicatorRender={this.topIndicatorRender.bind(this)}
                    topIndicatorHeight={60}
                    dataSource={this.state.list}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter.bind(this)}
                />
            </View>
        )
    }

    onPullRelease(resolve) {
        //do refresh
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    renderRow(item, sectionID, rowID, highlightRow) {

        return (
            <ProjectListCell key={rowID} navigator={this.props.navigator} choiceThisCell={()=>this.choiceThisCell(item)} data={item} target="EarlierStageDetail"/>
        );
    }

    choiceThisCell(item){
        item.selected = !item.selected;
    }

    renderFooter() {
        return (this.state.hasMoreData ? <LoadMore /> : null)
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        return (<Reload/>);
    }

    loadMore() {
        let a = [
            {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            }, {
                number: 'CX_DS16052',
                planName: '人大技术学院配电增容改造技术咨询',
                selected: false
            },
        ];

        for (let i = 0; i < a.length; i++) {
            this.dataSource.push(a[i])
        }

        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
    }


    componentWillUnmount() {
        //selected为TRUE的传出去要
        console.log(this.dataSource)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
});
