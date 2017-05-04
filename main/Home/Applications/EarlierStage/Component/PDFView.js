"use strict";
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import PDF from 'react-native-pdf-view';
import Loading from '../../../../Component/Loading.js';
import RNFS from 'react-native-fs';
const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';

export default class PDFView extends Component {
    constructor(props) {
        super(props);
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
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
                <Image source={require('../../../../../resource/imgs/home/earlierStage/pdfImg.png')}
                    style={styles.pdfImgSty}/>
                <Text style={styles.textSty}>施工手册.pdf</Text>
                <Text style={styles.pdfSize}>186k</Text>
                <TouchableOpacity onPress={this.downAndPreview.bind(this)}>
                    <View style={styles.downloadView}>
                        <Text style={styles.downloadText}>下载并预览</Text>
                    </View>
                </TouchableOpacity>
                {
                    this.state.showPDF &&
                    <PDF ref={(pdf)=>{this.pdfView = pdf;}}
                        path={this.pdfPath}
                        onLoadComplete = {(pageCount)=>{
                            this.setState({loading: false});
                            this.timer = setTimeout(() => {
                                this.pdfView.setNativeProps({zoom: 2.1});
                            }, 3000);
                        }}
                        style={styles.pdf}/>
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
                loading: false,
                showPDF: true
            });
        }).catch(err => {
            console.log(err);
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
        position: 'absolute',
        top: 64,
        bottom: 0,
        left: 0,
        right: 0
    }
})
