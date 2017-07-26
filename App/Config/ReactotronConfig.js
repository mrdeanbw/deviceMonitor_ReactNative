import Reactotron from 'reactotron-react-native'
import {Platform} from 'react-native'
import tronsauce from 'reactotron-apisauce'

Reactotron
  .configure()
  .use(tronsauce())
  .connect({
    enabled: __DEV__,
    name: 'Roost app',
    userAgent: Platform.OS
  })

if (__DEV__) {
  console.tron = Reactotron
} else {
  console.tron = () => false
}
