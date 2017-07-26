import { AsyncStorage } from 'react-native'
import {call, put, select, take} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import channelUnsubscribe from '../Lib/Generators/ChannelUnsubscribe'
import { Actions as NavigationActions } from 'react-native-router-flux'
import R from 'ramda'

export default (api) => {

  function * worker () {
    const makeError = (response) => {
      const error = getErrorFromResponse(response)
      return Actions.fetchAddressesFailure(error)
    }
    const { userId } = yield select(state => state.user)
    const userResponse = yield call(api.getUsername,userId)
    if(userResponse.ok){
        const { username } = userResponse.data
        if (username.startsWith('t')){
            yield put(Actions.logout())
            NavigationActions.homeScreen({ type: 'replace', isLoggedIn: false })
        } else {
            const monitorResponse = yield call(api.getOwnMonitors, userId)
            if (!monitorResponse.ok) {
              return yield put(makeError(monitorResponse))
            }

            const monitoredAddresses = R.pluck('address', monitorResponse.data.results)
            const response = yield call(api.getAddresses, userId, monitoredAddresses)

            if (!response.ok) {
              return yield put(makeError(response))
            }

            const addressIds = R.pluck('objectId', response.data.results)
            yield put(Actions.fetchConfig())
            yield put(Actions.fetchDevices(addressIds))

            yield put(Actions.fetchMonitors())

            yield put(Actions.fetchAddressesSuccess(userId, response.data.results))
        }
    } else if(userResponse.problem){
        console.log(userResponse.problem)
       yield put(Actions.fetchAddressesFailure(userResponse.problem))
    }


  }

  function * watcher () {
    while (true) {
      yield take(Types.FETCH_ADDRESSES)
      yield call(worker)
    }
  }

  return {
    watcher,
    worker
  }
}

