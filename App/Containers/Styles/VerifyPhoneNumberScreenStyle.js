import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  description: {
    backgroundColor: Colors.background,
    padding: 20
  },
  text: {
    fontSize: 16,
    color: Colors.snow,
    padding: 20,
    textAlign: 'center'
  },
  codeInput: {
    height: Metrics.largeMargin,
    backgroundColor: Colors.snow,
    textAlign: 'center'
  },
  continue: {
    color: Colors.blue,
    fontSize: 20
  }
})
