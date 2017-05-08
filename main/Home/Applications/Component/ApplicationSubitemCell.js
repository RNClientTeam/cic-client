/**
 * Created by Nealyang on 2017/5/6.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import ProjectSubitemSplitDetailInfo from "../ProjectSubitemSplit/Component/ProjectSubitemSplitDetailInfo";
import ProjectRangeHandoverDetailInfo from "../ProjectRangeHandover/Component/ProjectRangeHandoverDetailInfo";
const {width} = Dimensions.get('window');

export default class ProjectSubitemSplitDetailCell extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.ProjectSubitemSplitDetailCell} onPress={this.skipPage.bind(this)}>
                    <View style={styles.aboutProject}>
                        <View style={styles.numState}>
                            <Text style={{color: '#216fd0', fontSize: width * 0.045}}
                                  numberOfLines={1}>{this.props.data.planName}</Text>
                            <View style={[styles.stateView, {backgroundColor: this.props.stateBg}]}>
                                <Text style={styles.stateText}>{this.props.data.state}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutPrincipal}>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.principal}</Text>
                        <Text style={[{width: width * 0.2}, styles.textStyle]}>{this.props.data.department}</Text>
                        <Text style={[{width: width * 0.5}, styles.textStyle]}>{this.props.data.schedule}</Text>
                        <Text style={[{width: width * 0.7}, styles.textStyle]}>{this.props.data.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    skipPage() {
        switch (this.props.target) {
            case 'ProjectSubitemSplitDetailInfo':
                this.props.navigator.push({
                    component: ProjectSubitemSplitDetailInfo,
                    name: 'ProjectSubitemSplitDetailInfo',
                    params: {proName: this.props.proName, proNum: this.props.proNum}
                });
                break;
            case 'ProjectRangeHandoverDetailInfo':
                this.props.navigator.push({
                    component: ProjectRangeHandoverDetailInfo,
                    name: 'ProjectRangeHandoverDetailInfo'
                });
                break;

        }
    }
}

const styles = StyleSheet.create({
    ProjectSubitemSplitDetailCell: {
        marginBottom: width * 0.03,
        marginLeft: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.96,
        marginTop: width * 0.02
    },
    aboutProject: {
        backgroundColor: '#fff',
        height: width * 0.12,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01
    },
    aboutPrincipal: {
        backgroundColor: '#f6f9fa',
        height: width * 0.2,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    numState: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width * 0.1,
        alignItems: 'center',
    },
    textStyle: {
        height: width * 0.1,
        lineHeight: 30,
        color: '#4f74a3'
    },
    stateView: {
        backgroundColor: '#1f92e2',
        width: width * 0.17,
        height: width * 0.05,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stateText: {color: '#fff', fontSize: width * 0.03}
});