/**
 * Created by Nealyang on 2017/5/8.
 */
'use strict';
import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    WebView
} from 'react-native'
import StatusBar from "./StatusBar";
import Loading from "./Loading";
const {width}  = Dimensions.get('window');

export default class UrlWebView extends Component{

    constructor(props){
        super(props);
        this.state={
            showLoading:true
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator}/>
                <WebView
                    source={{uri: this.props.url}}
                    onLoadEnd={this._onLoadEnd.bind(this)}
                />
                {this.state.showLoading?<Loading/>:null}
            </View>
        )
    }

    _onLoadEnd(){
        this.setState({
            showLoading:false
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});
