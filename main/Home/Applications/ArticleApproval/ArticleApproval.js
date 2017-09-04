/**
 * Created by zhubin on 17/5/15.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import StatusBar from '../../../Component/StatusBar'
import SearchHeader from '../Component/SearchHeader'
import ArticleList from './Component/ArticleList'
import toast from 'react-native-simple-toast'
import Loading from "../../../Component/Loading";

const {width} = Dimensions.get('window');

export default class ArticleApproval extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            gwmc:'',
            pageNum:1,
            isLoading:false,
            dataSource:[]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar navigator={this.props.navigator} title="公文审批"/>
                <SearchHeader getData={this._getData.bind(this)} changeZxmc={(text)=>this.setState({gwmc:text})} />
                <ArticleList
                    reload={(resolve)=>{this._getData(1,resolve)}}
                    dataSource={this.state.dataSource}
                    loadMore={()=>{
                        this._getData(this.state.pageNum+1)
                    }}
                    navigator={this.props.navigator}/>
                {this.state.isLoading?<Loading/>:null}
            </View>
        )
    }

    componentDidMount() {
        this._getData();
    }

    _getData(pageNum = 1,resolve=()=>{}){
        this.setState({
            pageNum:pageNum,
            isLoading:true
        });
        axios.get('/gwgllc/list',{
            params:{
                userID:GLOBAL_USERID,
                gwmc:this.state.gwmc,
                pageNum:pageNum,
                pageSize:10,
                callID:true
            }
        }).then(data=>{
            this.setState({
                isLoading:false
            });
            resolve();
            console.log(data);
            if(data.code === 1){
                if(pageNum === 1){
                    this.setState({
                        dataSource:data.data.list||[]
                    })
                }else{
                    this.setState({
                        dataSource:[...this.state.dataSource,...data.data.list]
                    })
                }
            }else{
                toast.show(data.message);
                return false;
            }
        }).catch(err=>{
            resolve();
            this.setState({
                isLoading:false
            });
            toast.show('服务端异常');
            return false;
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f2f2f2',
        flex:1
    }
});


