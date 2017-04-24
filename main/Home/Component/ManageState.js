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
const manageCounts = [
    {name: '营业额', count: '1000万元'},
    {name: '已定额', count: '2000万元'},
    {name: '回款率', count: '65%'},
    {name: '预期营收', count: '2300万元'},
    {name: '投标额', count: '20亿'},
    {name: '中标额', count: '15亿'},

];
export default class ManageState extends Component {
    render() {
        return (
            <View style={styles.manageStateContainer}>
                <HomeHeader src={require('../../../resource/imgs/home/money.png')} title="公司经营状况"/>
                <View style={styles.manageCountContainer}>
                    {this.renderManageCounts()}
                </View>
                <View style={styles.bottomStyle}>
                    <Text style={styles.financeStyle}>
                        财务账 <Text style={styles.finianceCountStyle}>200亿</Text>
                    </Text>
                </View>
            </View>
        );
    }

    renderManageCounts() {
        let difCounts = [];
        for (let i = 0; i < manageCounts.length; i++) {
            difCounts.push(
                <ManageCount key={i} name={manageCounts[i].name} count={manageCounts[i].count}/>
            )
        }
        return difCounts;
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
