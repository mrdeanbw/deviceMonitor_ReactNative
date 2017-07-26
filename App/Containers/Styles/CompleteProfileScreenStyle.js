import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray
  },
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    padding: 20,
    paddingTop: 20 + Metrics.navBarHeight
  },
  completeText: {
    fontSize: 20,
    width: 160,
    textAlign: 'center',
    color: Colors.snow
  },
  iconContainer: {
    marginBottom: 10,
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: Colors.snow
  },
  inputContainer: {
    backgroundColor: Colors.snow,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  input: {
    marginLeft: 10,
    flex: 1
  },
  buttonText: {
    color: Colors.blue,
    fontSize: 20
  },
  smallTextContainer: {
    alignItems: 'center',
    paddingTop: 10
  }
})
