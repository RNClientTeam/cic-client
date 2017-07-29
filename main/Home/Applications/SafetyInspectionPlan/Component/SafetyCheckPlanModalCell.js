/**
 * Created by Nealyang on 2017/5/3.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Toast from 'react-native-simple-toast';
import EditSafetyCheck from './EditSafetyCheck';

const {width} = Dimensions.get('window');
export default class SafetyCheckPlanModalCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.moreOperationsCell} onPress={this.skipPage.bind(this)}>
                <Image style={styles.imgStyle}
                       source={this.props.dataSource.img}/>
                <Text style={{color:'#6b6b6b',fontSize:width*0.037}}>{this.props.dataSource.name}</Text>
            </TouchableOpacity>
        )
    }

    skipPage(){
        if (this.props.dataSource.name === '新增') {
            this.props.navigator.push({
                name: 'EditSafetyCheck',
                component: EditSafetyCheck,
                params: {
                    reloadInfo: this.props.reloadInfo
                }
            })
        } else if (this.props.dataSource.name === '编辑') {
            this.props.navigator.push({
                name: 'EditSafetyCheck',
                component: EditSafetyCheck,
                params: {
                    id: this.props.id,
                    reloadInfo: this.props.reloadInfo,
                }
            })
        } else if (this.props.dataSource.name === '生效') {
            this.effect();
        } else if (this.props.dataSource.name === '删除') {
            this.delete();
        }
        this.props.closeModal()
    }

    delete() {
        axios.post('/psmAqjcjh/deleteAqjcjh', {
            userID: GLOBAL_USERID,
            id: this.props.id,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                Toast.show('删除成功');
                this.props.reloadInfo();
            } else {
                Toast.show(res.message);
            }
        }).catch(() => {
            Toast.show('服务端异常');
        });
    }

    effect() {
        axios.post('/psmAqjcjh/effectAqjcjh', {
            userID: GLOBAL_USERID,
            id: this.props.id,
            callID: true
        }).then((res) => {
            if (res.code === 1) {
                Toast.show('生效成功');
                this.props.reloadInfo();
            } else {
                Toast.show(res.message);
            }
        }).catch(() => {
            Toast.show('服务端异常');
        });
    }
}

const styles = StyleSheet.create({
    moreOperationsCell: {
        width: width,
        backgroundColor: '#fff',
        flexDirection:'row',
        height:width*0.14,
        alignItems:'center',
        borderColor:'#ddd',
        borderBottomWidth:1
    },
    imgStyle: {
        width:width*0.1,
        height:width*0.1,
        marginLeft:width*0.04,
        marginRight:width*0.04
    }
});
