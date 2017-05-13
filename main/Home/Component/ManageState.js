/**
 * Created by Nealyang on 2017/4/24.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
const {width} = Dimensions.get('window');
import HomeHeader from './HomeHeader'
import ManageCount from './ManageCount'
export default class ManageState extends Component {
    constructor(props){
        super(props);
        this.state={
            lastValue:{},
        }
    }
    render() {
        return (
            <View style={styles.manageStateContainer}>
                <HomeHeader src={require('../../../resource/imgs/home/money.png')} title="公司经营状况"/>
                <View style={styles.manageCountContainer}>
                    {this.renderManageCounts()}
                </View>
                <View style={styles.bottomStyle}>
                    <Text style={styles.financeStyle}>
                        {this.state.lastValue.text?this.state.lastValue.text:''}
                        <Text style={styles.finianceCountStyle}>{this.state.lastValue.value?this.state.lastValue.value:''}</Text>
                    </Text>
                </View>
            </View>
        );
    }

    renderManageCounts() {
        let difCounts = [];
        for (let i = 0; i < this.props.bsData.length-1; i++) {
            difCounts.push(
                <ManageCount key={i} name={this.props.bsData[i].text} count={this.props.bsData[i].value}/>
            )
        }
        return difCounts;
    }


    componentWillReceiveProps(props) {
        this.setState({
            lastValue:props.bsData[props.bsData.length-1]?props.bsData[props.bsData.length-1]:null
        })
    }
}

const styles = StyleSheet.create({
    manageStateContainer: {
        backgroundColor: '#fdfdfe',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        borderTopColor: '#dcdcdc',
        borderTopWidth: 1,
        marginTop: 10,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04
    },
    manageCountContainer: {
        backgroundColor: '#f8f6f3',
        width: width * 0.92,
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bottomStyle:{
        height:width*0.13,
        alignItems:'center',
        justifyContent:'center'
    },
    financeStyle: {
        color:'#333333',
    },
    finianceCountStyle:{
        color:'#fda322',
        fontSize:17,
        fontWeight:'bold'
    }
});
