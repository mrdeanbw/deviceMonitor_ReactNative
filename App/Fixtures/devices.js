const createMockDevice = ({
  userId,
  addressId,
  isProvisioned = true,
  location = 'Hallway',
  event = 'check in',
  deviceType = 'Battery',
  batteryPower = 1,
  isAlarmOn = false,
  createdAt = new Date(),
  updatedAt = new Date(),
  lastEventTime = new Date(),
  name = 'Smart Battery',
  lastTemp = null,
  lastHum = null,
}) => (
  {
    "ACL": {
      [userId]: {
        "read": true,
        "write": true
      }
    },
    "batteryLevel": null,
    "batteryPower": batteryPower,
    "createdAt": createdAt.toISOString(),
    "deviceType": deviceType,
    "event": event,
    "firmwareRevision": "0.0.1",
    "isAlarmOn": isAlarmOn,
    "isProvisioned": isProvisioned,
    "isSnoozed": false,
    "isTesting": false,
    "lastEvent": event,
    "lastEventTime": {
      "__type": "Date",
      "iso": lastEventTime.toISOString()
    },
    "lastHum": lastHum,
    "lastTemp": lastTemp,
    "lastOta": {
      "__type": "Date",
      "iso": (new Date()).toISOString(),
    },
    "location": location,
    "macAddress": "DE:AD:BE:EF:00:00",
    "name": name,
    "objectId": Math.random().toString(36).substr(2, 9),
    "offlineEmailSent": false,
    "offlinePushSent": false,
    "otaAttempts": 0,
    "owner": {
      "__type": "Pointer",
      "className": "_User",
      "objectId": userId
    },
    "pAddress": {
      "__type": "Pointer",
      "className": "_Address",
      "objectId": addressId
    },
    "priority": 90,
    "rssi": [0, 1, 2, 3][Math.floor(4 * Math.random())],
    "sensorDetails": {
      "__type": "Pointer",
      "className": "SensorDetails",
      "objectId": "nlg9WC451D"
    },
    "ssid": "my wifi",
    "updatedAt": updatedAt.toISOString()
  }
)

const makeVarietyOfDevices = (userId, addressId) => {
  // Mock object representing Config values in Parse
  const config = {
    setupIncompleteTimeout: 1800,
    deviceLate: 86400,
    deviceVeryLate: 172800,
    recentUpdate: 1800,
  }
  const makeBattery = (opts) => createMockDevice({ userId, addressId, ...opts })
  const unprovisionedDevice = makeBattery({ isProvisioned: false })

  const incompleteTime = new Date()
  incompleteTime.setSeconds(incompleteTime.getSeconds() - config.setupIncompleteTimeout - 10)
  const incomplete = makeBattery({ event: 'provision', lastEventTime: incompleteTime })

  const lateTime = new Date()
  lateTime.setSeconds(lateTime.getSeconds() - config.deviceLate)
  const late = makeBattery({ lastEventTime: lateTime, location: 'Kitchen' })

  const veryLateTime = new Date()
  veryLateTime.setSeconds(veryLateTime.getSeconds() - config.deviceVeryLate - 10)
  const veryLate = makeBattery({ lastEventTime: veryLateTime })

  const lowPower = makeBattery({ batteryPower: 2 })
  const critcallyLowPower = makeBattery({ batteryPower: 3, location: 'Bedroom' })
  const alarming = makeBattery({ isAlarmOn: true, event: 'alarm' })
  const normal = makeBattery()

  const batteries = [
    unprovisionedDevice, incomplete, late, veryLate,
    lowPower, critcallyLowPower, alarming, normal
  ]

  const makeWaterSensor = (opts) => createMockDevice({
    userId, addressId, deviceType: 'Water', name: 'Sink',
    lastTemp: 70, lastHum: 40,
    location: 'Basement',
    ...opts
  })
  const waterAlarm = makeWaterSensor({ isAlarmOn: true, event: 'water' })
  const tempAlarm = makeWaterSensor({
    isAlarmOn: true, event: 'tempAlert', lastTemp: 80, name: 'Toilet', location: 'Bathroom'
  })
  const humAlarm = makeWaterSensor({
    isAlarmOn: true, event: 'humAlert', lastHum: 80, location: 'Garage', name: 'Wine'
  })
  const motionAlarm = makeWaterSensor({ isAlarmOn: true, event: 'motion', location: 'Basement' })

  const recentMotion = makeWaterSensor({ event: 'motion' })

  const veryLateWater = makeWaterSensor({ lastEventTime: veryLateTime, location: 'Bedroom' })
  const lateWater = makeWaterSensor({ lastEventTime: lateTime, location: 'Kitchen' })

  const incompleteWater = makeWaterSensor({ event: 'provision', lastEventTime: incompleteTime })

  const notRecentTime = new Date()
  notRecentTime.setSeconds(notRecentTime.getSeconds() - config.recentUpdate - 10)
  const notRecent = makeWaterSensor({ lastEventTime: notRecentTime })
  const okWater = makeWaterSensor({ name: 'Behind the Fridge' })

  const waterSensors = [
    waterAlarm, tempAlarm, humAlarm, motionAlarm,
    recentMotion, veryLateWater, lateWater, incompleteWater, notRecent, okWater
  ]

  return [...batteries, ...waterSensors]
}

export default makeVarietyOfDevices
