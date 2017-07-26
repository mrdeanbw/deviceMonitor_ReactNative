import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  innerContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    marginHorizontal: Metrics.largeMargin,
    alignItems: 'center'
  },
  text: {
      fontSize: Fonts.size.medium,
      marginHorizontal: Metrics.baseMargin,
      textAlign: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.largeMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  disabledButton: {
    backgroundColor: Colors.gray
  },
  locationInfo: {
    flexDirection: 'row',
    margin: Metrics.baseMargin
  },
  image: {
    width: 60,
    height: 60
  },
  instructionImage: {
    flex: 1,
    height: null,
    width: Metrics.screenWidth
  },
  activityIndicator: {
    marginTop: Metrics.doubleBaseMargin
  },
  link: {
    color: Colors.blue,
    textDecorationLine: 'underline',
    fontSize: Fonts.size.medium,
  },
  title: {
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.baseMargin,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bcolumn: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: Metrics.screenWidth - 60
  },
  brow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
  },
  bullet: {
      width: 10
  },
  bulletText: {
      flex: 1
  }
})
