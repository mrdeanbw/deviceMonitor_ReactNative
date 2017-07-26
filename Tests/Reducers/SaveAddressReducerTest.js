import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/SaveAddressReducer'
import Actions from '../../App/Actions/Creators'

const addressId = 'foo'
const updates = { address: '123 Main Street' }

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { saving: false, error: null, createdAddressId: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.saveAddress(addressId, updates))

  t.true(state.saving)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.saveAddressSuccess(addressId, updates))

  t.falsy(state.saving)
  t.is(state.error, null)
})

test('failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.saveAddressFailure(error))

  t.falsy(state.saving)
  t.is(state.error, error)
})

test('create attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.createAddress(updates))

  t.true(state.saving)
})

test('create success', t => {
  const state = reducer(INITIAL_STATE, Actions.createAddressSuccess(addressId, updates))

  t.falsy(state.saving)
  t.is(state.error, null)
  t.is(state.createdAddressId, addressId)
})

test('create failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.createAddressFailure(error))

  t.falsy(state.saving)
  t.is(state.error, error)
})

test('delete attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.deleteAddress(addressId))

  t.true(state.saving)
})

test('delete success', t => {
  const state = reducer(INITIAL_STATE, Actions.deleteAddressSuccess(addressId))

  t.falsy(state.saving)
  t.is(state.error, null)
  t.is(state.createdAddressId, null)
})

test('delete failure', t => {
  const error = 'Ya dun goofed'
  const state = reducer(INITIAL_STATE, Actions.deleteAddressFailure(error))

  t.falsy(state.saving)
  t.is(state.error, error)
})

