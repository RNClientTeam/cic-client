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
import BacklogHeaderCell from './RemindHeaderCell'
const headerCell = [
    {name:'待处理工作',srcOn:require('../../../../resource/imgs/home/remind/todoOn.png'),srcOff:require('../../../../resource/imgs/home/remind/todoNot.png')},
    {name:'已完成的',srcOn:require('../../../../resource/imgs/home/remind/overOn.png'),srcOff:require('../../../../resource/imgs/home/remind/overNot.png')},
];
export default class RemindHeader extends Component {
    render() {
        return (
            <View style={styles.backlogHeader}>
                {this.renderHeaderCell()}
            </View>
        )
    }

    renderHeaderCell(){
        let cells = [];
        for(let i  = 0;i<headerCell.length;i++){
            cells.push(
                <BacklogHeaderCell
                    key={i}
                    name={headerCell[i].name}
                    badge={headerCell[i].badge}
                    src={this.props.currentIndex===i?headerCell[i].srcOn:headerCell[i].srcOff}
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