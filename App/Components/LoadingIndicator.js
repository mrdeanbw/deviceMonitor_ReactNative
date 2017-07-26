import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './Styles/LoadingIndicatorStyle'
import { Colors } from '../Themes'

export default class LoadingIndicator extends React.Component {

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    spinnerColor: React.PropTypes.string
  }

  static defaultProps = {
    backgroundColor: Colors.lightGray,
    spinnerColor: Colors.blue
  }

  render () {
    const { backgroundColor, spinnerColor } = this.props
    return (
      <View style={[styles.container, styles.loading, { backgroundColor }]}>
        <ActivityIndicator size='large' color={spinnerColor}/>
      </View>
    )
  }
}
