/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

function * unset (options) {
  console.log('unset')
}

module.exports = (options) => new Promise(resolve => {
  unset(options).next()
  resolve()
})
