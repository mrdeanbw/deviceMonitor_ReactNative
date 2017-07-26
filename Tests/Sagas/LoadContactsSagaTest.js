import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import LoadContactsSaga from '../../App/Sagas/LoadContactsSaga'
import { updateContacts } from '../../App/Lib/Contacts'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = LoadContactsSaga
const stepper = (fn) => (mock) => fn.next(mock).value
const requestPermissions = true

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.LOAD_CONTACTS))
  t.deepEqual(step({ requestPermissions }), call(saga.worker, requestPermissions))
})

test('load contacts successful', t => {
  const step = stepper(saga.worker(requestPermissions))

  t.deepEqual(
    step(),
    call(updateContacts, requestPermissions)
  )
  const contacts = require('../../App/Fixtures/contacts.json')
  const contactsAccess = true
  t.deepEqual(
    step({ contacts: contacts, contactsAccess: contactsAccess }),
    put(Actions.loadContactsSuccess(contactsAccess, contacts))
  )
})

test('load contacts failed', t => {
  const fn = saga.worker(requestPermissions)
  const step = stepper(fn)

  t.deepEqual(
    step(),
    call(updateContacts, requestPermissions)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    fn.throw(error).value,
    put(Actions.loadContactsFailure(error))
  )
})
