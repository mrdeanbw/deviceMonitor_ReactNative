import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

const textColor = Colors.charcoal

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  descriptionContainer: {
    padding: 20
  },
  description: {
    color: textColor,
    textAlign: 'center'
  },
  continueText: {
    color: Colors.blue,
    fontSize: 20
  },
  linkText: {
    color: Colors.blue
  }
})

