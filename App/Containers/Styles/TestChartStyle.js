import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.white,
  },
  chart: {
    paddingHorizontal: 10,
    width: Metrics.screenWidth,
    height: 200,
  },
})
