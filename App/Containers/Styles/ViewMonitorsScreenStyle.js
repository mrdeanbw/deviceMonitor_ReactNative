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
  heading: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  monitorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Metrics.smallMargin,
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
  monitorDetails: {
    justifyContent: 'center'
  },
  monitorText: {
    color: Colors.coal,
    fontSize: Fonts.size.regular,
  },
  deleteContainer: {
     flexDirection: 'row',
        justifyContent: 'space-between'
  },
  deleteIcon: {
    fontSize: Fonts.size.h4,
    color: Colors.red,
    margin: Metrics.smallMargin,
    textAlign: 'center',
    width: Metrics.largeMargin,
  },
  callIcon: {
      fontSize: Fonts.size.h4,
      color: Colors.green,
      margin: Metrics.smallMargin,
      textAlign: 'right',
      width: Metrics.largeMargin,
  }
})
