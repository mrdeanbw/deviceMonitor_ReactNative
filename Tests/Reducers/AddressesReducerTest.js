import test from 'ava'
import Immutable from 'seamless-immutable'
import reducer, { INITIAL_STATE } from '../../App/Reducers/AddressesReducer'
import Actions from '../../App/Actions/Creators'

const existingState = Immutable({
  addresses: [
    { objectId: '1', address: '42 Wallaby Way' },
    { objectId: '2', address: 'Home' },
    { objectId: '3', address: '1211 Chestnut Street' },
  ]
})

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { fetching: false, error: null, addresses: [] })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchAddresses())

  t.true(state.fetching)
})

test('success', t => {
  const userId = '123'
  const addresses = [
    { address: 'Home', owner: { objectId: userId } },
    { address: 'Beach House', owner: { objectId: '234' } },
  ]
  const state = reducer(INITIAL_STATE, Actions.fetchAddressesSuccess(userId, addresses))

  t.falsy(state.fetching)
  t.is(state.error, null)
  t.deepEqual(
    state.addresses, [
    { address: 'Home', owner: { objectId: userId }, isOwner: true },
    { address: 'Beach House', owner: { objectId: '234' }, isOwner: false },
  ])
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.fetchAddressesFailure(error))

  t.falsy(state.fetching)
  t.is(state.error, error)
})

test('update', t => {
  const changes = { address: '123 Main Street' }
  const addressId = '2'

  const state = reducer(existingState, Actions.saveAddressSuccess(addressId, changes))
  t.deepEqual(state.addresses, [
      { objectId: '1', address: '42 Wallaby Way' },
      { objectId: '2', address: '123 Main Street' },
      { objectId: '3', address: '1211 Chestnut Street' },
    ]
  )
})

test('add new address', t => {
  const newAddress = { address: '1600 Pennsylvania Avenue' }
  const newAddressId = 45

  const state = reducer(existingState, Actions.createAddressSuccess(newAddressId, newAddress))
  t.deepEqual(state.addresses, [
    ...existingState.addresses,
    { objectId: newAddressId, isOwner: true, ...newAddress }
  ])
})

test('delete an address', t => {
  const addressToDelete = '2'
  const state = reducer(existingState, Actions.deleteAddressSuccess(addressToDelete))
  t.deepEqual(
    state.addresses, [
      { objectId: '1', address: '42 Wallaby Way' },
      { objectId: '3', address: '1211 Chestnut Street' },
    ]
  )
})
