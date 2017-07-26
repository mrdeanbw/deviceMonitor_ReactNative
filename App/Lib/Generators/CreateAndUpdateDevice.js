import { select, take, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import R from 'ramda'
import Types from '../../Actions/Types'
import Actions from '../../Actions/Creators'
import { getErrorFromResponse } from '../Errors'
import makePointer from '../MakePointer'

function * createAndUpdateDevice (api) {
  const genericError = 'An error occurred. Please try again later'

  const { userId } = yield select((state) => state.user)
  const { latitude, longitude, location, name, deviceType, addressId, provMech } = yield select((state) => state.createDevice)
  let properties = {
    event: 'create',
    owner: makePointer('_User', userId),
    pAddress: { __type: 'Pointer', className: 'Address', objectId: addressId },
    deviceType,
    name,
    location,
    provMech
  }

  if (latitude && longitude) {
    properties = R.merge(properties, { geoPoint: { __type: 'GeoPoint', latitude, longitude } })
  }

  const response = yield call(api.createDevice, properties)
  if (!response.ok) {
    yield put(Actions.deviceCreateFailure(genericError))
    throw 'error'
  }
  const deviceId = response.data.objectId;

  const updateResponse = yield call(api.updateDevice, deviceId, { event: 'start provisioning' })
  if (!updateResponse.ok) {
    yield put(Actions.deviceCreateFailure(genericError))
    throw 'error'
  }

  yield put(Actions.deviceCreateSuccess(deviceId))

  yield put(Actions.changeProvisionStep('chirping'))
  const { wifiName, wifiPassword } = yield select((state) => state.createDevice)
  const countryCode = yield select((state) => state.selectedCountry.wicedCode)
}

export default createAndUpdateDevice
