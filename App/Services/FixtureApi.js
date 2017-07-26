export default {
  // Functions return fixtures
  getCity: (city) => {
    // This fixture only supports Boise or else returns toronto
    const boiseData = require('../Fixtures/boise.json')
    const torontoData = require('../Fixtures/toronto.json')
    return {
      ok: true,
      data: city.toLowerCase() === 'boise' ? boiseData : torontoData
    }
  },

  login: (username, password) => {
    if (password === 'password') {
      return {
        ok: true,
        data: require('../Fixtures/loginSuccess.json')
      }
    } else {
      return {
        ok: false,
        data: require('../Fixtures/loginFailure.json')
      }
    }
  },
  logout: () => null,

  findPhoneNumber: (phoneNumber) => {
    let results
    if (phoneNumber === '+15551234') {
      results = [{
        objectId: 'deadbeef',
        phoneNumber,
        accessCode: '0000'
      }]
    } else {
      results = []
    }
    return { data: { results }, ok: true }
  },

  resetPassword: (phoneNumber) => ({ ok: true }),
  updatePassword: (newPassword) => ({ ok: true }),
  updateUser: (userId, updates) => ({ ok: true }),

  createInstallation: (deviceType, deviceToken, userChannel) => ({ ok: true }),

  channelUnsubscribe: (installationId) => ({ ok: true }),

  setToken: token => token,
  removeToken: () => null,

  getAddresses: () => ({
    ok: true,
    data: require('../Fixtures/addresses.json')
  }),

  getAddress: () => { ok: true },

  getConfig: () => ({
    ok: true,
    data: require('../Fixtures/config.json')
  }),

  getDevices: (userId, addressId) => ({
    ok: true,
    data: require('../Fixtures/devices.json')
  }),

  getDevice: (deviceId) => ({
    ok: true,
    data: require('../Fixtures/devices.json').results[0]
  }),

  getMonitors: (userId) => ({
    ok: true,
    data: require('../Fixtures/monitors.json')
  }),

  getOwnMonitors: (userId) => ({
    ok: true,
    data: require('../Fixtures/monitors.json')
  }),

  getDeviceActivity: (deviceId) => {
    if (deviceId === '1') {
      return {
        ok: true,
        data: require('../Fixtures/activity.json')
      }
    } else {
      return {
        ok: false,
        data: {
          error: 'not found'
        }
      }
    }
  },

  getDeviceClimate: (deviceId, since) => {
    return {
      ok: true,
      data: {
        results: [
          {
            time: { '__type': 'Date', iso: (new Date()).toISOString() },
            temperature: 10,
            humidity: 50,
          }
        ]
      }
    }
  },

  createAddress: (userId, fields) => ({
    ok: true,
    data: {
      objectId: '42'
    }
  }),

  saveAddress: (addressId, updates) => ({
    ok: true,
    data: {
      updatedAt: (new Date()).toISOString()
    }
  }),

  deleteAddress: (addressId) => ({ ok: true }),

  deleteDevice: (id) => ({ ok: true }),

  snoozeDevice: (deviceId, userId, bssid, location) => ({ ok: true }),

  updateDevice: () => ({
    ok: true,
    data: { cool: 'bro' }
  }),

  deletePhoneNumber: (objectId) => ({ ok: true }),

  getAlarmModels: () => ({
    ok: true,
    data: [{ model: 'cool' }, { model: 'hat' }]
  }),

  createMonitor: () => {},

  createPromotion: () => {},

  getMonitorInvitations: (userId) => ({
    ok: true,
    data: {
      results: [{
        objectId: 'hsVfy2JafD',
        inviter: 'lQvFxJ73Jb',
        monitor: userId,
        invitationText: 'Randy invited you to monitor their premises',
        status: 'invite',
      }]
    }
  }),

    getSentInvitations: (userId) => ({
        ok: true,
        data: {
            results: [{
                objectId: 'hsVfy2JafD',
                inviter: 'lQvFxJ73Jb',
                monitor: userId,
                invitationText: 'Randy invited you to monitor their premises',
                status: 'invite',
            }]
        }
    }),

  updateMonitor: (monitorId, status) => ({ ok: true })
}
