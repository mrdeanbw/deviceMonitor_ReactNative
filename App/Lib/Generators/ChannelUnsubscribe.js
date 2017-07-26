import { call } from 'redux-saga/effects'
import { getInstallationId } from '../Utilities'

function * channelUnsubscribe (api) {
  const installationId = yield call(getInstallationId)
  if (installationId) {
    let response = yield call(api.channelUnsubscribe, installationId)
    return response.data
  }
}

export default channelUnsubscribe
