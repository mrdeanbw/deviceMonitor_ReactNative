import Types from './Types'

const attemptLogin = (countryCode, phoneNumber, password) => ({
  type: Types.LOGIN_ATTEMPT, countryCode, phoneNumber, password
})
const loginSuccess = (user) => ({ type: Types.LOGIN_SUCCESS, user })
const loginFailure = (error) => ({ type: Types.LOGIN_FAILURE, error })

const logout = () => ({ type: Types.LOGOUT })

const startup = () => ({ type: Types.STARTUP })

const loadContacts = (requestPermissions) => ({
  type: Types.LOAD_CONTACTS,
  requestPermissions
})
const loadContactsSuccess = (contactsAccess, contacts) => ({
  type: Types.LOAD_CONTACTS_SUCCESS,
  contactsAccess,
  contacts
})
const loadContactsFailure = (error) => ({ type: Types.LOAD_CONTACTS_FAILURE, error })

const requestTemperature = (city) => ({ type: Types.TEMPERATURE_REQUEST, city })
const receiveTemperature = (temperature) => ({ type: Types.TEMPERATURE_RECEIVE, temperature })
const receiveTemperatureFailure = () => ({ type: Types.TEMPERATURE_FAILURE })

const selectCountry = (country) => ({ type: Types.COUNTRY_SELECTED, country })
const startPhoneNumberCreation = () => ({ type: Types.PHONE_NUMBER_CREATE_STARTED })
const createPhoneNumber = (phoneNumber, countryCode) => ({
  type: Types.PHONE_NUMBER_CREATE,
  phoneNumber,
  countryCode
})
const phoneNumberCreateSuccess = (accessCode, phoneNumberId) => ({
  type: Types.PHONE_NUMBER_CREATE_SUCCESS,
  accessCode,
  phoneNumberId
})
const phoneNumberCreateFailure = (error) => ({
  type: Types.PHONE_NUMBER_CREATE_FAILURE,
  error
})
const updatingPhoneNumber = () => ({ type: Types.PHONE_NUMBER_UPDATING })
const phoneNumberUpdateSuccess = () => ({ type: Types.PHONE_NUMBER_UPDATE_SUCCESS })
const phoneNumberUpdateFailed = (error) => ({ type: Types.PHONE_NUMBER_UPDATE_FAILURE, error })
const accessCodeVerified = () => ({ type: Types.ACCESS_CODE_VERIFIED })
const createUser = (firstName, lastName, email, password) => ({
  type: Types.USER_CREATE,
  firstName,
  lastName,
  email,
  password
})
const creatingUser = () => ({ type: Types.USER_CREATE_STARTED })
const createUserSuccess = (user) => ({ type: Types.USER_CREATE_SUCCESS, user })
const createUserFailure = (error) => ({ type: Types.USER_CREATE_FAILURE, error })

const deleteUser = () => ({ type: Types.USER_DELETE })
const deleteUserSuccess = () => ({ type: Types.USER_DELETE_SUCCESS })
const deleteUserFailure = (error) => ({ type: Types.USER_DELETE_FAILURE, error })

const sendPushToUser = () => ({ type: Types.SEND_PUSH_TO_USER})
const sendPushToUserSuccess = () => ({ type: Types.SEND_PUSH_TO_USER_SUCCESS})
const sendPushToUserFailure = (error) => ({ type: Types.SEND_PUSH_TO_USER_FAILURE, error })


const createInstallation = (deviceType, deviceToken) => ({
  type: Types.CREATE_INSTALLATION,
  deviceType,
  deviceToken
})
const createInstallationSuccess = (installation) => ({ type: Types.CREATE_INSTALLATION_SUCCESS, installation })
const createInstallationFailure = (error) => ({ type: Types.CREATE_INSTALLATION_FAILURE, error })

const resetPassword = (phoneNumber, countryCode) => ({
  type: Types.RESET_PASSWORD,
  phoneNumber,
  countryCode
})
const resetPasswordSuccess = () => ({ type: Types.RESET_PASSWORD_SUCCESS })
const resetPasswordFailure = (error) => ({ type: Types.RESET_PASSWORD_FAILURE, error })

const updatePassword = (newPassword) => ({
  type: Types.UPDATE_PASSWORD,
  password: newPassword
})
const updatePasswordSuccess = (newSessionToken) => ({
  type: Types.UPDATE_PASSWORD_SUCCESS,
  newSessionToken
})
const updatePasswordFailure = (error) => ({ type: Types.UPDATE_PASSWORD_FAILURE, error })

