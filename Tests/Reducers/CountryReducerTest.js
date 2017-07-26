import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CountryReducer'
import Actions from '../../App/Actions/Creators'

test('initial state', t => {
  t.deepEqual(reducer(undefined, null), {
    name: 'United States',
    code: 1,
    wicedCode: 0x00005355
  })
})

test('country selected reducer', t => {
  const country = { name: 'Belgium', code: '32', wicedCode: 0x00004542 }
  const state = reducer(
    INITIAL_STATE, Actions.selectCountry(country))
  t.deepEqual(state, country)
})

