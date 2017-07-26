import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

const imageContainer = {
  flex: 1,
  backgroundColor: Colors.snow,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: Metrics.baseMargin,
  paddingBottom: Metrics.baseMargin
}

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  row: {
    flexDirection: 'row',
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  imageContainer,
  emptyContainer: {
    ...imageContainer,
    backgroundColor: Colors.lightGray
  },
  image: {
    height: 90
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: Metrics.doubleBaseMargin,
  },
  text: {
    marginTop: Metrics.baseMargin,
    color: Colors.blue,
    fontSize: 16
  }
})
