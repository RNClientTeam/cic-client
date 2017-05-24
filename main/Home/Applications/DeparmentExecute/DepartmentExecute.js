/**
 * Created by zhubin on 17/5/24.
 */
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    Modal
} from 'react-native'
import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import DepartmentExecuteList from './Component/DepartmentExecuteList'
import FilterModalView from './Component/FilterModalView'
import MoreOperation from './Component/MoreOperation'

const {width} = Dimensions.get('window');

export default class DepartmentExecute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterShow: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="部门计划执行">
                    <TouchableOpacity onPress={()=>{this.setState({isFilterShow:!this.state.isFilterShow})}}>
                        <Image style={styles.filter}
                               source={require('../../../../resource/imgs/home/earlierStage/filtrate.png')}/>
                    </TouchableOpacity>
                </StatusBar>
                <SearchHeader/>
                <DepartmentExecuteList navigator={this.props.navigator} showMoreActions={() => this.showMoreActions()}/>
                {
                    this.state.isFilterShow &&
                    <FilterModalView closeModal={() => this.closeFilter()}/>
                }
                {
                    this.state.isMoreActionsShown &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.isMoreActionsShown}
                        onRequestClose={() => this.closeMoreActions()}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <MoreOperation navigator={this.props.navigator}
                                       closeModal={() => this.closeMoreActions()}/>
                    </Modal>
                }
            </View>
        )
    }

    closeFilter() {
        this.setState({
            isFilterShow: false
        })
    }

    showMoreActions() {
        this.setState({
            isMoreActionsShown: true
        })
    }

    closeMoreActions() {
        this.setState({
            isMoreActionsShown: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    filter: {
        width:width*0.045,
        height:width*0.045
    }
});