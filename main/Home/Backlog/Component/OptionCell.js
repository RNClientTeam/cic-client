/**
 * Created by Nealyang on 2017/4/30.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
const {width} = Dimensions.get('window');
import IconBadge from 'react-native-icon-badge'
export default class OptionCell extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.containerStyle}>
                {(this.props.badge && this.props.badge > 0)?
                    <IconBadge
                        MainElement={
                            <View style={styles.imgTextView}>
                                <Image style={styles.imgStyle}
                                       source={this.props.src}/>
                                <Text style={styles.text}>{this.props.name}</Text>
                            </View>
                        }
                        BadgeElement={
                            <Text style={[{color: '#FFFFFF'},this.props.badge.toString().length>2?{fontSize: width * 0.022}:{fontSize: width * 0.03}]}>{this.props.badge}</Text>
                        }

                        IconBadgeStyle={
                            {
                                width: width * 0.055,
                                height: width * 0.055,
                                backgroundColor: '#f34353',
                            }
                        }
                    />:
                    <View style={styles.imgTextView}>
                        <Image style={styles.imgStyle}
                               source={this.props.src}/>
                        <Text style={styles.text}>{this.props.name}</Text>
                    </View>
                }

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: width / 3,
        borderColor: '#dbdbdb',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        height: width * 0.23,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgTextView: {
        alignItems: 'center',
        justifyContent: 'center',
        width:width/3.6,
        height:width*0.2
    },
    imgStyle: {
        width: width * 0.09,
        height:width*0.09,
        marginBottom:width*0.01
    },
    text:{
        color:'#333',
        fontSize:width*0.028
    }
});