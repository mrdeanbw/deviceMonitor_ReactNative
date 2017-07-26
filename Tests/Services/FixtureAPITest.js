import test from 'ava'
import API from '../../App/Services/Api'
import ParseAPI from '../../App/Services/ParseAPI'
import FixtureAPI from '../../App/Services/FixtureApi'
import R from 'ramda'

test('All fixtures map to actual API', t => {
  const fixtureKeys = R.keys(FixtureAPI).sort()
  const apiKeys = R.keys(API.create())
  const parseApiKeys = R.keys(ParseAPI.create('localhost'))

  const intersection = R.intersection(fixtureKeys, R.union(apiKeys, parseApiKeys)).sort()

  // There is no difference between the intersection and all fixtures
  t.true(R.equals(fixtureKeys, intersection))
})
