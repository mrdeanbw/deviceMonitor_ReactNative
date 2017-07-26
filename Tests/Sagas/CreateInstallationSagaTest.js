import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import CreateInstallationSaga from '../../App/Sagas/CreateInstallationSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'
import { getInstallationId } from '../../App/Lib/Utilities'

const saga = CreateInstallationSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const deviceToken = 'deviceId12345'
const deviceType = 'pos'
const userChannel = 'r1a2b3c4d'
const installationId = 'deadbeef-a2ba-48aa-8a84-daa57d5a569b'
const mock = { deviceType, deviceToken }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.CREATE_INSTALLATION))
  t.deepEqual(step(mock), call(saga.worker, deviceType, deviceToken))
})

test('create installation successful', t => {
  const step = stepper(saga.worker(deviceType, deviceToken))

  step() // step through select call
  t.deepEqual(
    step({ userChannel }),
    call(getInstallationId)
  )
  t.deepEqual(
    step(installationId),
    call(FixtureApi.createInstallation, installationId, deviceToken, [userChannel])
  )
  t.deepEqual(
    step({ ok: true }),
    put(Actions.createInstallationSuccess())
  )
})

test('create installation failed', t => {
  const step = stepper(saga.worker(deviceType, deviceToken))

  step() // step through select call
  t.deepEqual(
    step({ userChannel }),
    call(getInstallationId)
  )
  t.deepEqual(
    step(installationId),
    call(FixtureApi.createInstallation, installationId, deviceToken, [userChannel])
  )
  const error = 'ya dun goofed'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.createInstallationFailure(error))
  )
})

