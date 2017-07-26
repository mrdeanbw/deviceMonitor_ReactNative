import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './Styles/TouchableRowStyle'

export default class TouchableRow extends React.Component {

  // Prop type warnings
  static propTypes = {
    icon: React.PropTypes.string,
    iconStyle: React.PropTypes.any,
    onPress: React.PropTypes.func.isRequired,
    rightText: React.PropTypes.string,
    style: React.PropTypes.any,
    text: React.PropTypes.string,
    textStyle: React.PropTypes.any
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
          <View style={styles.rightContainer}>
            <View style={styles.item}>
              { this.props.rightText && <Text style={this.props.textStyle}>{this.props.rightText}</Text>}
            </View>
            <View style={[styles.item, styles.icon]}>
              { this.props.icon && <Icon
                name={this.props.icon}
                style={this.props.iconStyle}
                size={20}
                /> }
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
