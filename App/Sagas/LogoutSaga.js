import { AsyncStorage } from 'react-native'
import { take, put, call } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { getErrorFromResponse } from '../Lib/Errors'
import channelUnsubscribe from '../Lib/Generators/ChannelUnsubscribe'

export default (api) => {

  function * worker () {
    yield call(channelUnsubscribe, api)
    yield call(api.logout)
    yield call(AsyncStorage.removeItem, 'sessionToken')
    const keys = ["reduxPersist:addresses", "reduxPersist:config",
                  "reduxPersist:contacts", "reduxPersist:createAccount",
                  "reduxPersist:createMonitor", "reduxPersist:createPromotion",
                  "reduxPersist:deleteDevice", "reduxPersist:deviceActivity",
                  "reduxPersist:deviceClimate", "reduxPersist:devices", "reduxPersist:monitors",
                  "reduxPersist:resetPassword", "reduxPersist:saveAddress",
                  "reduxPersist:selectedCountry", "reduxPersist:updateDevice",
                  "reduxPersist:updatePassword", "reduxPersist:user", "reduxPersist:weather"]
    yield call(AsyncStorage.multiRemove, keys)
    yield call(api.removeToken)
  }

  function * watcher () {
    while (true) {
      yield take(Types.LOGOUT)
      yield call(worker)
    }
  }

  return {
    worker,
    watcher
  }
}

