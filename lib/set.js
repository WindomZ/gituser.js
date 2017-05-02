/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

function * set (user, options) {
  console.log('set %j', user)
}

module.exports = (user, options) => new Promise(resolve => {
  set(user, options).next()
  resolve()
})
