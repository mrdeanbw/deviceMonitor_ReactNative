import test from 'ava'
import { call, put, take } from 'redux-saga/effects'
import CreatePromotionSaga from '../../App/Sagas/CreatePromotionSaga'
import FixtureApi from '../../App/Services/FixtureApi'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const saga = CreatePromotionSaga(FixtureApi)
const stepper = (fn) => (mock) => fn.next(mock).value
const promoCode = 'abc1234'
const name = 'Jone Doe'
const email = 'abc@tsd.com'
const address1 = '1234 abc st'
const address2 = 'apt 10'
const city = 'Sunnyvale'
const province = 'CA'
const postalCode = '94085'
const country = 'USA'
const phoneNumber = '+123456'
const userId = 'theRock'
const fields = { promoCode:promoCode, name:name, phoneNumber:phoneNumber, email:email, address1:address1, address2:address2, city:city, province:province, postalCode:postalCode, country:country }

test('watcher', t => {
  const step = stepper(saga.watcher())

  t.deepEqual(step(), take(Types.CREATE_PROMOTION))
  t.deepEqual(step(fields), call(saga.worker, promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country ))
})

test('create promotion successful', t => {
  const step = stepper(saga.worker(promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createPromotion, promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country, userId)
  )
  const promotionId = 'sneaky'
  t.deepEqual(
    step({ ok: true, data: { objectId: promotionId } }),
    put(Actions.createPromotionSuccess(promotionId))
  )
})

test('create address failed', t => {
  const step = stepper(saga.worker(promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country))

  step() // step through select call
  t.deepEqual(
    step({ userId }),
    call(FixtureApi.createPromotion, promoCode,name,phoneNumber,email,address1,address2,city,province,postalCode,country, userId)
  )
  const error = 'rejected! don\'t you dare bring that weak tot action'
  t.deepEqual(
    step({ ok: false, data: { error } }),
    put(Actions.createPromotionFailure(error))
  )
})
