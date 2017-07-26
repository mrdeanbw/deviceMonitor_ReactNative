import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    margin: Metrics.baseMargin,
    alignItems: 'center',
  },
  text: {
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
    paddingTop: 30,
  },
  addDeviceContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.blue,
  },
  addDeviceIcon: {
    marginBottom: Metrics.doubleBaseMargin,
  },
  addDeviceText: {
    fontSize: Fonts.size.regular,
    color: Colors.blue
  },
  link: {
      fontSize: Fonts.size.regular,
      color: Colors.blue,
      textDecorationLine: 'underline',
      alignItems: 'center'
  },
    videoContainer: {
        alignItems: 'center',
        flex: 1,
        paddingBottom: 30,
    },
    promoContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop:150
    },
    normalText: {
        fontSize: Fonts.size.regular,
        alignItems: 'center',
        color: Colors.charcoal,
        textAlign: 'center',
    },

})
