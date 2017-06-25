/**
 * Created by zhubin on 17/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class EmployeeItem extends Component {
    render() {
        let actionPart;
        if (this.props.type && this.props.type === 'emp') {
            actionPart = <CheckBox onClick={() => this.props.onClick(this.props.dep)}
                                   isChecked={this.props.isChecked}/>
        } else {
            actionPart = <Image style={styles.commentIcon} source={require('../../../resource/imgs/orgnization/comment.png')}/>;
        }

        return (
            <TouchableOpacity onPress={this.handleOnClick.bind(this)}>
                <View style={styles.empItem}>
                    <View>
                        <Text>{this.props.emp.name}</Text>
                    </View>
                    <View style={styles.blank}/>
                    <View>
                        {actionPart}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    handleOnClick() {
        if(this.props.getInfo){
            this.props.getInfo(this.props.emp.pbmid,this.props.emp.name);
            this.props.navigator.pop()
        }
    }
}

const styles = StyleSheet.create({
    empItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height*0.07,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 15,
        backgroundColor:'#fdfdfe',
        borderBottomColor:'#dcdcdc',
        borderBottomWidth: 1
    },
    blank: {
        flex: 1
    },
    commentIcon: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: 5,
    }
});