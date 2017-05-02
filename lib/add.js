/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

function * add (user, name, email, options) {
  console.log('add %j %j %j', user, name, email)
}

module.exports = (user, name, email, options) => new Promise(resolve => {
  add(user, name, email, options).next()
  resolve()
})
