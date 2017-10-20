/**
 * Created by Nealyang on 2017/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width} = Dimensions.get('window');
import BacklogHeaderCell from './BacklogHeaderCell'
export default class BacklogHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            headerCell:[
                {name:'待办事项',srcOn:require('../../../../resource/imgs/home/backlog/toDoOn.png'),srcOff:require('../../../../resource/imgs/home/backlog/toDoNo.png'),badge:this.props.badge},
                {name:'审批中',srcOn:require('../../../../resource/imgs/home/backlog/sendOn.png'),srcOff:require('../../../../resource/imgs/home/backlog/sendNo.png'),badge:0},
                {name:'已审批',srcOn:require('../../../../resource/imgs/home/backlog/approveOn.png'),srcOff:require('../../../../resource/imgs/home/backlog/approveNo.png'),badge:0}
            ]
        }
    }
    render() {
        return (
            <View style={styles.backlogHeader}>
                {this.renderHeaderCell()}
            </View>
        )
    }

    renderHeaderCell(){
        let cells = [];
        for(let i  = 0;i<this.state.headerCell.length;i++){
            cells.push(
                <BacklogHeaderCell
                    key={i}
                    name={this.state.headerCell[i].name}
                    badge={this.state.headerCell[i].badge}
                    src={this.props.currentIndex===i?this.state.headerCell[i].srcOn:this.state.headerCell[i].srcOff}
                    onSelect={this.props.currentIndex===i}
                    selectTag={this.props.selectTag.bind(this,i)}
                />
            )
        }
        return cells;
    }
}

const styles = StyleSheet.create({
    backlogHeader:{
        width:width,
        height:width*0.2,
        backgroundColor:'#216fd0',
        flexDirection:'row'
    }
});