/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

function * remove (user, options) {
  console.log('remove %j', user)
}

module.exports = (user, options) => new Promise(resolve => {
  remove(user, options).next()
  resolve()
})