const updateProfile = (updates) => ({
  type: Types.UPDATE_PROFILE,
  updates
})
const updateProfileSuccess = (updates) => ({
  type: Types.UPDATE_PROFILE_SUCCESS,
  updates
})
const updateProfileFailure = (error) => ({ type: Types.UPDATE_PROFILE_FAILURE, error })

const createAddress = (fields) => ({ type: Types.CREATE_ADDRESS, fields })
const createAddressSuccess = (addressId, newAddress) => ({
  type: Types.CREATE_ADDRESS_SUCCESS,
  addressId,
  newAddress
})
const createAddressFailure = (error) => ({ type: Types.CREATE_ADDRESS_FAILURE, error })

const deleteAddress = (addressId) => ({ type: Types.DELETE_ADDRESS, addressId })
const deleteAddressSuccess = (addressId) => ({ type: Types.DELETE_ADDRESS_SUCCESS, addressId })
const deleteAddressFailure = (error) => ({ type: Types.DELETE_ADDRESS_FAILURE, error })

const fetchAddresses = (background = false) => ({ type: Types.FETCH_ADDRESSES, background })
const fetchAddressesSuccess = (userId, addresses) => ({
  type: Types.FETCH_ADDRESSES_SUCCESS,
  userId,
  addresses
})
const fetchAddressesFailure = (error) => ({
  type: Types.FETCH_ADDRESSES_FAILURE,
  error
})

const saveAddress = (addressId, updates) => ({ type: Types.SAVE_ADDRESS, addressId, updates })
const saveAddressSuccess = (addressId, savedAddress) => ({
  type: Types.SAVE_ADDRESS_SUCCESS,
  addressId,
  savedAddress
})
const saveAddressFailure = (error) => ({ type: Types.SAVE_ADDRESS_FAILURE, error })

const selectDeviceAddress = (addressId) => ({
  type: Types.DEVICE_ADDRESS_SELECT,
  addressId
})
const selectDeviceType = (deviceType) => ({
  type: Types.DEVICE_TYPE_SELECT,
  deviceType
})
const selectProvMech = (provMech) => ({
  type: Types.PROV_MECH_SELECT,
  provMech
})
const selectDeviceLocation = (deviceLocation) => ({
  type: Types.DEVICE_LOCATION_SELECT,
  deviceLocation
})
const selectDeviceName = (deviceName) => ({
  type: Types.DEVICE_NAME_SELECT,
  deviceName
})
const enterWifiInfo = (wifiName, wifiPassword) => ({
  type: Types.WIFI_INFO_ENTER,
  wifiName,
  wifiPassword
})
const startDeviceCreation = () => ({ type: Types.DEVICE_CREATE_STARTED })
const createDevice = () => ({ type: Types.DEVICE_CREATE })
const deviceCreateSuccess = (deviceId) => ({
  type: Types.DEVICE_CREATE_SUCCESS,
  deviceId
})
const deviceCreateFailure = (error) => ({
  type: Types.DEVICE_CREATE_FAILURE,
  error
})

const getDevice = (deviceId) => ({
  type: Types.DEVICE_GET,
  deviceId
})
const getDeviceSuccess = (device) => ({
  type: Types.DEVICE_GET_SUCCESS,
  device
})
const getDeviceFailure = (error) => ({
  type: Types.DEVICE_GET_FAILURE,
  error
})
const updateDevice = (deviceId, properties) => ({
  type: Types.DEVICE_UPDATE,
  deviceId,
  properties
})
const updateDeviceSuccess = (deviceId, properties) => ({
  type: Types.DEVICE_UPDATE_SUCCESS,
  deviceId,
  properties
})
const updateDeviceFailure = (error) => ({
  type: Types.DEVICE_UPDATE_FAILURE,
  error
})

const snoozeDevice = (deviceId,userId, bssid, location) => ({
  type: Types.SNOOZE_DEVICE,
  deviceId,
  userId,
  bssid,
  location
})
const snoozeDeviceSuccess = (deviceId) => ({ type: Types.SNOOZE_DEVICE_SUCCESS, deviceId })
const snoozeDeviceFailure = (error) => ({ type: Types.SNOOZE_DEVICE_FAILURE, error })

const deleteDevice = (deviceId) => ({
  type: Types.DEVICE_DELETE,
  deviceId
})
const deleteDeviceSuccess = (deviceId) => ({
  type: Types.DEVICE_DELETE_SUCCESS,
  deviceId
})
const deleteDeviceFailure = (error) => ({
  type: Types.DEVICE_DELETE_FAILURE,
  error
})

