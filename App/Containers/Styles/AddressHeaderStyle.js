import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streetAddressContainer: {
    marginHorizontal: Metrics.baseMargin,
    marginVertical: 0,
    alignItems: 'center',
  },
  streetAddress: {
    color: Colors.charcoal,
    fontSize: Fonts.size.regular,
    // set max width to screen width minus size of edit icon and margins
    maxWidth: Metrics.screenWidth - Metrics.icons.small - (4 * Metrics.baseMargin),
  },
  editIcon: {
    position: 'absolute',
    top: 0,
  },
})
