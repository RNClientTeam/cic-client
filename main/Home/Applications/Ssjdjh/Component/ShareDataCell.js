'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import PDFView from "./PDFView";
const {width} = Dimensions.get('window');

export default class ShareDataCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.shareDataCell} onPress={this.skipToPage.bind(this)}>
                <View style={styles.topView}>
                    <View style={styles.imgStyle}>
                        <Image style={styles.pdfStyle}
                               source={require('../../../../../resource/imgs/home/earlierStage/fj.png')}/>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.topTopView}>
                            <Text style={{width: width * 0.5}}>{this.props.dataSource.fjmc}</Text>
                            <Text style={{
                                color: '#666',
                                marginRight: width * 0.02,
                                fontSize: width * 0.032
                            }}>{this.props.dataSource.tbsj}</Text>
                        </View>
                        <Text style={{
                            color: '#666',
                            marginBottom: width * 0.02,
                            fontSize: width * 0.032
                        }}>{this.props.dataSource.tbr}</Text>
                    </View>
                </View>
                <View style={styles.specification}>
                    <Text style={styles.specificationText}>{this.props.dataSource.ms}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    skipToPage(){
        this.props.navigator.push({
            name:'PdfView',
            component:PDFView,
            params:{
                id:this.props.dataSource.fjid
            }
        })
    }
}

const styles = StyleSheet.create({
    shareDataCell: {
        width: width,
        backgroundColor: '#fff',
        marginTop: width * 0.017,
        marginBottom: width * 0.017,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    pdfStyle: {
        width: width * 0.1,
        height: width * 0.1
    },
    imgStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topView: {
        flexDirection: 'row',
        width: width,
        alignItems: 'center'
    },
    topTopView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:5,
        paddingBottom:5
    },
    infoView: {
        flex: 5,
    },

    specification: {
        marginLeft: width * 0.035,
        width: width * 0.93,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        minHeight: width * 0.1,
        paddingTop: width * 0.01,
        paddingBottom: width * 0.01
    },
    specificationText: {
        color: '#737373',
        lineHeight: 21,
        fontSize: width * 0.033
    }
});
