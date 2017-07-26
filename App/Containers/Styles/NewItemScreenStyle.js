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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    borderRadius: Metrics.smallMargin,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: 65,
    minWidth: 70,
    tintColor: Colors.blue,
  },
  fontImage: {
    color: Colors.blue,
    fontSize: 80
  },
  textContainer: {
    marginVertical: 10,
  },
  text: {
    color: Colors.blue,
    fontSize: Fonts.size.regular
  }
})
