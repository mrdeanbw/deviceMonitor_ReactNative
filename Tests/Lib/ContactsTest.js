import test from 'ava'
import { expandContacts, parseContacts } from '../../App/Lib/Contacts'

test('parse contacts', t => {
  const contacts = require('../../App/Fixtures/contacts.json')
  t.deepEqual(
    parseContacts(contacts),
    [
      { firstName: 'Anna',
        lastName: 'Haro',
        thumbnailPath: '',
        phoneNumbers: [
          { number: '5555228243', label: 'home' }
        ]
      },
      { firstName: 'Daniel',
        lastName: 'Higgins',
        thumbnailPath: '',
        phoneNumbers: [
          { number: '5554787672', label: 'home' },
          { number: '4085555270', label: 'mobile' },
          { number: '4085553514', label: 'home fax' }
        ]
      },
      { firstName: 'John',
        lastName: 'Appleseed',
        thumbnailPath: 'cool-photo.png',
        phoneNumbers: [
          { number: '8885555512', label: 'mobile' },
          { number: '8885551212', label: 'home'}
        ]
      },
    ]
  )
})

test('expand contacts', t => {
  const contacts = require('../../App/Fixtures/contacts.json')
  const parsedContacts = parseContacts(contacts)
  t.deepEqual(
    expandContacts(parsedContacts),
    [
      { phoneNumber: '5555228243', firstName: 'Anna', lastName: 'Haro' },
      { phoneNumber: '5554787672', firstName: 'Daniel', lastName: 'Higgins' },
      { phoneNumber: '4085555270', firstName: 'Daniel', lastName: 'Higgins' },
      { phoneNumber: '4085553514', firstName: 'Daniel', lastName: 'Higgins' },
      { phoneNumber: '8885555512', firstName: 'John', lastName: 'Appleseed' },
      { phoneNumber: '8885551212', firstName: 'John', lastName: 'Appleseed' },
    ]
  )
})
