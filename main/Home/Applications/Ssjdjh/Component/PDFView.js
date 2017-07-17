"use strict";
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    WebView,
    Platform,
    ScrollView
} from 'react-native';

var {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import PDF from 'react-native-pdf-view';
import Loading from '../../../../Component/Loading.js';
import RNFS from 'react-native-fs';
const pdfDownloadURL = 'http://was.jzfyjt.com:9092/docs/test.pdf';

export default class PDFView extends Component {
    constructor(props) {
        super(props);
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath;
        this.state = {
            showPDF: false,
            loading: false,
            isPdfDownload: false
        }
    }
    render() {
        return (
            <View style={styles.flex}>
                <StatusBar title='资料下载' navigator={this.props.navigator}>
                </StatusBar>

                {
                    this.state.showPDF ?
                    (Platform.OS === 'ios' ?
                    <WebView source={{uri:pdfDownloadURL}}
                        automaticallyAdjustContentInsets={true}
                        scalesPageToFit={true}
                        style={styles.pdf}/> :
                    <PDF ref={(pdf)=>{this.pdfView = pdf;}}
                        path={this.pdfPath}
                        style={styles.pdf}/>) :
                    <View style={styles.flex}>
                        <Image source={require('../../../../../resource/imgs/home/earlierStage/pdfImg.png')}
                            style={styles.pdfImgSty}/>
                        <Text style={styles.textSty}>施工手册.pdf</Text>
                        <Text style={styles.pdfSize}>186k</Text>
                        <TouchableOpacity onPress={this.downAndPreview.bind(this)}>
                            <View style={styles.downloadView}>
                                <Text style={styles.downloadText}>下载并预览</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                {
                    this.state.loading &&
                    <Loading />
                }
            </View>
        );
    }

    downAndPreview() {
        this.setState({loading:true});
        const options = {
            fromUrl: pdfDownloadURL,
            toFile: this.pdfPath
        };
        RNFS.downloadFile(options).promise.then(res => {
            this.setState({
                showPDF: true,
                loading: false
            });
        }).catch(err => {

        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    flex: {
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    pdfImgSty: {
        marginTop: 0.139 * height,
        marginBottom: 0.039 * height,
        width: 0.131 * width,
        height: 0.097 * height
    },
    textSty: {
        fontSize: 17
    },
    pdfSize: {
        fontSize: 12,
        color: '#a2a2a2',
        marginTop: 17,
        marginBottom: 30
    },
    downloadView: {
        width: 0.4587 * width,
        height: 0.0525 * height,
        borderRadius: 4,
        backgroundColor: '#216fd0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    downloadText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 16
    },
    pdf: {
        width:width,
        height:height-64
    }
})
