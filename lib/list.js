/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

function * list (options) {
  console.log('list')
}

module.exports = (options) => new Promise(resolve => {
  list(options).next()
  resolve()
})