const changeProvisionStep = (step) => ({
  type: Types.PROVISION_STEP_CHANGE,
  step
})
const timer = (duration) => ({
  type: Types.TIMER,
  duration
})
const updateTimerCountdown = (count) => ({
  type: Types.COUNTDOWN_UPDATE,
  count
})
const pollDeviceStatusStart = () => ({ type: Types.POLL_DEVICE_STATUS_START })
const pollDeviceStatus = () => ({ type: Types.POLL_DEVICE_STATUS })
const resetStep = () => ({ type: Types.RESET_STEP })
const resetProvisionState = () => ({ type: Types.PROVISION_STATE_RESET })
const resetProvisioningError = () => ({ type: Types.PROVISIONING_ERROR_RESET })

const fetchConfig = () => ({ type: Types.FETCH_CONFIG })
const fetchConfigSuccess = (config) => ({
  type: Types.FETCH_CONFIG_SUCCESS,
  config
})
const fetchConfigFailure = (error) => ({
  type: Types.FETCH_CONFIG_FAILURE,
  error
})

const fetchMonitors = () => ({ type: Types.FETCH_MONITORS })
const fetchMonitorsSuccess = (monitors, invitations, sentInvitations) => ({
  type: Types.FETCH_MONITORS_SUCCESS,
  invitations,
  sentInvitations,
  monitors
})
const fetchMonitorsFailure = (error) => ({
  type: Types.FETCH_MONITORS_FAILURE,
  error
})

const fetchDevices = (listOfAddressIds) => ({ type: Types.FETCH_DEVICES, listOfAddressIds })
const fetchDevicesSuccess = (listOfAddressIds, devices) => ({
  type: Types.FETCH_DEVICES_SUCCESS,
  listOfAddressIds,
  devices
})
const fetchDevicesFailure = (error) => ({
  type: Types.FETCH_DEVICES_FAILURE,
  error
})

const fetchDeviceActivity = (deviceId) => ({ type: Types.FETCH_DEVICE_ACTIVITY, deviceId })
const fetchDeviceActivitySuccess = (events) => ({
  type: Types.FETCH_DEVICE_ACTIVITY_SUCCESS,
  events
})
const fetchDeviceActivityFailure = (error) => ({
  type: Types.FETCH_DEVICE_ACTIVITY_FAILURE,
  error
})

const resetDeviceActivity = () => ({ type: Types.RESET_DEVICE_ACTIVITY })

const fetchDeviceClimate = (deviceId, oneDay) => ({
  type: Types.FETCH_DEVICE_CLIMATE,
  deviceId,
  period: oneDay ? 'day' : 'week'
})
const fetchDeviceClimateSuccess = (data, period) => ({
  type: Types.FETCH_DEVICE_CLIMATE_SUCCESS,
  data,
  period
})
const fetchDeviceClimateFailure = (error, period) => ({
  type: Types.FETCH_DEVICE_CLIMATE_FAILURE,
  error,
  period
})

const resetDeviceClimate = () => ({ type: Types.RESET_DEVICE_CLIMATE })

const cancelProvisioning = () => ({ type: Types.PROVISION_CANCEL })
const cancelProvisionCleanup = () => ({ type: Types.PROVISION_CANCEL_CLEANUP })
const provisionAttemptComplete = () => ({ type: Types.PROVISION_ATTEMPT_COMPLETE })

const setLatLong = (lat, long) => ({
  type: Types.DEVICE_LAT_LONG,
  lat,
  long
})

const getAlarmModels = () => ({ type: Types.GET_ALARM_MODELS })
const getAlarmModelsSuccess = (alarmModels) => ({
  type: Types.GET_ALARM_MODELS_SUCCESS,
  alarmModels
})
const getAlarmModelsFailure = (error) => ({
  type: Types.GET_ALARM_MODELS_FAILURE,
  error
})

const createMonitor = (formattedPhoneNumber, addressId) => ({
  type: Types.CREATE_MONITOR,
  formattedPhoneNumber,
  addressId
})
const createMonitorSuccess = (monitorId) => ({
  type: Types.CREATE_MONITOR_SUCCESS,
  monitorId
})
const createMonitorFailure = (error) => ({ type: Types.CREATE_MONITOR_FAILURE, error })

const createPromotion = (promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country) => ({
    type: Types.CREATE_PROMOTION,
    promoCode,
    name,
    phoneNumber,
    email,
    address1,
    address2,
    city,
    province,
    postalCode,
    country
})
const createPromotionSuccess = (promotionId) => ({
    type: Types.CREATE_PROMOTION_SUCCESS,
    promotionId
})
const createPromotionFailure = (error) => ({ type: Types.CREATE_PROMOTION_FAILURE, error })

const deleteMonitor = (monitorId) => ({
  type: Types.DELETE_MONITOR,
  monitorId
})
const deleteMonitorSuccess = (monitorId) => ({
  type: Types.DELETE_MONITOR_SUCCESS,
  monitorId
})
const deleteMonitorFailure = (error) => ({ type: Types.DELETE_MONITOR_FAILURE, error })

