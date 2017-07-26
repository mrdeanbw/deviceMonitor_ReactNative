import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import GetMonitorsSaga from '../../App/Sagas/GetMonitorsSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import { numberWithoutCountryCode } from '../../App/Lib/Utilities'

const usCode = 1
const country = { code: usCode }
const saga = GetMonitorsSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const userId = 'randy'

const monitorsResponse = FixtureApi.getMonitors(userId)
const [ firstMonitor, ...rest ] = monitorsResponse.data.results
const contacts = {
  contacts: [ {
    phoneNumbers: [ {
      number: numberWithoutCountryCode(firstMonitor.invitee, usCode),
      label: 'mobile'
    } ],
    firstName: 'Randy',
    lastName: 'Butternubs' ,
  } ]
}
const monitorsWithNames = [
  { ...firstMonitor, firstName: 'Randy', lastName: 'Butternubs' },
  ...rest
]

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.FETCH_MONITORS))
  t.deepEqual(step(), call(saga.worker))
})

test('fetch monitors successful', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.getMonitors, userId)
  )

  step(monitorsResponse) // step through select contacts call
  step(contacts) // step through select country code call

  t.deepEqual(
    step(country),
    call(FixtureApi.getMonitorInvitations, userId)
  )

  const invitations = FixtureApi.getMonitorInvitations(userId)
  t.deepEqual(
    step(invitations),
    put(Actions.fetchMonitorsSuccess(monitorsWithNames, invitations.data.results))
  )
})

test('fetch monitors successful and fetch invitations fails', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.getMonitors, userId)
  )

  step(monitorsResponse) // step through select contacts call
  step(contacts) // step through select country code call

  t.deepEqual(
    step(country),
    call(FixtureApi.getMonitorInvitations, userId)
  )

  const invitations = { ok: false }
  t.deepEqual(
    step(invitations),
    put(Actions.fetchMonitorsSuccess(monitorsWithNames, []))
  )
})

test('fetch monitors failed', t => {
  const step = stepper(saga.worker())

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.getMonitors, userId)
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.fetchMonitorsFailure(error))
  )
})
