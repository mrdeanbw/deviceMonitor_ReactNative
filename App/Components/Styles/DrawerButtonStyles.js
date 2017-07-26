import { Metrics, Colors, Fonts } from '../../Themes'

const iconStyle = {
  marginRight: Metrics.baseMargin,
  marginTop: 2, // fix icon mis-alignment
  alignSelf: 'center',
}

export default {
  row: {
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    justifyContent: 'space-between'
  },
  textRow: {
    flexDirection: 'row',
  },
  icon: {
    ...iconStyle
  },
  text: {
    ...Fonts.style.h5,
    color: Colors.black,
    marginVertical: Metrics.baseMargin
  },
  notificationContainer: {
    marginLeft: Metrics.smallMargin,
    backgroundColor: Colors.fire,
    height: Metrics.doubleBaseMargin,
    minWidth: Metrics.doubleBaseMargin,
    borderRadius: Metrics.baseMargin,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.smallMargin,
  },
  chevron: {
    ...iconStyle,
    tintColor: Colors.charcoal
  }
}
