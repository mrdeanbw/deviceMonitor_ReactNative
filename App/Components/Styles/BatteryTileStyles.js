import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  deviceTile: ApplicationStyles.deviceTile,
  alarming: {
    backgroundColor: Colors.alert
  },
  snoozed: {
    backgroundColor: Colors.warning
  },
  batteryIcon: {
    position: 'absolute',
    top: Metrics.baseMargin,
    left: Metrics.baseMargin,
    height: 35,
    width: 19
  },
  batteryStatus: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  }
})
