import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyle'

export default class RoundedButton extends React.Component {

  static propTypes = {
    text: React.PropTypes.string,
    onPress: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
    textStyle: React.PropTypes.any,
    style: React.PropTypes.any,
    touchableProps: React.PropTypes.object
  }

  getText () {
    return (buttonText = this.props.text || this.props.children.toString())
  }

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.onPress} { ...this.props.touchableProps }>
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
