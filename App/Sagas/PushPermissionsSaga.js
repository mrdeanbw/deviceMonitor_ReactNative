import { Alert } from 'react-native'
import { select, take, call } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import PushNotification from 'react-native-push-notification'
import { REHYDRATE } from 'redux-persist/constants'

export default () => {

  function * requestPermissions () {
    const { sessionToken } = yield select(state => state.user)
    if (sessionToken) {
      yield call([PushNotification, PushNotification.requestPermissions])
      PushNotification.checkPermissions((permissions) => {
        if (!permissions.alert) {
          Alert.alert(
            'Push notifications are disabled',
            'You will not receive alerts about your devices! To enable, please change the Roost settings in your phone settings menu'
          )
        }
      })
    }
  }

  function * watcher () {
    while (true) {
      yield take([REHYDRATE, Types.LOGIN_SUCCESS, Types.USER_CREATE_SUCCESS])
      yield call(requestPermissions)
    }
  }

  return {
    requestPermissions,
    watcher
  }
}
