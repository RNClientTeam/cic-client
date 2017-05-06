/**
 * Created by zhubin on 17/5/5.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

import ModificationRow from './ModificationRow'

const {width, height}  = Dimensions.get('window');

export default class Modification extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                applicant: '菜鸟',
                applyDate: '2017/02/16',
                newStartDate: '2017/02/16',
                newEndDate: '2017/03/16',
                startDate: '2017/02/16',
                endDate: '2017/03-/6',
                desc: '部门人员不足'
            },
            {
                applicant: '菜鸟',
                applyDate: '2017/02/16',
                newStartDate: '2017/02/16',
                newEndDate: '2017/03/16',
                startDate: '2017/02/16',
                endDate: '2017/03-/6',
                desc: '部门人员不足'
            },
            {
                applicant: '菜鸟',
                applyDate: '2017/02/16',
                newStartDate: '2017/02/16',
                newEndDate: '2017/03/16',
                startDate: '2017/02/16',
                endDate: '2017/03-/6',
                desc: '部门人员不足'
            }
        ];

    }
    render() {
        return(
            <View style={styles.viewSty}>
                <ScrollView>
                    <View style={styles.titleView}>
                        <View style={styles.titleContent}>
                            <Text style={styles.titleText}>变更情况</Text>
                        </View>
                        {this.renderRows()}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.submit()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>确认完成</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    submit() {

    }
    renderRows() {
        return this.dataSource.map((item, index) => (<ModificationRow key={index} data={item}/>))
    }
}

const styles = StyleSheet.create({
    viewSty: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    titleContent: {
        backgroundColor: '#f99e3d',
        justifyContent: 'center',
        height: 0.035 * height,
        width: 0.25 * width,
        paddingLeft: 0.06 * width,
        paddingRight: 0.02 * width,
        marginTop: 0.02 * width,
        marginBottom: 0.04 * width,
        borderTopRightRadius: 0.035/2 * height,
        borderBottomRightRadius: 0.035/2 * height
    },
    titleText: {
        color: "#fff"
    },
    button: {
        backgroundColor: '#216fd0',
        height: height*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width*0.05,
        marginLeft: width*0.05,
        marginRight: width*0.05,
        marginBottom: width*0.05,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});
