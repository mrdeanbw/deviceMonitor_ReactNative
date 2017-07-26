import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  deviceContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.smallMargin,
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  topRow: {
    justifyContent: 'space-between'
  },
  deviceIcon: {
    width: Metrics.largeMargin,
  },
  deviceName: {
    margin: Metrics.smallMargin,
  },
  helpContainer: {
    width: 100,
    flex: 0.25,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingRight: Metrics.baseMargin,
  },
  text: {
  },
  link: {
    color: Colors.blue,
    textDecorationLine: 'underline'
  },
})
