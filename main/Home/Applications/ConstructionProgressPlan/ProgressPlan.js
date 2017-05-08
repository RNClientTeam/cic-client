/**
 * Created by zhubin on 17/5/8.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import ProgressPlanList from './Component/ProgressPlanList'

const {width, height} = Dimensions.get('window');

export default class ProgressPlan extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="施工进度计划编制">
                    <TouchableOpacity onPress={()=>{this.setState({isModalVisible:!this.state.isModalVisible})}}>
                        <Image style={styles.filtrate} source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <ProgressPlanList navigator={this.props.navigator}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    },
    filtrate:{
        width:width*0.045,
        height:width*0.045
    }
});