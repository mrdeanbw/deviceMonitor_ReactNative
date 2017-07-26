import { combineReducers } from 'redux'
import AddressesReducer from './AddressesReducer'
import ConfigReducer from './ConfigReducer'
import ContactsReducer from './ContactsReducer'
import CountryReducer from './CountryReducer'
import CreateAccountReducer from './CreateAccountReducer'
import CreateDeviceReducer from './CreateDeviceReducer'
import DeleteDeviceReducer from './DeleteDeviceReducer'
import DevicesReducer from './DevicesReducer'
import DeviceActivityReducer from './DeviceActivityReducer'
import DeviceClimateReducer from './DeviceClimateReducer'
import LoginReducer from './LoginReducer'
import MonitorsReducer from './MonitorsReducer'
import ResetPasswordReducer from './ResetPasswordReducer'
import SaveAddressReducer from './SaveAddressReducer'
import UpdateDeviceReducer from './UpdateDeviceReducer'
import UpdatePasswordReducer from './UpdatePasswordReducer'
import UserReducer from './UserReducer'
import CreateMonitorReducer from './CreateMonitorReducer'
import CreatePromotionReducer from './CreatePromotionReducer'
import WeatherReducer from './WeatherReducer'

// glue all the reducers together into 1 root reducer
const appReducer = combineReducers({
  addresses: AddressesReducer,
  config: ConfigReducer,
  contacts: ContactsReducer,
  createAccount: CreateAccountReducer,
  createDevice: CreateDeviceReducer,
  deleteDevice: DeleteDeviceReducer,
  devices: DevicesReducer,
  deviceActivity: DeviceActivityReducer,
  deviceClimate: DeviceClimateReducer,
  login: LoginReducer,
  monitors: MonitorsReducer,
  resetPassword: ResetPasswordReducer,
  saveAddress: SaveAddressReducer,
  selectedCountry: CountryReducer,
  updateDevice: UpdateDeviceReducer,
  updatePassword: UpdatePasswordReducer,
  user: UserReducer,
  createMonitor: CreateMonitorReducer,
  createPromotion: CreatePromotionReducer,
  weather: WeatherReducer
})

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    // Keep only the "config" portion of state around after login
    state = { config: state.config }
  }

  return appReducer(state, action)
}

// Put reducer keys that you do NOT want stored to persistence here
export const persistentStoreBlacklist = ['createDevice']
// OR put reducer keys that you DO want stored to persistence here (overrides blacklist)
// export const persistentStoreWhitelist = []
