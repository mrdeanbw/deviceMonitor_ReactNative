import { fork } from 'redux-saga/effects'
import API from '../Services/Api'
import ParseAPI from '../Services/ParseAPI'
import FixtureAPI from '../Services/FixtureApi'
import { watchStartup } from './StartupSaga'
import loadContacts from './LoadContactsSaga'
import resetPassword from './ResetPasswordSaga'
import updatePassword from './UpdatePasswordSaga'
import updateProfile from './UpdateProfileSaga'
import createInstallation from './CreateInstallationSaga'
import login from './LoginSaga'
import pushPermissions from './PushPermissionsSaga'
import logout from './LogoutSaga'
import getCityWeather from './GetCityWeatherSaga'
import createPhoneNumber from './CreatePhoneNumberSaga'
import verifyAccessCode from './VerifyAccessCodeSaga'
import createUser from './CreateUserSaga'
import deleteUser from './DeleteUserSaga'
import sendPushToUser from './SendPushToUserSaga'
import provisionDevice from './ProvisionDeviceSaga'
import playNotificationSound from './PlayNotificationSoundSaga'
import playSuccessSound from './PlaySuccessSoundSaga'
import deleteDevice from './DeleteDeviceSaga'
import createAddress from './CreateAddressSaga'
import deleteAddress from './DeleteAddressSaga'
import deleteMonitor from './DeleteMonitorSaga'
import getAddresses from './GetAddressesSaga'
import getConfig from './GetConfigSaga'
import getDevices from './GetDevicesSaga'
import getDeviceActivity from './GetDeviceActivitySaga'
import getDeviceClimate from './GetDeviceClimateSaga'
import getMonitors from './GetMonitorsSaga'
import updateDevice from './UpdateDeviceSaga'
import { pollDevices } from './PollDevicesSaga'
import saveAddress from './SaveAddressSaga'
import snoozeDevice from './SnoozeDeviceSaga'
import getAlarmModels from './GetAlarmModelsSaga'
import createMonitor from './CreateMonitorSaga'
import createPromotion from './CreatePromotionSaga'
import updateInvitation from './UpdateInvitationSaga'
import DebugSettings from '../Config/DebugSettings'

// Create our API at this level and feed it into
// the sagas that are expected to make API calls
// so there's only 1 copy app-wide!
// const api = API.create()
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const parseApi = ParseAPI.create()

// start the daemons
export default function * root () {
  yield fork(watchStartup)
  yield fork(loadContacts.watcher)
  yield fork(resetPassword(parseApi).watcher)
  yield fork(updatePassword(parseApi).watcher)
  yield fork(updateProfile(parseApi).watcher)
  yield fork(createInstallation(parseApi).watcher)
  yield fork(login(parseApi).watcher)
  yield fork(pushPermissions(parseApi).watcher)
  yield fork(logout(parseApi).watcher)
  yield fork(getCityWeather(api).watcher)
  yield fork(createPhoneNumber(parseApi).watcher)
  yield fork(verifyAccessCode(parseApi).watcher)
  yield fork(createUser(parseApi).watcher)
  yield fork(deleteUser(parseApi).watcher)
  yield fork(sendPushToUser(parseApi).watcher)
  yield fork(provisionDevice(parseApi).watcher)
  yield fork(playNotificationSound.watcher)
  yield fork(playSuccessSound().watcher)
  yield fork(deleteDevice(parseApi).watcher)
  yield fork(createAddress(parseApi).watcher)
  yield fork(deleteAddress(parseApi).watcher)
  yield fork(deleteMonitor(parseApi).watcher)
  yield fork(getAddresses(parseApi).watcher)
  yield fork(getConfig(parseApi).watcher)
  yield fork(getDevices(parseApi).watcher)
  yield fork(getDeviceActivity(parseApi).watcher)
  yield fork(getDeviceClimate(parseApi).watcher)
  yield fork(getMonitors(parseApi).watcher)
  yield fork(updateDevice(parseApi).watcher)
  yield fork(pollDevices)
  yield fork(saveAddress(parseApi).watcher)
  yield fork(snoozeDevice(parseApi).watcher)
  yield fork(getAlarmModels(parseApi).watcher)
  yield fork(createMonitor(parseApi).watcher)
  yield fork(createPromotion(parseApi).watcher)
  yield fork(updateInvitation(parseApi).watcher)
}
