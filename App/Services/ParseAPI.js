import { AsyncStorage, Platform } from 'react-native'
import apisauce from 'apisauce'
import Config from 'react-native-config'
import Reactotron from 'reactotron-react-native'
import APIConfig from '../Config/API'
import makeVarietyOfDevices from '../Fixtures/devices'
import DeviceInfo from 'react-native-device-info'
import R from 'ramda'
import makePointer from '../Lib/MakePointer'

const authHeaderName = 'X-Parse-Session-Token'

/*
 * We're using Parse's REST API instead of the JS SDK so we can switch
 * to a custom backend later if Parse atrophies without Facebook.
 */

const create = (baseURL = APIConfig.baseURL) => {

  AsyncStorage.getItem('sessionToken').then(value => {
    if (value) {
      setToken(value)
    }
  })

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'X-Parse-Application-Id': APIConfig.applicationId
    },
    // 10 second timeout...
    timeout: 10000
  })

  api.addMonitor(Reactotron.apisauce)

  const setToken = (sessionToken) => {
    api.setHeader(authHeaderName, sessionToken)
  }

  const removeToken = () => {
    api.setHeader(authHeaderName, '')
  }

  const createPhoneNumber = (phoneNumber) => api.post('/classes/PhoneNumber', {
      phoneNumber,
      event: 'create'
    }, {
      headers: { [authHeaderName]: '' }
    })

  const verifyPhoneNumber = (phoneNumberId) => api.put(
    `/classes/PhoneNumber/${phoneNumberId}`, {
      event: 'verify'
    }, {
      headers: { [authHeaderName]: '' }
    })

  const verifyCode = (phoneNumberId) => api.put(
    `/classes/PhoneNumber/${phoneNumberId}`, {
      event: 'verified'
    }, {
      headers: { [authHeaderName]: '' }
    })

  const resetPassword = (phoneNumber) => {
    const dataToPost = {
       phoneNumber: phoneNumber,
    }
       return api.post('/functions/resetPassword', dataToPost)
  }

  const deletePhoneNumber = (phoneNumberId) => api.put(
    `/classes/PhoneNumber/${phoneNumberId}`, {
      event: 'terminate'
    }
  )

  const findPhoneNumber = (phoneNumberWithCountryCode) =>
    api.get('/classes/PhoneNumber', { where: { phoneNumber: phoneNumberWithCountryCode } })

  const getUser = () =>
    api.get('/users/me')

  const getUsername = (id) => api.get(`/users/${id}`)

  const createUser = (countryCode, phoneNumber, firstName, lastName, email, password) => {
    const formattedPhoneNumber = `+${countryCode}${phoneNumber}`
    const name = `${firstName} ${lastName}`
    return api.post(
      '/users', {
        username: formattedPhoneNumber,
        phoneNumber: formattedPhoneNumber,
        name,
        email,
        password
      }, {
        headers: { [authHeaderName]: '' }
      }
    )
  }

  const createInstallation = (installationId, deviceToken, userChannels) => {
    return api.post('/installations', {
      deviceToken,
      deviceType: Platform.OS,
      installationId,
      channels: userChannels,
      appIdentifier: DeviceInfo.getBundleId(),
      appName: `Roost ${APIConfig.name}`,
      badge: 0,
      localeIdentifier: DeviceInfo.getDeviceLocale(),
      appVersion: DeviceInfo.getVersion() + '.' + DeviceInfo.getBuildNumber(),
      pushType: Platform.OS === 'ios' ?  undefined : "gcm",
      timeZone: DeviceInfo.getTimezone(),
      deviceManufacturer: DeviceInfo.getManufacturer(),
      deviceBrand: DeviceInfo.getBrand(),
      deviceModel: DeviceInfo.getModel(),
      deviceID: DeviceInfo.getDeviceId(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      userAgent: DeviceInfo.getUserAgent(),
      deviceCountry: DeviceInfo.getDeviceCountry(),
    })
  }

  const channelUnsubscribe = (installationId) => {
    return api.post('/installations', { deviceType: Platform.OS, installationId, channels: [] })
  }

  /* To Do for SOFT-1642
  const channelUnsubscribeOnAcctDeletion = (installationId) => {
    return api.post('/installations', { deviceType: Platform.OS, channels, channels: [] })
  }
  */

  const updatePassword = (userId, password) => updateUser(userId, { password })

  const updateUser = (userId, updates) => api.put(`/users/${userId}`, updates)

  const createDevice = (properties) =>
    api.post('classes/Sensor', properties)


  const snoozeDevice = (deviceId, userId, bssid, location) => {
    const { latitude, longitude } = location
    let data = {
      sensor: makePointer('Sensor', deviceId),
      requestedBy: makePointer('_User', userId),
      userBSSID: bssid,
    }
    if (latitude && longitude) {
      data.userPosition = { __type: 'GeoPoint', latitude, longitude }
    }
    return api.post('classes/Snooze', data)
  }

  const updateDevice = (id, properties) =>
    api.put(`classes/Sensor/${id}`, properties)

  const deleteDevice = (id) => api.delete(`classes/Sensor/${id}`)

  const getDevice = (id) => api.get(`classes/Sensor/${id}`)

  const login = (username, password) =>
    api.get('/login', { username, password }, { headers: {
      'X-Parse-Revocable-Session': '1',
      [authHeaderName]: ''
    } })

  const logout = () => api.post('/logout')

  const getAddresses = (userId, monitoredAddresses) => api.get(
    '/classes/Address', {
      where: {
        '$or': [
          { owner: makePointer('_User', userId) },
          { objectId: { '$in': monitoredAddresses } },
        ]
      },
      include: 'owner'
    }
  )

  const getAddress = (id) => api.get(`classes/Address/${id}`)

  const getConfig = () => api.get('/classes/Config', { limit: 1 })

  const getDevices = (userId, listOfAddressIds) => {
    if (__DEV__ && Config.USE_MOCK_DEVICES) {
      return {
        ok: true,
        data: {
          results: makeVarietyOfDevices(userId, listOfAddressIds[0])
        }
      }
    }

    const pointers = listOfAddressIds.map((addressId) => makePointer('Address', addressId))
    return api.get('/classes/Sensor', {
      where: {
        '$or': [
          { owner: makePointer('_User', userId) },
          { pAddress: { '$in': pointers } },
        ],
        isProvisioned: true,
        pAddress: { '$exists': true }
      }
    })
  }

  const getMonitors = (userId) =>
    api.get('/classes/Monitors', {
      where: {
        inviter: userId,
        status: 'accepted'
      }
    })

  const getMonitorInvitations = (userId) =>
    api.get('/classes/Monitors', {
      where: {
        monitor: userId,
        status: { '$in': ['invite', 'accepted'] }
      }
    })

    const getSentInvitations = (userId) =>
    api.get('/classes/Monitors', {
        where: {
            inviter: userId,
            status: { '$in': ['invite'] }
        }
    })

  const getOwnMonitors = (userId) =>
    api.get('/classes/Monitors', {
      where: {
        monitor: userId,
        status: 'accepted'
      }
    })

  const updateMonitor = (monitorId, status) =>
    api.put(`/classes/Monitors/${monitorId}`, { status })

  const getDeviceActivity = (deviceId) =>
    api.get('/classes/History', {
      where: {
        sensor: makePointer('Sensor', deviceId),
        event: { '$ne': 'Checkin' } 
      },
      limit: 50,
      order: '-createdAt'
    })

  const getDeviceClimate = (deviceId, since) => 
    api.get('/classes/History', { 
        where: { 
            sensor: makePointer('Sensor', deviceId), 
            readings: { '$exists': true }, 
            createdAt: { '$gte': { '__type': 'Date', iso: since.toISOString() } } 
        }, 
        limit: 99, 
        order: '-createdAt' 
    })

  const saveAddress = (addressId, updates) =>
    api.put(`/classes/Address/${addressId}`, updates)

  const deleteAddress = (id) => api.delete(`classes/Address/${id}`)

  const createAddress = (userId, fields) => {
    const dataToPost = {
      ...fields,
      owner: makePointer('_User', userId)
    }
    return api.post('/classes/Address', dataToPost)
  }

  const getAlarmModels = () =>
    api.get('/classes/AlarmModel', { limit: 1000 })

  const createMonitor = (formattedPhoneNumber, addressId, userId) => {
    const dataToPost = {
      inviter: userId,
      invitee: formattedPhoneNumber,
      address: addressId,
      status: 'invite'
    }
    return api.post('/classes/Monitors', dataToPost)
  }

    const createPromotion = (promoCode, name, phoneNumber, email, address1, address2, city, province, postalCode, country, userId) => {
        const dataToPost = {
        promoUser: userId,
        promoCode: promoCode,
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        address1: address1,
        address2: address2,
        city: city,
        province: province,
        postalCode: postalCode,
        country: country,
        status: 'created'
    }
        return api.post('/classes/Promotions', dataToPost)
    }

    const sendPushToUser = (userId) => {
            const dataToPost = {
            user: userId,
        }
            return api.post('/functions/sendPushToUser', dataToPost)
        }


  return {
    createPhoneNumber,
    deletePhoneNumber,
    findPhoneNumber,
    verifyPhoneNumber,

    resetPassword,
    verifyCode,
    createUser,
    getUser,
    getUsername,
    createInstallation,
    channelUnsubscribe,
    updatePassword,
    updateUser,
    getAddresses,
    getAddress,
    getConfig,
    getDevices,
    getMonitors,
    getMonitorInvitations,
    getSentInvitations,
    getOwnMonitors,
    updateMonitor,
    login,
    logout,
    createDevice,
    deleteDevice,
    snoozeDevice,
    updateDevice,
    getDevice,
    getDeviceActivity,
    getDeviceClimate,
    createAddress,
    deleteAddress,
    saveAddress,
    getAlarmModels,
    createMonitor,
    createPromotion,
    sendPushToUser,
    // additional utilities
    removeToken,
    setToken
  }
}

export default {
  create
}
