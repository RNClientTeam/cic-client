/**
 * Created by Nealyang on 2017/4/24.
 * 首页单个菜单项
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const {width} = Dimensions.get('window');
import IconBadge from 'react-native-icon-badge'
export default class MenuItem extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.containerStyle}>
                {(this.props.badge && this.props.badge > 0) ?
                    <IconBadge
                        MainElement={
                            <View style={styles.ImgContainerStyle}>
                                <Image style={styles.imageStyle} source={this.props.src}/>
                                <Text style={styles.imageNameStyle}>{this.props.name}</Text>
                            </View>
                        }
                        BadgeElement={
                            <Text style={[{color: '#FFFFFF'},this.props.badge.length>2?{fontSize: width * 0.025}:{fontSize: width * 0.03}]}>{this.props.badge}</Text>
                        }

                        IconBadgeStyle={
                            {
                                width: width * 0.055,
                                height: width * 0.055,
                                backgroundColor: '#f34353',
                            }
                        }
                    />:<View style={styles.ImgContainerStyle}>
                        <Image style={styles.imageStyle} source={this.props.src}/>
                        <Text style={styles.imageNameStyle}>{this.props.name}</Text>
                    </View>}

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    ImgContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5.2,
        paddingTop: 9
    },
    imageStyle: {
        width: width * 0.125,
        height: width * 0.125,
        marginBottom: 10
    },
    imageNameStyle: {
        color: '#666'
    }
});
