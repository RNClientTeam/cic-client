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
    ScrollView,
    Linking
} from 'react-native';

var {width, height} = Dimensions.get('window');
import StatusBar from '../../../../Component/StatusBar.js';
import PDF from 'react-native-pdf-view';
import Loading from '../../../../Component/Loading.js';
import RNFS from 'react-native-fs';
import {baseUrl} from '../../../../Util/service.json'
import toast from 'react-native-simple-toast'
const pdfDownloadURL = 'http://was.jzfyjt.com:9092/docs/test.pdf';

export default class PDFView extends Component {
    constructor(props) {
        super(props);
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath;
        this.state = {
            showPDF: false,
            loading: false,
            isPdfDownload: false,
            fileName:''
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
                            <WebView
                                source={{uri: pdfDownloadURL}}
                                automaticallyAdjustContentInsets={true}
                                scalesPageToFit={true}
                                style={styles.pdf}/> :
                            <PDF ref={(pdf) => {
                                this.pdfView = pdf;
                            }}
                                 path={this.pdfPath}
                                 style={styles.pdf}/>) :
                        <View style={styles.flex}>
                            <Image source={require('../../../../../resource/imgs/home/earlierStage/pdfImg.png')}
                                   style={styles.pdfImgSty}/>
                            <Text onPress={() => this.test()} style={styles.textSty}>{this.state.fileName}</Text>
                            <TouchableOpacity onPress={this.downAndPreview.bind(this)}>
                                <View style={styles.downloadView}>
                                    <Text style={styles.downloadText}>下载并预览</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                }
                {
                    this.state.loading &&
                    <Loading/>
                }
            </View>
        );
    }

    test() {
        Linking.canOpenURL('http://blog.csdn.net/pz789as/article/details/53021283')
            .then(support => {
                console.log(support);
                if (!support) {
                    alert('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL('http://blog.csdn.net/pz789as/article/details/53021283');
                }
            }).catch((err) => {
            console.log('An error occurred', err);
            alert('err')
        });
    }

    downAndPreview() {
        // this.setState({loading: true});
        let url = 'http://was.jzfyjt.com:9092/service/sysfile/getFile?id=FFA24F76BE724A9552EC4AF69C5BB518&isdown=1&callID=&sign=';
        Linking.canOpenURL(url)
            .then(support => {
                console.log(support);
                if (!support) {
                    alert('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL(url);
                }
            }).catch((err) => {
            console.log('An error occurred', err);
            alert('err')
        });
        // axios.get('/sysfile/getFile', {
        //     params: {
        //         id: 'A4737A9C9E9B05E71B38FBEE827BB0AC',
        //         isdown: '0',
        //         callID: true
        //     }
        // }).then(data => {
        //     console.log(data)
        // });
        // const options = {
        //     fromUrl: pdfDownloadURL,
        //     toFile: this.pdfPath
        // };
        // RNFS.downloadFile(options).promise.then(res => {
        //     this.setState({
        //         showPDF: true,
        //         loading: false
        //     });
        // }).catch(err => {
        //
        // });
    }

    componentDidMount(){
        axios.get('/sysfile/detailHandler',{
            params:{
                userID:GLOBAL_USERID,
                id:'FFA24F76BE724A9552EC4AF69C5BB518',
                callID:true
            }
        }).then(data=>{
            if(data.code === 1){
                this.setState({
                    fileName:data.fileName
                })
            }else{
                toast.show(data.message)
            }
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
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
        width: width,
        height: height - 64
    }
})
