import React from 'react'
import { TextInput as ReactTextInput } from 'react-native'

export default class TextInput extends React.Component {

  blur () {
    this.refs.textInput.blur()
  }

  render () {
    return (
      <ReactTextInput
        autoCapitalize='none'
        autoCorrect={false}
        underlineColorAndroid="transparent"
        ref='textInput'
        {...this.props}
      >
        {this.props.children}
      </ReactTextInput>
    )
  }
}
