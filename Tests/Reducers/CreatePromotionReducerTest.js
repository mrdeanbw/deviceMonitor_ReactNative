import test from 'ava'
import reducer, { INITIAL_STATE } from '../../App/Reducers/CreatePromotionReducer'
import Actions from '../../App/Actions/Creators'

const promotionId = 'bubba'

test('initial state', t => {
  const state = reducer(undefined, null)
  t.deepEqual(state, { creating: false, error: null, createdPromotionId: null })
})

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.createPromotion())
  t.true(state.creating)
  t.is(state.error, null)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.createPromotionSuccess(promotionId))
  t.falsy(state.creating)
  t.is(state.error, null)
  t.deepEqual(state.createdPromotionId, promotionId)
})

test('failure', t => {
  const error = 'Ya burned the burgers :/'
  const state = reducer(INITIAL_STATE, Actions.createPromotionFailure(error))
  t.falsy(state.creating)
  t.deepEqual(state.error, error)
})
