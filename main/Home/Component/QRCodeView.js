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
    Platform
} from 'react-native';

var {width, height} = Dimensions.get('window');
import StatusBar from '../../Component/StatusBar.js';
import PDF from 'react-native-pdf-view';
import Loading from '../../Component/Loading.js';
import RNFS from 'react-native-fs';

export default class PDFView extends Component {
    constructor(props) {
        super(props);
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
        this.state = {
            showPDF: false,
            loading: true,
            isPdfDownload: false
        }
    }

    componentDidMount() {
        if (Platform.OS !== 'ios') {
            this.downAndPreview();
        } else {
            this.setState({
                showPDF: true,
                loading: false
            });
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <StatusBar navigator={this.props.navigator} />
                {this.state.loading && <Loading />}
                {
                    this.state.showPDF &&
                    (Platform.OS === 'ios' ?
                    <WebView source={{uri:this.props.downloadURL}}
                        automaticallyAdjustContentInsets={true}
                        scalesPageToFit={true}
                        style={styles.pdf}/> :
                    <PDF ref={(pdf)=>{this.pdfView = pdf;}}
                        path={this.pdfPath}
                        style={styles.pdf}/>)
                }
            </View>
        );
    }

    downAndPreview() {
        const options = {
            fromUrl: this.props.downloadURL,
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
    pdf: {
        width: width,
        height: height - 64
    }
})