const acceptInvitation = (invitationId) => ({
  type: Types.UPDATE_INVITATION,
  status: 'accept',
  invitationId
})
const rejectInvitation = (invitationId) => ({
  type: Types.UPDATE_INVITATION,
  status: 'reject',
  invitationId
})
const terminateInvitation = (invitationId) => ({
  type: Types.UPDATE_INVITATION,
  status: 'terminate',
  invitationId
})
const updateInvitationSuccess = (invitationId) => ({
  type: Types.UPDATE_INVITATION_SUCCESS,
  invitationId
})
const updateInvitationFailure = (error) => ({
  type: Types.UPDATE_INVITATION_FAILURE,
  error
})

const finishNotificationAlarm = () => ({
  type: Types.FINISH_NOTIFICATION_ALARM
})
const playNotificationAlarm = () => ({
  type: Types.PLAY_NOTIFICATION_ALARM
})
const stopNotificationAlarm = () => ({
  type: Types.STOP_NOTIFICATION_ALARM
})
const endNotificationAlarm = () => ({
  type: Types.END_NOTIFICATION_ALARM
})

/**
 Makes available all the action creators we've created.
 */
export default {
  attemptLogin,
  loginSuccess,
  loginFailure,
  logout,
  startup,
  loadContacts,
  loadContactsSuccess,
  loadContactsFailure,
  requestTemperature,
  receiveTemperature,
  receiveTemperatureFailure,

  selectCountry,
  phoneNumberCreateSuccess,
  phoneNumberCreateFailure,

  startPhoneNumberCreation,
  createPhoneNumber,

  updatingPhoneNumber,
  phoneNumberUpdateSuccess,
  phoneNumberUpdateFailed,

  accessCodeVerified,

  createUser,
  creatingUser,
  createUserSuccess,
  createUserFailure,

  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,

  sendPushToUser,
  sendPushToUserSuccess,
  sendPushToUserFailure,

  createInstallation,
  createInstallationSuccess,
  createInstallationFailure,

  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,

  updatePassword,
  updatePasswordSuccess,
  updatePasswordFailure,

  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,

  createAddress,
  createAddressSuccess,
  createAddressFailure,

  deleteAddress,
  deleteAddressSuccess,
  deleteAddressFailure,

  fetchAddresses,
  fetchAddressesSuccess,
  fetchAddressesFailure,

  saveAddress,
  saveAddressSuccess,
  saveAddressFailure,

  fetchConfig,
  fetchConfigSuccess,
  fetchConfigFailure,

  fetchMonitors,
  fetchMonitorsSuccess,
  fetchMonitorsFailure,

  fetchDevices,
  fetchDevicesSuccess,
  fetchDevicesFailure,

  fetchDeviceActivity,
  fetchDeviceActivitySuccess,
  fetchDeviceActivityFailure,

  resetDeviceActivity,

  fetchDeviceClimate,
  fetchDeviceClimateSuccess,
  fetchDeviceClimateFailure,

  resetDeviceClimate,

  selectDeviceAddress,
  selectDeviceType,
  selectProvMech,
  selectDeviceLocation,
  selectDeviceName,
  enterWifiInfo,

  createDevice,
  startDeviceCreation,
  deviceCreateSuccess,
  deviceCreateFailure,

  getDevice,
  getDeviceSuccess,
  getDeviceFailure,

  updateDevice,
  updateDeviceSuccess,
  updateDeviceFailure,

  snoozeDevice,
  snoozeDeviceSuccess,
  snoozeDeviceFailure,

  deleteDevice,
  deleteDeviceSuccess,
  deleteDeviceFailure,

  changeProvisionStep,

  timer,
  updateTimerCountdown,
  pollDeviceStatus,
  resetStep,
  resetProvisionState,
  resetProvisioningError,
  cancelProvisioning,
  cancelProvisionCleanup,
  provisionAttemptComplete,
  setLatLong,

  getAlarmModels,
  getAlarmModelsSuccess,
  getAlarmModelsFailure,

  createMonitor,
  createMonitorSuccess,
  createMonitorFailure,

    createPromotion,
    createPromotionSuccess,
    createPromotionFailure,

  deleteMonitor,
  deleteMonitorSuccess,
  deleteMonitorFailure,

  rejectInvitation,
  acceptInvitation,
  terminateInvitation,
  updateInvitationSuccess,
  updateInvitationFailure,

  finishNotificationAlarm,
  playNotificationAlarm,
  stopNotificationAlarm,
  endNotificationAlarm,
}
