import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: Metrics.screenWidth,
    height: null
  },
  childrenContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.largeMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
})
