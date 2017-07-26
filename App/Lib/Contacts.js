import Contacts from 'react-native-contacts'
import R from 'ramda'
import { decoratedPromise } from './DecoratedPromise'
import { sanitizePhoneNumber, sanitizeName } from './Utilities'

export const updateContacts = (requestPermissions = false) => {
  const promise = decoratedPromise()
  const { resolve, reject } = promise
  Contacts.checkPermission( (err, permission) => {
    if (err) {
      return reject(err)
    }
    if (permission === 'denied') {
      return resolve({ contactsAccess: false, contacts: [] })
    }
    // scenario: dashboard polling when the user hasn't yet
    // been prompted to give permissions on the new monitor screen
    if (!requestPermissions && permission === 'undefined') {
      return resolve({ contactsAccess: false, contacts: [] })
    }
    loadContacts(promise)
  })
  return promise
}

const loadContacts = (promise) => {
  const { resolve, reject } = promise
  Contacts.getAll((err, contacts) => {
    if (err) {
      if (err.type === 'permissionDenied') {
        return resolve({ contactsAccess: false, contacts: [] })
      }
      return reject(err)
    }
    resolve({ contactsAccess: true, contacts: parseContacts(contacts) })
  })
}

// Parse contacts returned from Address book for storage in redux
export const parseContacts = (contacts) => {
  const allContacts = R.map((contact) => ({
    phoneNumbers: parsePhoneNumbers(contact.phoneNumbers),
    firstName: sanitizeName(contact.givenName),
    lastName: sanitizeName(contact.familyName),
    thumbnailPath: contact.thumbnailPath
  }), contacts)

  const noPhoneNumbers = R.pipe(R.prop('phoneNumbers'), R.isEmpty)
  return R.sortBy(
    (contact) => `${contact.firstName}${contact.lastName}`,
    R.reject(noPhoneNumbers, allContacts)
  )
}

// Helper to expand a list of contacts, returning a list of objects, each
// with a phone number, last name, and first name.
export const expandContacts = (contacts) => {
  const expander = (acc, contact) => {
    const numbers = R.map((phoneNumber) => ({
      phoneNumber: sanitizePhoneNumber(phoneNumber.number),
      firstName: contact.firstName,
      lastName: contact.lastName
    }), contact.phoneNumbers)

    return [[...acc, ...numbers], null]
  }

  const [expanded, _] = R.mapAccum(expander, [], contacts)
  return expanded
}

export const parsePhoneNumbers = (phoneNumbers) => {
  return R.map((number) => ({
    number: sanitizePhoneNumber(number.number),
    label: number.label
  }), phoneNumbers)
}
