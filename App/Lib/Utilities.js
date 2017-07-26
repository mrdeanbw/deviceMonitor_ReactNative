// Utility functions
import { AsyncStorage, Platform } from 'react-native'
import R from 'ramda'

// useful cleaning functions
const nullToEmpty = R.defaultTo('')
const replaceEscapedCRLF = R.replace(/\\n/g)
const nullifyNewlines = R.compose(replaceEscapedCRLF(' '), nullToEmpty)

// Correct Map URIs
export const locationURL = (address) => {
  let cleanAddress = nullifyNewlines(address)
  // https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
  let url = `http://maps.apple.com/?address=${cleanAddress}`
  // https://developers.google.com/maps/documentation/ios-sdk/urlscheme
  if (Platform.OS === 'android') url = `http://maps.google.com/?q=${cleanAddress}`

  return url
}
export const directionsURL = (address) => {
  let cleanAddress = nullifyNewlines(address)
  // https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
  let url = `http://maps.apple.com/?daddr=${cleanAddress}&dirflg=d`
  // https://developers.google.com/maps/documentation/ios-sdk/urlscheme
  if (Platform.OS === 'android') url = `http://maps.google.com/?daddr=${cleanAddress}`

  return url
}

// Strip all non-digits out of a phone number
export const sanitizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return ''
  }
  return phoneNumber.replace(/[^\d]/g, '')
}

// make sure we don't return an undefined or null value for a name
export const sanitizeName = (name) => name || ''

export const stripLeadingZeros = (number) => {
  if (!number) {
    return ''
  }
  return number.replace(/^0*/, '')
}

// returns the phone number with passed in country code and '+' prepended
// the number is also sanitized and leading zeros are removed
export const numberWithCountryCode = (number, countryCode) => {
  const num = stripLeadingZeros(sanitizePhoneNumber(number))
  if (num.startsWith(countryCode)) {
    return `+${num}`
  }
  return `+${countryCode}${num}`
}

export const numberWithoutCountryCode = (number, countryCode) => {
  const regex = new RegExp(`^\\+${countryCode}`)
  return number ? number.replace(regex, '') : number
}

// Get the time from a Date object as a displayable string. For example:
// "6:30pm", "12:03am"
export const getTimeString = (date) => {
  const isPM = date.getHours() >= 12
  let hours = isPM ? date.getHours() - 12 : date.getHours()
  if (hours === 0) {
    hours = 12
  }

  let minutes = date.getMinutes()
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes
  }

  const label = isPM ? 'pm' : 'am'
  return `${hours}:${minutes}${label}`
}

// Returns true iff the two dates represent the same day (year/month/day)
export const isSameDay = (date1, date2) => {
  return (
    date1 && date2 &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  )
}

export const convertToCelsius = (temp) => ((temp - 32) / 1.8)
export const convertToFahrenheit = (temp) => (temp * 1.8 + 32)

export const tempToString = (temp, tempUnitsFahrenheit) => {
  if (tempUnitsFahrenheit) {
    return `${Math.round(convertToFahrenheit(temp))}°F`
  } else {
    return `${Math.round(temp)}°C`
  }
}

// Generate installationId UUIDs
const hexOctet = () => {
  return Math.floor(
    (1 + Math.random()) * 0x10000
  ).toString(16).substring(1)
}
const generateId = () => {
  return (
    hexOctet() + hexOctet() + '-' +
    hexOctet() + '-' +
    hexOctet() + '-' +
    hexOctet() + '-' +
    hexOctet() + hexOctet() + hexOctet()
  )
}
export const getInstallationId = function*() {
  let id
  id = yield AsyncStorage.getItem('installationId')
  if (!id) {
    id = generateId()
    AsyncStorage.setItem('installationId', id)
  }
  return id
}
