import React, { Component, PropTypes } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './Styles/DrawerButtonStyles'
import Images from '../Themes/Images'

class DrawerButton extends Component {
  static propTypes = {
    hideChevron: PropTypes.bool,
    icon: PropTypes.any,
    rowStyle: PropTypes.any,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    notificationCount: PropTypes.number,
  }

  static defaultProps = {
    hideChevron: false
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.row, this.props.rowStyle]}>
          <View style={styles.textRow}>
            { this.props.icon && <Image source={this.props.icon} style={styles.icon} /> }
            <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
            { this.props.notifications > 0 && <View style={styles.notificationContainer}>
                <Text style={styles.notificationCount}>
                  {this.props.notifications}
                </Text>
              </View> }
          </View>
          { !this.props.hideChevron && <Image source={Images.arrowForward} style={styles.chevron}/> }
        </View>
      </TouchableOpacity>
    )
  }
}


export default DrawerButton
