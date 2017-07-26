import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: Metrics.baseMargin
  },
  header: {
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.h5,
    textAlign: 'center'
  },
  dropdownButton: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    marginTop: Metrics.smallMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: 2
  },
  pickerLabel: {
    fontSize: Fonts.size.medium
  },
  powerSourceLabel: {
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.smallMargin
  },
  pickerSelection: {
    fontSize: Fonts.size.regular
  },
  buttonRow: {
    flexDirection: 'column',
    marginTop: Metrics.baseMargin
  },
  plainButtonText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.blue,
    marginBottom: 0
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.windowTint,
    marginTop: Metrics.navBarHeight
  },
  modalContainer: {
    backgroundColor: Colors.snow,
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin
  },
  innerModalContainer: {
    marginHorizontal: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  text: {
    marginVertical: Metrics.doubleBaseMargin,
    textAlign: 'center',
    fontSize: Fonts.size.regular
  },
  roundedButton: {
    marginHorizontal: Metrics.largeMargin,
    marginVertical: Metrics.baseMargin
  }
})
