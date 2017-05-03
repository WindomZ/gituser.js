/**
 * Created by WindomZ on 2017/4/30.
 */
const test = require('ava')

const init = require('../lib/init')

test('init pass', t => {
  try {
    init()
    t.pass()
  } catch (e) {
    t.error(e)
    t.fail()
  }
})
