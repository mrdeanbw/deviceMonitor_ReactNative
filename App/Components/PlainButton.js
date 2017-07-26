import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/PlainButtonStyle'

export default class PlainButton extends React.Component {

  static propTypes = {
    text: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
    textStyle: React.PropTypes.any
  }

  getText () {
    return (this.props.text || this.props.children.toString())
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.buttonStyle}>
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
