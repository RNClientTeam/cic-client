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

import ExecuteRow from "./ExecuteRow"

const {width, height}  = Dimensions.get('window');

export default class ExecuteProfile extends Component {
    constructor(props) {
        super(props);
        this.dataSource = [
            {
                status: '完成',
                progress: 0.7,
                date: '2017-02-14',
                desc: '已完成相关工作的70%, 进展顺利'
            },
            {
                status: '完成',
                progress: 0.8,
                date: '2017-02-14',
                desc: '已完成相关工作的70%, 进展顺利'
            }
        ];
    }
    render() {
        return(
            <View style={styles.viewSty}>
                <ScrollView>
                <View style={styles.content}>
                        {this.renderRow()}
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
    renderRow() {
        let rows = this.dataSource.map((item, index) => (<ExecuteRow key={index} data={item}/>));
        return rows
    }
    submit() {

    }
}

const styles = StyleSheet.create({
    viewSty: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    content: {
        backgroundColor: "#fdfdfd",
        marginTop: width*0.02
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