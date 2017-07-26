import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight,
  },
  header: {
    marginTop: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.h5,
    textAlign: 'center'
  },
  tempUnitsRow: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'flex-end',
  },
  settingsRow: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchLabel: {
    width: 40,
    fontSize: Fonts.size.small,
  },
  multiSliderContainer: {
    marginTop: Metrics.doubleBaseMargin
  },
  text: {
    fontSize: Fonts.size.regular
  },
  sliderText: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin,
    fontSize: Fonts.size.medium
  },
  buttonRow: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    marginHorizontal: Metrics.largeMargin,
    marginVertical: Metrics.doubleBaseMargin
  },
  markerStyle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  pressedMarkerStyle: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  selectedTrackStyle: {
    backgroundColor: Colors.blue
  },
})
