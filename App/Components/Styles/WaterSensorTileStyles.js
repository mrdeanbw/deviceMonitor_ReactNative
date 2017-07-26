import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

const sensorIconStyles = {
  position: 'absolute',
  width: 27,
  height: 35,
  top: 8.5,
  left: 10
}

export default StyleSheet.create({
  deviceTile: ApplicationStyles.deviceTile,
  alarming: {
    backgroundColor: Colors.alert
  },
  warning: {
    backgroundColor: Colors.warning
  },
  tall: {
    height: 120
  },
  sensorIcon: sensorIconStyles,
  row: {
    flexDirection: 'row',
    margin: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withIcon: {
    marginLeft: sensorIconStyles.left + sensorIconStyles.width + Metrics.smallMargin
  },
  text: {
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
  },
  sensorName: {
    width: 80,  // deviceTile.width - sensorIcon.width - margins
  },
  whiteText: {
    color: Colors.white,
  },
  centerText: {
    textAlign: 'center',
    width: 115,
  },
  recentText: {
    marginRight: Metrics.smallMargin
  },
  motionIcon: {
    marginRight: Metrics.smallMargin
  },
  waterIcon: {
    height: 45
  }
})

