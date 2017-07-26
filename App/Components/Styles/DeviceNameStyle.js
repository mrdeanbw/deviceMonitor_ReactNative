import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  imageContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 10
  },
  text: {
    marginTop: 10,
    color: Colors.blue,
    fontSize: 16
  }
})
