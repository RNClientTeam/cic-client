/**
 * Created by Nealyang on 2017/5/16.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native'
import ModalCell from "./ModalCell";

const {width, height} = Dimensions.get('window');

export default class ModalView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modals: []
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.modalView} onPress={() => this.props.hiddenModal()}>
                {this.renderModalCell()}
            </TouchableOpacity>
        )
    }

    renderModalCell() {
        let tempCell = [];
        for (let i = 0; i < this.state.modals.length; i++) {
            tempCell.push(
                <ModalCell reload={() => this.props.reload()} currentItem={this.props.currentItem}
                           hiddenModal={() => this.props.hiddenModal()} navigator={this.props.navigator} key={i}
                           src={this.state.modals[i].src} name={this.state.modals[i].name}/>
            )
        }
        return tempCell;
    }

    componentDidMount() {
        let templateArr = [];
        if (this.props.authList.length > 0) {
            this.props.authList.map((item, index) => {
                if (item.key === 'tg' && item.value) {
                    templateArr.push({
                        src: require('../../../../../resource/imgs/home/applications/stopAction.png'),
                        name: '停工'
                    })
                }
                if (item.key === 'kg' && item.value) {
                    templateArr.push({
                        src: require('../../../../../resource/imgs/home/applications/effectiveAction.png'),
                        name: '复工'
                    },)
                }
                if(item.key === 'del' && item.value){
                    templateArr.push({src: require('../../../../../resource/imgs/home/applications/delete.png'), name: '删除'})
                }
                if (item.key === 'tbwcqk' && item.value) {
                    templateArr.push({
                        src: require('../../../../../resource/imgs/home/constuctPlan/editComplete.png'),
                        name: '填报进展'
                    })
                }
                if (item.key === 'qrwcqk' && item.value) {
                    templateArr.push({
                        src: require('../../../../../resource/imgs/home/earlierStage/ensureComplete.png'),
                        name: '确认完成'
                    })
                }


            });
            this.setState({
                modals:templateArr
            })
        }
    }

}

const styles = StyleSheet.create({
    modalView: {
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0,0.75)'
    }
});
