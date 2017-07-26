import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

const graphRangeSelectorWidth = 180

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.lightGray,
    marginTop: Metrics.navBarHeight
  },
  deviceName: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
    maxWidth: Metrics.screenWidth - graphRangeSelectorWidth
  },
  section: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.medium,
  },
  loadingContainer: {
    height: 150
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  graphRangeRow: {
    alignSelf: 'flex-end',
  },
  rangeLabel: {
    width:65,
    fontSize: Fonts.size.small
  },
  graphContainer: {
    marginHorizontal: Metrics.baseMargin
  },
  graphLabel: {
    alignSelf: 'center',
    marginLeft: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.medium,
  },
  date: {
    color: Colors.charcoal,
    margin: Metrics.baseMargin
  },
  eventContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 1,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  eventText: {
    color: Colors.black
  },
  eventTime: {
    color: Colors.charcoal
  },
  noActivityContainer: {
    alignItems: 'center',
    margin: Metrics.doubleBaseMargin,
  },
  noActivityText: {
    color: Colors.charcoal,
    fontSize: Fonts.size.medium
  },
  switchRow: {
  flex:1,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    switchLabel: {
      width: 30,
      textAlign: 'center'
    },
  divide:{
    marginTop: Metrics.baseMargin,
    borderTopWidth: 1,
    borderColor: Colors.gray
  }
})
