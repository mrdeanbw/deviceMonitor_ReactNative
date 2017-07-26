import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  addressId: null,
  deviceId: null,
  deviceType: null,
  location: null,
  name: 'Smart Battery',
  wifiName: '',
  wifiPassword: '',
  provMech: '',
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

const deviceAddressSelected = (state, action) =>
  state.merge({
    addressId: action.addressId
  })

const deviceTypeSelected = (state, action) =>
  state.merge({
    deviceType: action.deviceType
  })

const provMechSelected = (state, action) =>
  state.merge({
    provMech: action.provMech
  })

const deviceLocationSelected = (state, action) =>
  state.merge({
    location: action.deviceLocation
  })

const deviceNameSelected = (state, action) =>
  state.merge({
    name: action.deviceName
  })

const wifiInfoEntered = (state, action) =>
  state.merge({
    wifiName: action.wifiName,
    wifiPassword: action.wifiPassword
  })

const handleCreateDeviceStart = (state, action) =>
  state.merge({
    creatingDevice: true,
    error: null
  })

const handleCreateDeviceFailure = (state, action) =>
  state.merge({
    creatingDevice: false,
    error: action.error
  })

const handleCreateDeviceSuccess = (state, action) =>
  state.merge({
    creatingDevice: false,
    error: null,
    deviceId: action.deviceId
  })

const handleGetDeviceFailure = (state, action) =>
  state.merge({
    error: action.error
  })

const handleGetDeviceSuccess = (state, action) =>
  state.merge({
    error: null,
    isProvisioned: action.device.isProvisioned
  })

const handleChangeProvisionStep = (state, action) =>
  state.merge({
    step: action.step
  })

const handleUpdateCountdown = (state, action) =>
  state.merge({
    timer: action.count
  })

const handleResetStep = (state, action) =>
  state.merge({
    step: 'initial',
    isProvisioned: false,
    timer: null,
    error: null
  })

const handleResetProvisionState = () => (INITIAL_STATE)

const handleResetProvisioningError = (state, action) =>
  state.merge({
    error: null
  })

const handleCancelProvisionCleanup = (state, action) =>
  state.merge({
    creatingDevice: false,
    error: null,
    updatingDevice: false,
    isProvisioned: false,
    step: 'initial',
    timer: null
  })

const handleSetDeviceLatLong = (state, action) =>
  state.merge({
    latitude: action.lat,
    longitude: action.long
  })

const handleGetAlarmModels = (state, action) => state.merge({ loading: true })

const handleGetAlarmModelsSuccess = (state, action) =>
  state.merge({
    loading: false,
    error: null,
    alarmModels: action.alarmModels
  })

const handleGetAlarmModelsFailure = (state, action) =>
  state.merge({
    loading: false,
    error: action.error
  })

const ACTION_HANDLERS = {
  [Types.DEVICE_ADDRESS_SELECT]: deviceAddressSelected,
  [Types.DEVICE_TYPE_SELECT]: deviceTypeSelected,
  [Types.PROV_MECH_SELECT]: provMechSelected,
  [Types.DEVICE_LOCATION_SELECT]: deviceLocationSelected,
  [Types.DEVICE_NAME_SELECT]: deviceNameSelected,
  [Types.WIFI_INFO_ENTER]: wifiInfoEntered,
  [Types.DEVICE_CREATE_STARTED]: handleCreateDeviceStart,
  [Types.DEVICE_CREATE_FAILURE]: handleCreateDeviceFailure,
  [Types.DEVICE_CREATE_SUCCESS]: handleCreateDeviceSuccess,
  [Types.DEVICE_GET_FAILURE]: handleGetDeviceFailure,
  [Types.DEVICE_GET_SUCCESS]: handleGetDeviceSuccess,
  [Types.PROVISION_STEP_CHANGE]: handleChangeProvisionStep,
  [Types.COUNTDOWN_UPDATE]: handleUpdateCountdown,
  [Types.PROVISION_STATE_RESET]: handleResetProvisionState,
  [Types.RESET_STEP]: handleResetStep,
  [Types.PROVISIONING_ERROR_RESET]: handleResetProvisioningError,
  [Types.PROVISION_CANCEL_CLEANUP]: handleCancelProvisionCleanup,
  [Types.DEVICE_LAT_LONG]: handleSetDeviceLatLong,
  [Types.GET_ALARM_MODELS]: handleGetAlarmModels,
  [Types.GET_ALARM_MODELS_SUCCESS]: handleGetAlarmModelsSuccess,
  [Types.GET_ALARM_MODELS_FAILURE]: handleGetAlarmModelsFailure,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
