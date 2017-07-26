import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import R from 'ramda'

export const INITIAL_STATE = Immutable({
  devices: {},
  error: null,
  fetching: false,
})

const attempt = (state, action) => state.merge({ fetching: true })

const success = (state, action) => {
  const { listOfAddressIds, devices } = action
  const groupDevicesByAddress = R.groupBy((device) => device.pAddress.objectId)

  let updatedDevices = groupDevicesByAddress(devices)
  for (const addressId of listOfAddressIds) {
    if (!(addressId in updatedDevices)) {
      updatedDevices[addressId] = []
    }
  }

  return state.merge({
    fetching: false,
    devices: { ...state.devices, ...updatedDevices }
  })
}

const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: action.error
  })

const removeDevice = (state, action) => {
  const { deviceId } = action
  const { devices } = state

  const matchingDevice = device => device.objectId === deviceId
  const withoutDevice = (value, key, obj) => R.reject(matchingDevice, value)

  const newDevices = R.mapObjIndexed(withoutDevice, devices)

  return state.merge({
    devices: newDevices
  })
}

const updateDevice = (state, action) => {
  const { deviceId, properties } = action
  const { devices } = state

  const deviceToUpdate = R.find(R.propEq('objectId', deviceId), R.flatten(R.values(devices)))
  const addressId = deviceToUpdate.pAddress.objectId
  const devicesAtAddress = devices[addressId] || []

  const newDevices = {
    ...devices,
    [addressId]: devicesAtAddress.map((device, index) => {
      if (device.objectId === deviceId) {
        return {
          ...device,
          ...properties,
        }
      }
      return device
    })
  }

  return state.merge({
    devices: newDevices
  })
}

const replaceDevice = (state, action) => {
  const { device } = action
  const { devices } = state

  const addressId = device.pAddress.objectId
  const devicesAtAddress = devices[addressId] || []
  const otherDevicesAtAddress = R.reject(R.propEq('objectId', device.objectId), devicesAtAddress)

  return state.merge({
    devices: {
      ...devices,
      [addressId]: [...otherDevicesAtAddress, device]
    }
  })
}

const removeAddress = (state, action) => {
  return state.merge({
    devices: R.omit(action.addressId, state.devices)
  })
}

const ACTION_HANDLERS = {
  [Types.DELETE_ADDRESS_SUCCESS]: removeAddress,
  [Types.DEVICE_DELETE_SUCCESS]: removeDevice,
  [Types.DEVICE_UPDATE_SUCCESS]: updateDevice,
  [Types.DEVICE_GET_SUCCESS]: replaceDevice,
  [Types.FETCH_DEVICES]: attempt,
  [Types.FETCH_DEVICES_SUCCESS]: success,
  [Types.FETCH_DEVICES_FAILURE]: failure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
