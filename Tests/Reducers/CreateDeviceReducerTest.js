import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CreateDeviceReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    addressId: null,
    deviceId: null,
    deviceType: null,
    location: null,
    name: 'Smart Battery',
    wifiName: '',
    wifiPassword: '',
    provMech: 'speaker',
    creatingDevice: false,
    error: null,
    updatingDevice: false,
    isProvisioned: false,
    step: 'initial',
    timer: null,
    latitude: null,
    longitude: null,
    loading: false,
    alarmModels: [],
  })
})

test('device address selected reducer', t => {
  const addressId = '123'
  const state = reducer(
    INITIAL_STATE, Actions.selectDeviceAddress(addressId))
  t.deepEqual(state.addressId, addressId)
})

test('device type selected reducer', t => {
  const deviceType = 'Battery'
  const state = reducer(
    INITIAL_STATE, Actions.selectDeviceType(deviceType))
  t.deepEqual(state.deviceType, deviceType)
})

test('device location selected reducer', t => {
  const deviceLocation = 'hallway'
  const state = reducer(
    INITIAL_STATE, Actions.selectDeviceLocation(deviceLocation))
  t.deepEqual(state.location, deviceLocation)
})

test('device name selected reducer', t => {
  const name = 'Jeff Goldblum'
  const state = reducer(
    INITIAL_STATE, Actions.selectDeviceName(name))
  t.deepEqual(state.name, name)
})

test('device wifi name and password reducer', t => {
  const wifiName = 'netwerk'
  const wifiPassword = 'netpass'
  const state = reducer(
    INITIAL_STATE, Actions.enterWifiInfo(wifiName, wifiPassword))
  t.deepEqual(state.wifiName, wifiName)
  t.deepEqual(state.wifiPassword, wifiPassword)
})

test('prov mech selected reducer', t => {
  const provMech = 'Speaker'
  const state = reducer(
    INITIAL_STATE, Actions.selectProvMech(provMech))
  t.deepEqual(state.provMech, provMech)
})

test('create device start', t => {
  const state = reducer(
    INITIAL_STATE, Actions.startDeviceCreation())
  t.true(state.creatingDevice)
  t.is(state.error, null)
})

test('create device failure', t => {
  const error = 'nooooo!'
  const state = reducer(
    INITIAL_STATE, Actions.deviceCreateFailure(error))
  t.deepEqual(state.error, error)
  t.false(state.creatingDevice)
})

test('create device success', t => {
  const objectId = '1234'
  const state = reducer(
    INITIAL_STATE, Actions.deviceCreateSuccess(objectId))
  t.deepEqual(state.deviceId, objectId)
  t.false(state.creatingDevice)
  t.is(state.error, null)
})

test('get device success', t => {
  const device = { isProvisioned: true }
  const state = reducer(
    INITIAL_STATE, Actions.getDeviceSuccess(device))
  t.true(state.isProvisioned)
  t.is(state.error, null)
})

test('get device failure', t => {
  const error = 'uh oh'
  const state = reducer(
    INITIAL_STATE, Actions.getDeviceFailure(error))
  t.deepEqual(state.error, error)
})

test('change provisioning step', t => {
  const provisionStep = 'bananas!!'
  const state = reducer(
    INITIAL_STATE, Actions.changeProvisionStep(provisionStep))
  t.deepEqual(state.step, provisionStep)
})

test('update countdown timer', t => {
  const count = 100
  const state = reducer(
    INITIAL_STATE, Actions.updateTimerCountdown(count))
  t.deepEqual(state.timer, count)
})

test('reset provisioning state', t => {
  const state = reducer(
    INITIAL_STATE, Actions.resetProvisionState())
  t.deepEqual(state, INITIAL_STATE)
})

test('reset provisioning error', t => {
  const state = reducer(
    INITIAL_STATE, Actions.resetProvisioningError())
  t.is(state.error, null)
})

test('device provisioning canceled', t => {
  const state = reducer(
    INITIAL_STATE, Actions.cancelProvisionCleanup())
  t.false(state.creatingDevice)
  t.is(state.error, null)
  t.false(state.updatingDevice)
  t.false(state.isProvisioned)
  t.deepEqual(state.step, 'initial')
  t.is(state.timer, null)
})

test('set latitude and longitude', t => {
  const lat = 1
  const long = 2
  const state = reducer(
    INITIAL_STATE, Actions.setLatLong(lat, long))
  t.deepEqual(state.latitude, 1)
  t.deepEqual(state.longitude, 2)
})

test('attempt to retrieve alarm models', t => {
  const state = reducer(
    INITIAL_STATE, Actions.getAlarmModels())
  t.is(state.error, null)
  t.true(state.loading)
})

test('retrieve alarm models failure', t => {
  const error = 'oh noooo'
  const state = reducer(
    INITIAL_STATE, Actions.getAlarmModelsFailure(error))
  t.deepEqual(state.error, error)
  t.false(state.loading)
})

test('retrieve alarm models success', t => {
  const alarmModels = [{ name: 'scream' }, { name: 'boo' }]
  const state = reducer(
    INITIAL_STATE, Actions.getAlarmModelsSuccess(alarmModels))
  t.deepEqual(state.alarmModels, alarmModels)
  t.is(state.error, null)
  t.false(state.loading)
})

