/**
 * Created by zhubin on 17/5/9.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native'
import MyPlan from './MyPlan'

const {width, height} = Dimensions.get('window');

export default class ConstructPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage:0,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.segmentView}>
                    <TouchableOpacity onPress={this.changePage.bind(this, 0)}>
                        <View style={[styles.leftView,{backgroundColor:this.state.currentPage===0?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.currentPage===0?'white':'#4fa6ef'}}>我的计划</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.changePage.bind(this, 1)}>
                        <View style={[styles.rightView,{backgroundColor:this.state.currentPage===1?'#4fa6ef':'white'}]}>
                            <Text style={{fontSize:12,color:this.state.currentPage===1?'white':'#4fa6ef'}}>全部计划</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    ref={"scrollView"}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}>
                    <MyPlan navigator={this.props.navigator}
                            rowData={this.props.rowData}/>
                    <MyPlan navigator={this.props.navigator}
                            rowData={this.props.rowData}/>
                </ScrollView>
            </View>
        )
    }

    changePage(page) {
        if (this.state.currentPage !== page) {
            this.setState({currentPage:page});
            this.refs.scrollView.scrollTo({x:page*width,y:0,animated:true});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    segmentView: {
        width: width,
        height: 0.0645 * height,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftView: {
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    },
    rightView: {
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        height: 0.036 * height,
        width: 88,
        alignItems:'center',
        justifyContent:'center'
    }
});
