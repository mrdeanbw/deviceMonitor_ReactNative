import test from 'ava'
import Immutable from 'seamless-immutable'
import reducer, { INITIAL_STATE } from '../../App/Reducers/DevicesReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { fetching: false, error: null, devices: {} })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchDevices())

  t.true(state.fetching)
})

test('groups devices by address', t => {
  const stateWithExistingDevices = Immutable({
    fetching: true, error: null, devices: { foo: [ { name: 'existing' } ] }
  })
  const addressId = 'beef'
  const addressId2 = 'home'
  const addressId3 = 'none'
  const device1 = { name: 'device one', pAddress: { objectId: addressId } }
  const device2 = { name: 'device two', pAddress: { objectId: addressId } }
  const device3 = { name: 'device two', pAddress: { objectId: addressId2 } }
  const devices = [ device1, device2, device3 ]
  const state = reducer(stateWithExistingDevices, Actions.fetchDevicesSuccess([addressId, addressId2, addressId3], devices))

  t.falsy(state.fetching)
  t.is(state.error, null)
  t.deepEqual(state.devices, {
    ...stateWithExistingDevices.devices,
    [addressId]: [ device1, device2 ],
    [addressId2]: [ device3 ],
    [addressId3]: [ ]
  })
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.fetchDevicesFailure(error))

  t.falsy(state.fetching)
  t.is(state.error, error)
})

test('remove device', t => {
  const initialState = Immutable({
    fetching: false,
    error: null,
    devices: {
      address1: [{ objectId: '1', name: 'remains the same' }],
      address2: [{ objectId: '2', name: 'delete me'}, { objectId: '3', name: 'remains unchanged' }],
      address3: []
    }
  })

  const state = reducer(initialState, Actions.deleteDeviceSuccess('2'))

  t.deepEqual(
    state, {
      fetching: false,
      error: null,
      devices: {
        address1: [{ objectId: '1', name: 'remains the same' }],
        address2: [{ objectId: '3', name: 'remains unchanged' }],
        address3: []
      }
    }
  )
})

test('update device', t => {
  const initialState = Immutable({
    devices: {
      address1: [{ objectId: '1', name: "can't touch this", pAddress: { objectId: 'address1' } }],
      address2: [
        { objectId: '2', name: 'still the same', pAddress: { objectId: 'address2' } },
        { objectId: '3', name: 'change me', pAddress: { objectId: 'address2' } }
      ],
      address3: []
    }
  })
  const state = reducer(initialState, Actions.updateDeviceSuccess('3', { name: 'so different', foo: 'bar' }))

  t.deepEqual(
    state, {
      devices: {
        address1: [{ objectId: '1', name: "can't touch this", pAddress: { objectId: 'address1' } }],
        address2: [
          { objectId: '2', name: 'still the same', pAddress: { objectId: 'address2' } },
          { objectId: '3', name: 'so different', foo: 'bar', pAddress: { objectId: 'address2' } }
        ],
        address3: []
      }
    }
  )
})

test('replace device', t => {
  const initialState = Immutable({
    devices: {
      address1: [{ objectId: '1', name: "can't touch this", pAddress: { objectId: 'address1' } }],
      address2: [
        { objectId: '2', name: 'still the same', pAddress: { objectId: 'address2' } },
        { objectId: '3', name: 'change me', baz: 'qux', pAddress: { objectId: 'address2' } }
      ],
      address3: []
    }
  })
  const state = reducer(initialState, Actions.getDeviceSuccess({
    objectId: '3', name: 'so different', foo: 'bar', pAddress: { objectId: 'address2' }
  }))

  t.deepEqual(
    state, {
      devices: {
        address1: [{ objectId: '1', name: "can't touch this", pAddress: { objectId: 'address1' } }],
        address2: [
          { objectId: '2', name: 'still the same', pAddress: { objectId: 'address2' } },
          { objectId: '3', name: 'so different', foo: 'bar', pAddress: { objectId: 'address2' } }
        ],
        address3: []
      }
    }
  )
})

test('delete address', t => {
  const initialState = Immutable({
    devices: {
      address1: [{ objectId: '1' }],
      address2: [{ objectId: '2' }],
      address3: [{ objectId: '3' }],
    }
  })
  const state = reducer(initialState, Actions.deleteAddressSuccess('address2'))
  t.deepEqual(
    state, {
      devices: {
        address1: [{ objectId: '1' }],
        address3: [{ objectId: '3' }],
      }
    }
  )
})
