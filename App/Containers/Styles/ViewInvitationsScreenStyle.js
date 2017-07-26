import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.lightGray
  },
  heading: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.baseMargin,
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
  },
  noInvitationsContainer: {
    margin: Metrics.baseMargin,
    alignItems: 'center'
  },
  noInvitationsText: {
    fontSize: Fonts.size.regular,
    marginVertical: Metrics.doubleBaseMargin,
    color: Colors.charcoal,
  },
  invitationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    padding: Metrics.smallMargin,
    backgroundColor: Colors.snow,
    borderRadius: Metrics.smallMargin,
  },
  invitationText: {
    fontSize: Fonts.size.regular,
    margin: Metrics.smallMargin,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
  },
  buttonIcon: {
    top: 1,
    fontSize: Fonts.size.h3,
    margin: Metrics.smallMargin,
    color: Colors.white,
  },
  acceptButton: {
    backgroundColor: Colors.green
  },
  rejectButton: {
    backgroundColor: Colors.fire
  },
  buttonText: {
    margin: Metrics.smallMargin,
    fontSize: Fonts.size.regular,
    color: Colors.white,
  },
  divide:{
    borderTopWidth: 1,
    borderColor: Colors.gray
  }
})
