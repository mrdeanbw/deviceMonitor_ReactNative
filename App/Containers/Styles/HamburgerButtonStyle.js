import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  buttonContainer: {
    top: -Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
  },
  hamburger: {
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
    marginRight: Metrics.doubleBaseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.small
  },
  invitationMarker: {
    position: 'absolute',
    left: Metrics.icons.small + Metrics.baseMargin,
    top: Metrics.smallMargin,
    borderRadius: 6,
    height: 12,
    width: 12,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invitationNumber: {
    top: -0.5,
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: Colors.transparent,
    color: Colors.white,
    textAlign: 'center'
  }
})
