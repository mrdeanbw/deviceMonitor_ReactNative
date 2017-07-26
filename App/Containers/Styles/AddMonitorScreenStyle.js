import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray,
    paddingBottom: Metrics.doubleBaseMargin
  },
  innerContainer: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  text: {
    margin: Metrics.doubleBaseMargin,
    textAlign: 'center'
  },
  inviteText: {
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.blue,
    fontSize: Fonts.size.h5
  },
  searchBar: {
    textAlign: 'center',
    height: Metrics.largeMargin,
    backgroundColor: Colors.snow,
    fontSize: Fonts.size.regular
  },
  contactContainer: {
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    borderRadius: Metrics.smallMargin
  },
  contactName: {
    fontWeight: 'bold',
    marginLeft: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.regular
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.icons.xl
  },
  phoneNumberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin
  },
  phoneNumber: {
    alignSelf: 'center',
    fontSize: Fonts.size.medium
  },
  inviteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.buttonRadius,
    backgroundColor: Colors.green,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  inviteButtonText: {
    fontSize: Fonts.size.medium,
    color: Colors.snow,
    marginLeft: Metrics.smallMargin
  },
  inviteButtonIcon: {
    fontSize: Fonts.size.h4,
    color: Colors.white,
  },
  thumbnail: {
    borderRadius: Metrics.icons.medium,
    width: Metrics.icons.xl,
    height: Metrics.icons.xl
  }
})
